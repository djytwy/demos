import { FetchService } from './request'


// 使用
const test = async () => {
    const request = new FetchService()
    const response = await request.get<{name: string}>('xxx')
    console.log(response.name)
}