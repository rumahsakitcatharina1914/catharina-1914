import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Ambil semua doctors
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

// POST - Tambah doctor baru
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, specialization, schedule, image } = body;

    if (!name || !specialization) {
      return NextResponse.json(
        { error: 'Nama and spesialisasi wajib diisi' },
        { status: 400 }
      );
    }

 
    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        schedule: schedule || null,
        image: image || null,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error dalam membuat dokter:', error);
    return NextResponse.json(
      { error: 'Gagal untuk membuat dokter' },
      { status: 500 }
    );
  }
}