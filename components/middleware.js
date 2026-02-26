import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (session === COOKIE_VALUE) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};