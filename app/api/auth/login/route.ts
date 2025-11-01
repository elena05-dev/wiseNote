import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post('/auth/login', body, {
      withCredentials: true,
    });

    const res = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      res.headers.set('Set-Cookie', setCookie.join(','));
    }

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
