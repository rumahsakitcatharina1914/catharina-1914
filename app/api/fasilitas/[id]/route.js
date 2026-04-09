// app/api/fasilitas/[id]/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    await prisma.fasilitas.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Fasilitas berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
