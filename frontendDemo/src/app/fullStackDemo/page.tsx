// this is demo with vercel redis full stack 

import { btn } from '@/commonCss'
import { addAction, clearThings } from '@/app/actions/demo'
import { kv } from '@vercel/kv'

export default async function Page() {
    const list = await kv.lrange<string>("demoList", 0, 999)

    return (
        <main className="flex flex-col items-center mt-32 gap-4">
            <h1 className="text-5xl font-semibold">fullStackDemo</h1>
            <div>my list:</div>
            {/* <button className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer">12233</button> */}
            {
                list?.map((e, i) => {
                    return <div key={i}>{i + 1}. {e}</div>
                })
            }
            <form className="flex flex-col gap-6" action={addAction}>
                <input className='px-2 py-1 border' type='text' name='data'></input>
                <button className={btn}>add thing</button>
            </form>
            <button className={btn} onClick={clearThings}>clear things</button>
        </main>
    )
}