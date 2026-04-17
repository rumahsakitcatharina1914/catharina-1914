'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ambulance, Bed, Stethoscope, Microscope, Users, Zap, ArrowRight, Check, Instagram, Newspaper, Calendar } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Rawat Jalan',
      description: 'Layanan konsultasi dan pemeriksaan dengan dokter spesialis berpengalaman untuk berbagai keluhan medis.',
      features: ['Konsultasi dokter', 'Pemeriksaan kesehatan', 'Resep & Obat-obatan'],
      color: '#0077b6', bg: '#e0f2fe',
    },
    {
      icon: Bed,
      title: 'Rawat Inap',
      description: 'Perawatan intensif dengan fasilitas kamar modern, bersih, dan nyaman demi proses pemulihan yang optimal.',
      features: ['Kamar VIP & Standar', 'Perawatan 24 jam', 'Keluarga boleh menginap'],
      color: '#0077b6', bg: '#e0f2fe',
    },
    {
      icon: Ambulance,
      title: 'IGD (Gawat Darurat)',
      description: 'Layanan darurat 24 jam siap membantu menangani kondisi medis mendesak Anda dengan cepat dan tanggap.',
      features: ['Respons 24/7', 'Dokter spesialis', 'Ambulans siaga'],
      color: '#0077b6', bg: '#e0f2fe',
    },
    {
      icon: Users,
      title: 'Poliklinik Spesialis',
      description: 'Layanan kesehatan spesifik dari deretan dokter ahli dan konsultan di berbagai bidang medis tertentu.',
      features: ['Mata', 'Jantung', 'Anak', 'Kandungan', 'Penyakit Dalam'],
      color: '#0077b6', bg: '#e0f2fe',
    },
    {
      icon: Microscope,
      title: 'Lab & Radiologi',
      description: 'Dukungan diagnosa akurat dengan menggunakan peralatan modern dan teknologi medis terkini.',
      features: ['Tes darah', 'Rontgen', 'CT Scan', 'USG', 'ECG'],
      color: '#0077b6', bg: '#e0f2fe',
    },
    {
      icon: Zap,
      title: 'Tindakan & Operasi',
      description: 'Prosedur tindakan medis dan bedah yang dilakukan oleh tim ahli di dalam fasilitas ruang operasi yang steril.',
      features: ['Operasi mayor', 'Operasi minor', 'Endoskopi', 'Anestesi umum'],
      color: '#0077b6', bg: '#e0f2fe',
    },
  ];

  const [instagramPosts, setInstagramPosts] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedsAndNews = async () => {
      try {
        const [igRes, newsRes] = await Promise.all([
          fetch('/api/instagram-feeds'),
          fetch('/api/news?limit=3')
        ]);

        if (igRes.ok) {
          const igData = await igRes.json();
          setInstagramPosts(igData.slice(0, 3));
        }

        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setNewsArticles(newsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedsAndNews();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* HEADER LAYANAN*/}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-[#0077b6] mb-3">
            Fasilitas & Layanan
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
            Layanan Medis Unggulan
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Kami menyediakan layanan kesehatan komprehensif dengan standar kualitas tinggi untuk memenuhi kebutuhan medis Anda dan keluarga.
          </p>
        </div>

        {/*SERVICES GRID*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group flex flex-col bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#0077b6] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Header Card: Ikon & Judul */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: service.bg, color: service.color }}
                  >
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0077b6] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Deskripsi */}
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* List Fitur */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check size={18} strokeWidth={2.5} className="text-[#0077b6] flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Garis Pemisah Antar Seksi */}
        <div className="w-full h-px bg-gray-200 mb-24"></div>

        {/* INSTAGRAM & BERITA SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Instagram */}
          <div className="w-full flex flex-col h-full">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Instagram className="text-[#0077b6]" size={24} />
                <h3 className="text-2xl font-black text-gray-900">Instagram Kami</h3>
              </div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#0077b6] transition-colors flex items-center gap-1">
                @catharina1914 <ArrowRight size={14} />
              </a>
            </div>

            {/* Grid Foto IG */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full py-12 text-center text-gray-400 animate-pulse font-medium">Memuat foto...</div>
              ) : instagramPosts.length === 0 ? (
                <div className="col-span-full p-8 border border-dashed border-gray-300 rounded-2xl text-center text-gray-500 text-sm">
                  Belum ada postingan Instagram.
                </div>
              ) : (
                instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-square hover:shadow-lg hover:border-[#0077b6] transition-all duration-300"
                  >
                    <img
                      src={post.thumbnail}
                      alt={post.title || "Instagram Post"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Efek Hover Logo IG */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <Instagram className="text-white" size={32} />
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>  

          {/*  BERITA & ARTIKEL */}
          <div className="w-full flex flex-col h-full">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Newspaper className="text-[#0077b6]" size={24} />
                <h3 className="text-2xl font-black text-gray-900">Kabar Terbaru</h3>
              </div>
              <Link href="/berita" className="text-sm font-bold text-gray-400 hover:text-[#0077b6] transition-colors flex items-center gap-1">
                Lihat Semua <ArrowRight size={14} />
              </Link>
            </div>

            {/* List Berita */}
            <div className="flex flex-col gap-4 flex-grow">
              {loading ? (
                <div className="py-12 text-center text-gray-400 animate-pulse font-medium">Memuat berita...</div>
              ) : newsArticles.length === 0 ? (
                <div className="p-8 border border-dashed border-gray-300 rounded-2xl text-center text-gray-500 text-sm">
                  Belum ada berita tersedia.
                </div>
              ) : (
                newsArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/berita/${article.slug}`}
                    className="group flex gap-5 p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#0077b6] hover:shadow-md transition-all duration-300"
                  >
                    {/* Thumbnail Berita */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Info Berita */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0077b6]">
                        <Calendar size={12} />
                        {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-[#005ba3] transition-colors line-clamp-2 text-base leading-snug">
                        {article.title}
                      </h4>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}