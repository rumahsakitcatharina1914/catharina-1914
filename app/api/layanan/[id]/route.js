import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    const { title, short, description, features, schedule, image, color, bg, num, order, isActive } = body;

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
            color: color || '#0077b6', 
            bg: bg || '#e0f2fe', 
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
    await prisma.layanan.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Layanan berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
