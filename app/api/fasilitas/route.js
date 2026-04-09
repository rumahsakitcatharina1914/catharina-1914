// app/api/fasilitas/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const fasilitas = await prisma.fasilitas.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(fasilitas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fasilitas' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { label, description, image, isLarge, isWide, order } = body;

    const fasilitas = await prisma.fasilitas.create({
      data: {
        label,
        description: description || null,
        image: image || null,
        isLarge: isLarge || false,
        isWide: isWide || false,
        order: order || 0,
      },
    });
    return NextResponse.json(fasilitas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create fasilitas' }, { status: 500 });
  }
}
