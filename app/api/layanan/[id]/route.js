import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const layanan = await prisma.layanan.findUnique({
      where: { id: parseInt(id) },
    });
    if (!layanan) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json(layanan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, short, description, features, schedule, image, num, order, isActive } = body;

    const existing = await prisma.layanan.findUnique({ 
    where: { id: parseInt(id) } 
    });
    
    if (!existing) {
      return NextResponse.json({ error: 'Layanan tidak ditemukan' }, { status: 404 });
    }
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-|-$/g, '');


    const layanan = await prisma.layanan.update({
          where: { id: parseInt(id) },
          data: { 
            num, 
            title, 
            short, 
            description, 
            features: features || [], 
            schedule: schedule || null, 
            image: image || null, 
            slug: existing.slug, 
            order: order || 0, 
            isActive: isActive ?? true,
          },
        });
        return NextResponse.json(layanan);
      } catch (error) {
        console.error('Error updating layanan:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
      }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const layanan = await prisma.layanan.findUnique({
      where: { id: parseInt(id) }
    });

    if (!layanan) {
      return NextResponse.json({ error: 'Layanan tidak ditemukan' }, { status: 404 });
    }

    if (layanan.image) {
      const imagePath = path.join(process.cwd(), 'public', layanan.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.layanan.delete({ where: { id: parseInt(id) } });
    
    return NextResponse.json({ message: 'Layanan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting layanan:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
