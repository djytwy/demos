#### nextRequest demo

为什么要用nextRequest？
next启动的时候会启动一个服务器端进行后端的渲染，我们如果使用nextRequest配合原生的fetch方法可以作相关的性能优化(主要是使用缓存):

![next server响应的流程](image.png)

通过统一封装前端，我们可以规避一些安全性的问题，比如一些接口不想直接暴露出来，我们可以请求next server通过next server 去请求相关的接口。