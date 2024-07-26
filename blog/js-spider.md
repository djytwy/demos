#### 记录一次使用 puppeteer 做爬虫的体验

最近有个需求，部署一个接口，这个接口要拿到post的数据，然后把这些数据使用puppeteer去一个网站做模拟登录。

基本的思路是用koa架设一个http服务，然后用这个服务用puppeteer做爬虫登录。

问题最复杂的是部署在服务器上，用了九牛二虎之力都没部署好，最后找了一个别人制作好的docker镜像才搞定。

js服务器的代码如下：
```
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router, { url } from 'koa-router'
import puppeteer, {Browser} from 'puppeteer';


const app = new Koa()
const router = new Router()
const waitTime = 3_000

app.use(bodyParser())

let browser: Browser | null = null;

async function initBrowser(): Promise<Browser> {
    if (browser) {
        return browser
    } else {
        browser = await puppeteer.launch({
            // 优化速度
            // headless: false,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox', 
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--disable-site-isolation-trials',
                '--disable-web-security'
            ]
        });
        return browser
    }
}

router.get('/run', (ctx) => {
    ctx.body = {
        message: 'demo'
    }
})


async function fetchAWS(fetchUrl: string, userName: string, password: string) : Promise<string> {
    const _browser = await initBrowser()
    const page = await _browser.newPage();
    await page.setRequestInterception(true);
    // 优化速度
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.goto(fetchUrl);
    await page.setViewport({width: 1920, height: 1080});
    const loginedButton = `.visible-lg .btn.btn-primary.submitButton-customizable`
    const inputUserName = `.visible-lg #signInFormUsername`
    const inputPassword = `.visible-lg #signInFormPassword`
    const submitButton = `.visible-lg input.btn.btn-primary.submitButton-customizable`;
    try {
        await page.waitForSelector(inputUserName, {timeout: waitTime});
        await page.waitForSelector(inputPassword, {timeout: waitTime});
        await page.type(inputUserName, userName)
        await page.type(inputPassword, password)
        await page.click(submitButton)
        await page.waitForNavigation({ timeout: waitTime }); 
    } catch (error) {
        await page.waitForSelector(loginedButton, {timeout: waitTime});
        await page.click(loginedButton)
        await page.waitForNavigation({ timeout: waitTime }); 
    } finally {
        const url = page.url();
        await page.close();
        console.log('new url:',url);
        if (url.includes('id_token=')) {
            console.log('success login AWS ...');
            return 'success'
        } else if (url.includes('https://ambrus.auth.us-east-1.amazoncognito.com/error')) {
            return "try again"
        } else {
            return 'account or password incorrect or network error.'
        }
    }
}

async function aws(fetchUrl: string, userName: string, password: string) {
    try {
        const r = await fetchAWS(fetchUrl, userName, password)
        if (r === "success") {
            console.log('success login AWS ...');
            return r
        } else if (r === "try again") {
            const _r = await fetchAWS(fetchUrl, userName, password)
            return _r
        } else {
            return r
        }
    } catch (e) {
        console.log(e);
        return e
    }   
}

interface fetchProps {
    url: string;
    userName: string;
    password: string
}

router.post('/loginAWS', async (ctx) => {
    const {url, userName, password} = ctx.request.body as fetchProps;
    const result = await aws(url, userName, password)
    if (result === "success") {
        ctx.body = {
            code: 200,
            message: 'success',
        }
    } else {
        ctx.body = {
            code: 500,
            message: result,
        }
    }
})

app.use(router.routes()).use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, async () => {
    console.log(`server is runing on port: ${PORT}`);
})
```

Dockerfile:
```
FROM grafana/docker-puppeteer:pre-node-20

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

```
# 构建镜像
docker build -t js-server-nginx .
# 跑起来镜像
docker run -d -p 3000:8080 js-server-nginx
```

这样就完成了一个这样的服务，但是这个服务的响应速度较慢，并且占用资源多，所以肯定要部署多个这样的服务才是最优解。

基本的思路是用NGINX做反向代理和负载均衡，下面的代码演示了部署5个爬虫，并发量控制在5个的代码与配置：

首先先跑起来5个docker服务：
```
docker run -d --name js-spider-server-1 js-server-nginx \
docker run -d --name js-spider-server-2 js-server-nginx \
docker run -d --name js-spider-server-3 js-server-nginx \
docker run -d --name js-spider-server-4 js-server-nginx \
docker run -d --name js-spider-server-5 js-server-nginx \ 
```

nginx.conf:
```
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    upstream myapp {
        server js-spider-server-1:8080;
        server js-spider-server-2:8080;
        server js-spider-server-3:8080;
        server js-spider-server-4:8080;
        server js-spider-server-5:8080;
    }

    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=5r/s;

    server {
        listen 3099;

        location / {
            limit_req zone=mylimit burst=5 nodelay;
            proxy_pass http://myapp;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        error_page 429 = /429.html;
        location = /429.html {
            internal;
            return 429 "Too Many Requests\n";
        }
    }
}
```

NGINX的Dockerfile:
```
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
```

```
# 构建NGINX:
docker build -t js-nginx .
# 最后，跑起来服务:
docker run -d --name nginx-proxy -p 3099:3099 --link js-spider-server-1 --link js-spider-server-2 --link js-spider-server-3 --link js-spider-server-4 --link js-spider-server-5 js-nginx 
```

下面访问服务的3099 端口就能访问到经过NGINX负载均衡的puppeteer爬虫服务了