"use client"
import useSWR from "swr";
import { rawFetcher } from '@/utils/axiosFetcher'
import { useState } from 'react'
import { btn } from '@/commonCss'
import axios from "axios";

export default function SwrRequestDemo() {
    const { data, error, mutate } = useSWR<Array<string>>('/api/swrRequestDemo', rawFetcher)
    const [newItem, setnewItem] = useState('')

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post('/api/swrRequestDemo', {
            text: newItem
        })
        setnewItem("")

        // revalidate cache data
        mutate()
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <ul>
                { data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input className="m-4 border border-teal-700 rounded" type="text" value={newItem} onChange={(e) => setnewItem(e.target.value)} />
                <button className={btn} type="submit">Add Item</button>
            </form>
        </div>
    )
}
