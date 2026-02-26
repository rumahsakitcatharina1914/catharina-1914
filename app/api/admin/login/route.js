import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated';

export async function POST(request) {
  try {
    const body = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { message: 'Server config error' },
        { status: 500 }
      );
    }

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    if (body.email !== adminEmail || body.password !== adminPassword) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}