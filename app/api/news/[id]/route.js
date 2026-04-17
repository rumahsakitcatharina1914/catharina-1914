import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


// GET - Fetch single news by ID
export async function GET(request, { params }) {
  try {
    const {id} = await params;
    const news = await prisma.news.findUnique({
      where: { id: parseInt(id) }
    });

    if (!news) {
      return NextResponse.json(
        { error: 'Berita tidak Ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}



// PUT - Update news
export async function PUT(request, { params }) {
  try {
    const {id} = await params;
    const body = await request.json();
    const { title, excerpt, content, thumbnail, images, category } = body; 

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const news = await prisma.news.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const newsItem = await prisma.news.findUnique({
      where: { id: parseInt(id) }
    });

    if (!newsItem) {
      return NextResponse.json(
        { error: 'Berita tidak ditemukan' },
        { status: 404 }
      );
    }

    if (newsItem.thumbnail) {
      const thumbnailPath = path.join(process.cwd(), 'public', newsItem.thumbnail);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath); 
      }
    }

    if (newsItem.images && Array.isArray(newsItem.images)) {
      for (const imageUrl of newsItem.images) {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); 
        }
      }
    }

    await prisma.news.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Berita berhasil dihapuskan' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}