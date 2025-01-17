import { NextResponse, NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { request } from '@/components/fetchDemo/request';

export async function GET(req: NextRequest, resp: NextApiResponse) {
  const code = req.nextUrl.searchParams.get('code');
  const res = await request.get<boolean>('/account/code/reset', {
    code: code,
  });

  if (res === true) {
    return NextResponse.json({
      success: true,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}

export async function DELETE(req: NextRequest, resp: NextApiResponse) {
    const code = req.nextUrl.searchParams.get('code');
    const res = await request.delete<boolean>('/account/code/del', {
      code: code,
    });
  
    if (res === true) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: false,
      });
    }
  }

interface resProps {
  response: responseProps;
  status: number;
}
interface responseProps {
  statusCode: number;
  message: string;
  error: string;
}

export async function POST(req: NextRequest, resp: NextApiResponse) {
  const body = await req.json();
  const res = await request.post<boolean>('/account/code/reset', {
    email: body.account,
  });
  if (res === true) {
    return NextResponse.json({
      success: true,
    });
  } else {
    return NextResponse.json({
      error: 'This email is unregister please check it.',
    });
  }
}

export async function PUT(req: NextRequest, resp: NextApiResponse) {
  const body = await req.json();
  try {
    const res = await request.put<resProps | boolean>('/account/password', {
      newPassword: body.password,
      code: body.code,
    });
    if (res === true) {
      return NextResponse.json({
        success: true,
      });
      // @ts-ignore
    } else if ('response' in res) {
      return NextResponse.json({
        error: res.response.message,
      });
    } else {
      return NextResponse.json({
        error: 'Unknow error please try again later.',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: true,
    });
  }
}
