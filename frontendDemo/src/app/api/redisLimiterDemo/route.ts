import { redisRateLimiter } from './rateLimiter'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const limitResult = await redisRateLimiter(1, 60 * 1000, req) // same ip request only one time in per minute
        if (limitResult.status !== 200) {
            return NextResponse.json(
                { error: limitResult.error },
                { status: limitResult.status }
            );
        }
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const limitResult = await redisRateLimiter(1, 60 * 1000, req) // same ip request only one time in per minute
        if (limitResult.status !== 200) {
            return NextResponse.json(
                { error: limitResult.error },
                { status: limitResult.status }
            );
        } else {
            return NextResponse.json(
                { status: limitResult.status },
            );
        }
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}