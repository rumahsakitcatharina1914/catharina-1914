import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';

export async function POST() {
  try {

    const cookieStore = await cookies();
    
    cookieStore.delete(COOKIE_NAME);
    
    console.log('Cookie deleted:', COOKIE_NAME);
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Berhasil logout' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { ok: false, message: 'Gagal logout' },
      { status: 500 }
    );
  }
}