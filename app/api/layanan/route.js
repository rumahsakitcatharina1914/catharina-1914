// app/api/layanan/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - fetch all layanan
export async function GET() {
  try {
    const layanan = await prisma.layanan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(layanan);
  } catch (error) {
    console.error('Error fetching layanan:', error);
    return NextResponse.json({ error: 'Failed to fetch layanan' }, { status: 500 });
  }
}

// POST - create layanan
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, short, description, features, schedule, image, color, bg, num, order } = body;

    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-|-$/g, '');

    const slug = `${baseSlug}-${Date.now()}`;
    
    const layanan = await prisma.layanan.create({
      data: {
        num: num || '01',
        title,
        short,
        description,
        features: features || [],
        schedule: schedule || null,
        image: image || null,
        color: color || '#0077b6',
        bg: bg || '#e0f2fe',
        slug,
        order: order || 0,
      },
    });

    return NextResponse.json(layanan);
  } catch (error) {
    console.error('Error creating layanan:', error);
    return NextResponse.json({ error: 'Failed to create layanan' }, { status: 500 });
  }
}
