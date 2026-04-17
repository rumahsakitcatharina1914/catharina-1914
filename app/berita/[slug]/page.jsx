import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Image as ImageIcon, ChevronRight, Share2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  const relatedNews = await getRelatedNews(news.category, news.id);
  const contentImages = Array.isArray(news.images) ? news.images : [];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-white pb-24">
        
        {/*BAGIAN HEADER ARTIKEL*/}
        <div className="bg-[#f8fafc] pt-12 sm:pt-16 pb-32 sm:pb-40 border-b border-gray-100 relative">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* Breadcrumb / Navigasi Atas */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 mb-8 sm:mb-10 uppercase tracking-widest">
              <Link href="/" className="hover:text-[#0077b6] transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <Link href="/berita" className="hover:text-[#0077b6] transition-colors">Berita</Link>
              <ChevronRight size={14} />
              <span className="text-[#0077b6] truncate max-w-[150px] sm:max-w-xs">{news.category}</span>
            </div>

            {/* Label Kategori */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#bae6fd]" style={{ background: '#e0f2fe', color: '#0077b6' }}>
              <Tag size={14} />
              {news.category}
            </div>

            {/* Judul Berita */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.2] mb-6 tracking-tight">
              {news.title}
            </h1>

            {/* Meta Data (Tanggal & Info Tambahan) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#0077b6]" />
                {new Date(news.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              
              {contentImages.length > 0 && (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <ImageIcon size={16} className="text-[#0077b6]" />
                    {contentImages.length} Foto Tersedia
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* THUMBNAIL UTAMA */}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 -mt-24 sm:-mt-32 relative z-10">
          <div className="w-full aspect-video sm:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 bg-gray-100 border border-white/50">
            <img
              src={news.thumbnail}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/*ISI ARTIKEL*/}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 mt-16 sm:mt-20">
          
          {/* Ringkasan (Excerpt) */}
          <div className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed mb-10 pb-10 border-b-2 border-gray-100 italic">
            "{news.excerpt}"
          </div>

          {/* Konten Utama */}
          <article className="prose prose-lg sm:prose-xl max-w-none prose-p:text-gray-700 prose-p:leading-[1.8] prose-headings:text-gray-900 prose-headings:font-black prose-a:text-[#0077b6] prose-img:rounded-2xl">
            <div className="whitespace-pre-line">
              {news.content}
            </div>
          </article>

          {/* Tombol Bagikan & Kembali */}
          <div className="mt-16 pt-8 border-t-2 border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link 
              href="/berita" 
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0077b6] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Berita
            </Link>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all bg-gray-50 hover:bg-[#e0f2fe] text-gray-700 hover:text-[#0077b6]">
              <Share2 size={16} /> Bagikan Artikel
            </button>
          </div>

          {/*GALERI FOTO*/}
          {contentImages.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0077b6]">
                  <ImageIcon size={20} />
                </div>
                Galeri Foto
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {contentImages.map((img, index) => (
                  <div key={index} className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3]">
                    <img
                      src={img}
                      alt={`${news.title} - Gambar ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                        Foto {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BERITA TERKAIT */}
      {relatedNews.length > 0 && (
        <div className="bg-[#f8fafc] py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-gray-900">Baca Juga</h2>
              <Link href="/berita" className="hidden sm:flex items-center gap-1 text-sm font-bold text-[#0077b6] hover:text-[#005ba3]">
                Lihat Semua <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/berita/${article.slug}`}
                  className="group flex flex-col bg-white rounded-3xl p-4 border border-gray-200 hover:shadow-xl hover:shadow-blue-900/5 hover:border-[#0077b6] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col px-2">
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-[#0077b6]">
                      <Calendar size={14} />
                      {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#005ba3] transition-colors line-clamp-3 leading-snug mb-4">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/berita" className="sm:hidden flex items-center justify-center gap-2 mt-8 w-full py-4 rounded-xl font-bold text-sm bg-white border border-gray-200 text-[#0077b6]">
              Lihat Semua Berita <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}