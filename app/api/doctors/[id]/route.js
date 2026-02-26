import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const pool = getPool();

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      //Update doctors table
      const [result] = await connection.query(
        `UPDATE doctors 
         SET name = COALESCE(?, name),
             specialization = COALESCE(?, specialization),
             experience = COALESCE(?, experience),
             education = COALESCE(?, education)
         WHERE id = ?`,
        [
          body.name,
          body.specialization,
          body.experience !== undefined ? Number(body.experience) : null,
          body.education,
          params.id
        ]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json(
          { message: 'Dokter tidak ditemukan' },
          { status: 404 }
        );
      }

      // Update schedule (jika dikirim)
      if (Array.isArray(body.schedule)) {
        // hapus schedule lama
        await connection.query(
          'DELETE FROM doctor_schedules WHERE doctor_id = ?',
          [params.id]
        );

        // insert schedule baru
        for (const item of body.schedule) {
          await connection.query(
            'INSERT INTO doctor_schedules (doctor_id, day, time) VALUES (?, ?, ?)',
            [params.id, item.day, item.time]
          );
        }
      }

      await connection.commit();
      connection.release();

      return NextResponse.json({ message: 'Update berhasil' });

    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }

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
    const connection = await pool.getConnection();

    await connection.beginTransaction();

    try {
      // hapus schedule dulu (foreign key safety)
      await connection.query(
        'DELETE FROM doctor_schedules WHERE doctor_id = ?',
        [params.id]
      );

      const [result] = await connection.query(
        'DELETE FROM doctors WHERE id = ?',
        [params.id]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        connection.release();
        return NextResponse.json(
          { message: 'Dokter tidak ditemukan' },
          { status: 404 }
        );
      }

      await connection.commit();
      connection.release();

      return NextResponse.json({ ok: true });

    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }

  } catch (error) {
    return NextResponse.json(
      { message: 'Database error' },
      { status: 500 }
    );
  }
}