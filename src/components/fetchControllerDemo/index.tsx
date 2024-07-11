'use client'
import { useState, useEffect } from 'react'
import { fetcher } from '@/utils/axiosFetcher'
import useSWR from 'swr'

const FetchControllerDemo = () => {
    const [id, setId]=useState(0)

    return (
        <div className="flex flex-col gap-y-4 w-6/12 h-[1000px]">
            <button onClick={() => {
               setId(Math.floor(Math.random() * 100))  
            }} className='px-4 py-2 font-semibold text-sm bg-indigo-500 text-white rounded-md shadow-sm opacity-100'>get posts</button>
            <FetchController id={id}></FetchController>
        </div>
    )
}

interface Props {
    id: number
}

const FetchController = ({ id }: Props) => {
    const [text,setText] = useState('none')
    const controller = new AbortController()
    const { data, error } = useSWR<{
        id: number,
        title: string,
        body: string,
        tags: string[],
        reactions: {
            likes: number,
            dislikes: number,
        },
        views: number,
        userId: number,
    }>(`https://dummyjson.com/posts/${id}`, fetcher)

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`, {
            signal: controller.signal
        })
        .then((res) => res.json())
        .then((data: {
            id: number,
            title: string,
            body: string,
            tags: string[],
            reactions: {
                likes: number,
	            dislikes: number,
            },
            views: number,
            userId: number,
        }) => setText(data.body))
        return () => controller.abort()
    }, [id])

    return (
        <>
            <p>from fetch:</p>
            <p>{text}</p>
            <p>from swr:</p> 
            <p>{data?.body}</p>
        </>
    )
}

export default FetchControllerDemo;