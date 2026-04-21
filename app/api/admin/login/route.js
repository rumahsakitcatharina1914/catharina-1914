import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated';

export async function POST(request) {
  try {
    const body = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!body?.username || !body?.password) {
      return NextResponse.json(
        { ok: false, message: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    if (body.username !== adminUsername || body.password !== adminPassword) {
      return NextResponse.json(
        { ok: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, COOKIE_VALUE, { 
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({ ok: true, message: 'Login berhasil' });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { ok: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}