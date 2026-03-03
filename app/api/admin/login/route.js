import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated';

export async function POST(request) {
  try {
    const body = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'catharina2026@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { ok: false, message: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    if (body.email !== adminEmail || body.password !== adminPassword) {
      return NextResponse.json(
        { ok: false, message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // ✅ PERBAIKAN: Pakai cookieStore, bukan cookies() lagi
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {  // ← Ganti cookies() jadi cookieStore
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({ ok: true, message: 'Login berhasil' });

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { ok: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}