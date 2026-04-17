import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


// PUT - Update doctor
export async function PUT(request, { params }) {
  try {

    const { id } = await params;
    const doctorId = parseInt(id);
    
    const body = await request.json();

    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: body,
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error Update dokter:', error);
    return NextResponse.json(
      { error: 'Gagal untuk mengupdate dokter' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus doctor
export async function DELETE(request, { params }) {
  try {

    const { id } = await params;
    const doctorId = parseInt(id);

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return NextResponse.json(
        {error: "Dokter tidak ditemukan" },
        {status: 404}
      );
    }

    if (doctor.image) {
      const imagePath = path.join(process.cwd(), 'public', doctor.image);

      if(fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.doctor.delete({
      where: { id: doctorId },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Berhasil Menghapus dokter' 
    });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json(
      { error: 'Gagal untuk menghapus dokter' },
      { status: 500 }
    );
  }
}