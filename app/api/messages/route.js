import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const pool = getPool();

    const [rows] = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { message: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.phone || !body?.message) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const pool = getPool();
    const id = randomUUID();

    await pool.query(
      `INSERT INTO messages 
       (id, name, email, phone, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.email,
        body.phone,
        body.message
      ]
    );

    return NextResponse.json(
      {
        id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Database error' },
      { status: 500 }
    );
  }
}