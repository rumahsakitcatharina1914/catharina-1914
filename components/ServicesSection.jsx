'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ambulance, Bed, Stethoscope, Microscope, Users, Zap, ArrowRight, CheckCircle, Instagram, Newspaper, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  
  const [services, setServices] = useState([]);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/layanan');
      if (res.ok) {
        const data = await res.json();
        const activeServices = data.filter(service => service.isActive);
        setServices(activeServices);
      }
    } catch (error) {
      console.error('Gagal mengambil data layanan:', error);
    } finally {
      setLoading(false);
    }
  };
  

    useEffect(()=> {
    fetchServices();
  },  []);

  
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
          
          >
          <p className="text-sm font-bold uppercase tracking-widest text-[#0077b6] mb-3">
            Fasilitas & Layanan
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
            Layanan Medis Unggulan
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Kami menyediakan layanan kesehatan komprehensif dengan standar kualitas tinggi untuk memenuhi kebutuhan medis Anda dan keluarga.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.slice(0, 3).map((service, index) => {
            const features = Array.isArray(service.features) ? service.features : [];
            return (
              <motion.div 
                key={service.id} 
                id={`layanan-${service.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              
              >

                {/* Image  */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {service.image ? (
                    <img src={service.image} alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: service.bg || '#e0f2fe' }}>
                      <Stethoscope size={60} style={{ color: '#0077b6', opacity: 0.3 }} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {service.short && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                        style={{ background: '#005ba3' }}>{service.short}</span>
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex font-semibold items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: '#e0f2fe', color: '#0077b6' }}>
                      {service.num || '00'}
                    </div>
                    <h3 className="text-xl mt-2 font-bold text-gray-900 group-hover:text-[#0077b6] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* List Fitur*/}
                  <div className="space-y-2 mb-4">
                    {features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: service.bg || '#e0f2fe' }}>
                          <CheckCircle size={12} style={{ color: '#0077b6' }} />
                        </div>
                        <span className="text-xs text-gray-600 line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Link ke detail */}
                  <Link href={`/layanan/${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-1"
                    style={{ background: '#005ba3' }}>
                    Info Lengkap
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tombol navigasi */}
        <div className="flex justify-center mb-24">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#0077b6] text-[#0077b6] font-bold rounded-full hover:bg-[#005ba3] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            Lihat Semua Layanan 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
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