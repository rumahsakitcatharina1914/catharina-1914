import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, description, image, isLarge, isWide, order, isActive } = body;

    const fasilitas = await prisma.fasilitas.update({
      where: { id: parseInt(id) },
      data: { label, description, image, isLarge, isWide, order, isActive },
    });
    return NextResponse.json(fasilitas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const fasilitasId = parseInt(id);

    const fasilitas = await prisma.fasilitas.findUnique({
      where: { id: fasilitasId }
    });

    if (!fasilitas) {
      return NextResponse.json(
        { error: 'Fasilitas tidak ditemukan' }, 
        { status: 404 }
      );
    }

    if (fasilitas.image) {
      const imagePath = path.join(process.cwd(), 'public', fasilitas.image);
      
      // Cek apakah file fisik benar-benar ada, lalu hapus
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (fasilitas.images && Array.isArray(fasilitas.images)) {
      for (const imgUrl of fasilitas.images) {
        const imgPath = path.join(process.cwd(), 'public', imgUrl);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
    }

    await prisma.fasilitas.delete({ where: { id: parseInt(id) } });
    
    return NextResponse.json({ message: 'Fasilitas berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
