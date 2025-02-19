'use client'
import useSWR from "swr"

const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

function Page() {
    const { data } = useSWR<{ status: number }>('/api/redisLimiterDemo', fetcher)

    return (
        <div>{data?.status}</div>
    )
}

export default Page