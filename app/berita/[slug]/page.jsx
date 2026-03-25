import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Image as ImageIcon } from 'lucide-react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const {slug} = await params;
  const news = await prisma.news.findFirst({
    where: { slug }
  });

  if (!news) return {};

  return {
    title: `${news.title} | RS Catharina 1914`,
    description: news.excerpt
  };
}

async function getNews(slug) {
  try {
    const news = await prisma.news.findFirst({
      where: { slug }
    });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

async function getRelatedNews(category, currentId) {
  try {
    const related = await prisma.news.findMany({
      where: {
        category,
        id: { not: currentId }
      },
      take: 3,
      orderBy: { publishedAt: 'desc' }
    });
    return related;
  } catch (error) {
    return [];
  }
}

export default async function NewsDetailPage({ params }) {
  const {slug} = await params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  const relatedNews = await getRelatedNews(news.category, news.id);
  const contentImages = Array.isArray(news.images) ? news.images : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-neutral-light to-white py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali
          </Link>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
            <Tag size={14} className="inline mr-1" />
            {news.category}
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            {news.title}
          </h1>

          <div className="flex items-center gap-4 text-foreground/60">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(news.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            {contentImages.length > 0 && (
              <div className="flex items-center gap-2">
                <ImageIcon size={16} />
                {contentImages.length} gambar
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image (Thumbnail) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <img
          src={news.thumbnail}
          alt={news.title}
          className="w-full h-96 object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Excerpt */}
        <div className="text-xl text-foreground/80 font-medium mb-8 pb-8 border-b border-border">
          {news.excerpt}
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-foreground/90 leading-relaxed whitespace-pre-line mb-8">
            {news.content}
          </div>
        </div>

        {/* ✅ Content Images Gallery */}
        {contentImages.length > 0 && (
          <div className="my-12 py-8 border-y border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <ImageIcon size={24} className="text-secondary" />
              Foto Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentImages.map((img, index) => (
                <div key={index} className="group relative">
                  <img
                    src={img}
                    alt={`${news.title} - Gambar ${index + 1}`}
                    className="w-full h-80 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-lg">
                    Gambar {index + 1} dari {contentImages.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/berita/${article.slug}`}
                  className="group"
                >
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
