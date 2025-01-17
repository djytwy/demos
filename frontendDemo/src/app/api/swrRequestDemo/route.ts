import { NextResponse, NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv'

export async function GET(req: NextRequest, resp: NextApiResponse) {
    const demoList = await kv.lrange("swr_get_demo_list", 0, 999)

    return NextResponse.json(
        demoList,
    );
}

export async function DELETE(req: NextRequest, resp: NextApiResponse) {
    const code = req.nextUrl.searchParams.get('code');

    return NextResponse.json({
        success: true,
    });
}

export async function POST(req: NextRequest, resp: NextApiResponse) {
    // const saveMsg = `new time: ${new Date().getTime()}`
    const saveMsg = await req.json()
    const f = await kv.rpush("swr_get_demo_list", saveMsg.text)

    return NextResponse.json({
        index: f
    })
}
