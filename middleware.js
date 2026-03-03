import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Proteksi halaman admin (kecuali login)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const session = request.cookies.get(COOKIE_NAME);
    
    // Kalau tidak ada session atau value salah, redirect ke login
    if (!session || session.value !== COOKIE_VALUE) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Kalau sudah login tapi coba akses login page, redirect ke dashboard
  if (pathname === '/admin') {
    const session = request.cookies.get(COOKIE_NAME);
    
    if (session?.value === COOKIE_VALUE) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};