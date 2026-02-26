import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM instagram_feeds ORDER BY created_at DESC'
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.title || !body?.href || !body?.thumbnail) {
      return NextResponse.json(
        { message: 'title, href, dan thumbnail wajib diisi' },
        { status: 400 }
      );
    }

    const pool = getPool();
    const id = randomUUID();

    await pool.query(
      'INSERT INTO instagram_feeds (id, title, href, thumbnail) VALUES (?, ?, ?, ?)',
      [id, body.title, body.href, body.thumbnail]
    );

    const [rows] = await pool.query(
      'SELECT * FROM instagram_feeds WHERE id = ?',
      [id]
    );


    return NextResponse.json(
      { id, ...body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}