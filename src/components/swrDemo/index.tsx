"use client" 
import useSWR, { Fetcher } from 'swr';
import * as React from 'react'

interface requestProps {
    url: string,
    method: 'post' | 'get'
    params: any | undefined | null,
    body: any | undefined | null
}

interface responseProps {
    code: string, 
    msg: string ,
    method: string
}

const fethcher: Fetcher<responseProps, requestProps> = ({url, method, params, body}) => {
    return fetch(
        url,
        {
            method: method,
            body: body ? JSON.stringify(body) : undefined
        }
    ).then( res => res.json() )
}

function GetMethod() {
    const { isLoading, data } = useSWR({
        url: 'http://127.0.0.1:8090/',
        method: 'get',
    }, fethcher)

    if (isLoading) return <div>Get loading...</div>
    else return <div>SWR test: {data?.method}</div>
}

function PostMethod() {
    const { isLoading, data } = useSWR({
        url: 'http://127.0.0.1:8090/test2',
        method: 'post',
        body: {
            test: 'demo'
        }
    }, fethcher)

    if (isLoading) return <div>Post loading...</div>
    else return <div>SWR test: {data?.method}</div>
}

export default function SwrDemo() {
    return <>
        <GetMethod></GetMethod>
        <PostMethod></PostMethod>
    </>
}