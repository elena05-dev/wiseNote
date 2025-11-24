import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivatePage =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const session = await checkSession(accessToken, refreshToken);

  // если нет сессии — кидаем на sign-in
  if (!session.valid && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // авторизованный не может зайти на sign-in или sign-up
  if (session.valid && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  const res = NextResponse.next();

  if (session.cookies) {
    session.cookies.forEach((cookie) => {
      if (cookie.value !== undefined) {
        res.cookies.set(cookie.name, cookie.value, cookie.options);
      }
    });
  }

  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
