import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const pool = getPool();

    const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.name,
        d.specialization,
        d.experience,
        d.education,
        d.created_at,
        d.updated_at,
        ds.id AS schedule_id,
        ds.day,
        ds.time
      FROM doctors d
      LEFT JOIN doctor_schedules ds
        ON d.id = ds.doctor_id
      ORDER BY d.created_at DESC
    `);

    // grouping schedule ke dalam array
    const doctorsMap = {};

    for (const row of rows) {
      if (!doctorsMap[row.id]) {
        doctorsMap[row.id] = {
          id: row.id,
          name: row.name,
          specialization: row.specialization,
          experience: row.experience,
          education: row.education,
          created_at: row.created_at,
          updated_at: row.updated_at,
          schedule: [],
        };
      }

      if (row.schedule_id) {
        doctorsMap[row.id].schedule.push({
          id: row.schedule_id,
          day: row.day,
          time: row.time,
        });
      }
    }

    return NextResponse.json(Object.values(doctorsMap));

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

    if (!body?.name || !body?.specialization) {
      return NextResponse.json(
        { message: 'name dan specialization wajib diisi' },
        { status: 400 }
      );
    }

    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const doctorId = randomUUID();

      // insert ke doctors
      await connection.query(
        `INSERT INTO doctors 
         (id, name, specialization, experience, education) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          doctorId,
          body.name,
          body.specialization,
          Number(body.experience || 0),
          body.education || '',
        ]
      );

      // insert schedule jika ada
      if (Array.isArray(body.schedule)) {
        for (const item of body.schedule) {
          await connection.query(
            `INSERT INTO doctor_schedules 
             (doctor_id, day, time) 
             VALUES (?, ?, ?)`,
            [doctorId, item.day, item.time]
          );
        }
      }

      await connection.commit();
      connection.release();

      return NextResponse.json(
        { id: doctorId, ...body },
        { status: 201 }
      );

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