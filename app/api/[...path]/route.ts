import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  const url = `${API_URL}/${path.join('/')}`;

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await req.text()
      : undefined;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: req.headers.get('cookie') ?? '',
    },
    body,
  });

  const data = new NextResponse(response.body, {
    status: response.status,
  });

  const cookies = response.headers.getSetCookie?.();

  if (cookies) {
    cookies.forEach((cookie) => {
      data.headers.append('set-cookie', cookie);
    });
  }

  return data;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
