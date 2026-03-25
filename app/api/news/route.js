import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Tambah news
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, thumbnail, images, category } = body; 

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        thumbnail,
        images: images || [], 
        category: category || 'umum'
      }
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}

// GET 
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
      ...(limit && { take: parseInt(limit) })
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}