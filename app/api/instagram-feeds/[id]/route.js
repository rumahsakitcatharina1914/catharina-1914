import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const pool = getPool();

    const [result] = await pool.query(
      `UPDATE instagram_feeds 
       SET title = COALESCE(?, title),
           href = COALESCE(?, href),
           thumbnail = COALESCE(?, thumbnail)
       WHERE id = ?`,
      [body.title, body.href, body.thumbnail, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Data feed tidak ditemukan' },
        { status: 404 }
      );
    }

    const [rows] = await pool.query(
      'SELECT * FROM instagram_feeds WHERE id = ?',
      [params.id]
    );

    return NextResponse.json(rows[0]);

  } catch (error) {
    return NextResponse.json(
      { message: 'Database error' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      'DELETE FROM instagram_feeds WHERE id = ?',
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Data feed tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    return NextResponse.json(
      { message: 'Database error' },
      { status: 500 }
    );
  }
}