import { useEffect } from "react"
import {request } from '@/components/fetchDemo/request'

function Page() {
    useEffect(() => {
        const demo = async () => {
            const resGet = await request.get('/api/nextrequestDemo', {}, false)
            const resPost = await request.post('/api/nextrequestDemo', {
                body: 'demo'
            }, false)
            const resPut = await request.put('/api/nextrequestDemo', {
                method: "PUT",
            }, false)
            const resDel = await request.delete(`/api/nextrequestDemo`, {
                test: 'demo'
            }, false)
            console.log(resGet,resPost, resPut,resDel);
        }
        demo()
    },[])

    return <div>
        nextRequest Demo
    </div>
}

export default Page