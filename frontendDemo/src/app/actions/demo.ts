// backend logic with vercel redis
"use server"

import { revalidatePath } from 'next/cache'
import { kv } from '@vercel/kv'

export const addAction = async (formData: FormData) => {
    const _data = formData.get("data") as string
    
    const n = await kv.rpush("demoList",_data)
    revalidatePath('/fullStackDemo')
}


export const clearThings = async () => {
    await kv.ltrim("demoList", 1, 0)
    revalidatePath('/fullStackDemo')
}