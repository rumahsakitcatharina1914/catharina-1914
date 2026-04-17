'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Newspaper, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BeritaPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />
      
      {/* ── KONTEN UTAMA ── */}
      <main className="min-h-screen bg-[#f8fafc] pt-20 sm:pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* ── TOMBOL KEMBALI ── */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0077b6] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>

          {/* ── HEADER HALAMAN ── */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-5 border border-[#bae6fd]" style={{ background: '#e0f2fe', color: '#0077b6' }}>
              <Newspaper size={16} /> Pusat Informasi
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
              Kabar & <span className="text-gray-400">Artikel Terbaru</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
              Dapatkan informasi terkini seputar dunia kesehatan, kegiatan rumah sakit, edukasi medis, dan pengumuman resmi dari RS Catharina 1914.
            </p>
          </div>

          {/* ── LOADING SKELETON (UKURAN KECIL - 4 KOLOM) ── */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                  <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl mb-4"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-5 w-full bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          )}

          {/* ── EMPTY STATE (KOSONG) ── */}
          {!loading && articles.length === 0 && (
            <div className="w-full bg-white border border-dashed border-gray-300 rounded-[2.5rem] py-24 text-center flex flex-col items-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Newspaper className="text-gray-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Artikel</h3>
              <p className="text-gray-500 font-medium">Saat ini belum ada berita atau edukasi medis yang dipublikasikan.</p>
            </div>
          )}

          {/* ── GRID BERITA (CARD KECIL 4 KOLOM) ── */}
          {!loading && articles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/berita/${article.slug}`}
                  className="group flex flex-col bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-xl hover:shadow-blue-900/5 hover:border-[#0077b6] transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Thumbnail Gambar (Aspect Ratio 4:3) */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                    <img 
                      src={article.thumbnail} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay Tipis saat di Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                  
                  {/* Konten Card */}
                  <div className="flex-1 flex flex-col px-1">
                    {/* Tanggal */}
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-[#0077b6]">
                      <Calendar size={14} />
                      {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                    
                    {/* Judul Berita */}
                    <h2 className="text-lg font-black text-gray-900 group-hover:text-[#005ba3] transition-colors line-clamp-3 leading-snug mb-6">
                      {article.title}
                    </h2>
                    
                    {/* Tombol Baca */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-gray-400 group-hover:text-[#0077b6] transition-colors  tracking-widest text-[10px] sm:text-xs">
                        Baca Selengkapnya
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#e0f2fe] transition-colors">
                        <ArrowRight size={14} className="text-gray-400 group-hover:text-[#0077b6] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}