'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ambulance, Bed, Stethoscope, Microscope, Users, Zap, ArrowRight, Check, Instagram, Newspaper } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Rawat Jalan',
      description:
        'Layanan konsultasi dan pemeriksaan dengan dokter spesialis berpengalaman',
      features: ['Konsultasi dokter', 'Pemeriksaan kesehatan', 'Resep & Obat-obatan'],

    },
    {
      icon: Bed,
      title: 'Rawat Inap',
      description:
        'Perawatan intensif dengan fasilitas kamar modern dan nyaman',
      features: ['Kamar VIP & Standar', 'Perawatan 24 jam', 'Keluarga boleh menginap'],
    },
    {
      icon: Ambulance,
      title: 'IGD (Gawat Darurat)',
      description:
        'Layanan darurat 24 jam siap membantu kondisi medis mendesak',
      features: ['Respons 24/7', 'Dokter spesialis', 'Ambulans siaga'],

    },
    {
      icon: Users,
      title: 'Poliklinik Spesialis',
      description:
        'Layanan kesehatan spesifik dari dokter ahli bidang tertentu',
      features: ['Mata', 'Jantung', 'Anak', 'Kandungan', 'dan lainnya'],

    },
    {
      icon: Microscope,
      title: 'Laboratorium & Radiologi',
      description:
        'Diagnosa akurat dengan peralatan modern dan teknologi terkini',
      features: ['Tes darah', 'Rontgen', 'CT Scan', 'USG', 'ECG'],

    },
    {
      icon: Zap,
      title: 'Tindakan & Operasi',
      description:
        'Prosedur medis dan operasi dengan tim ahli dan fasilitas steril',
      features: ['Operasi mayor', 'Operasi minor', 'Endoskopi', 'Anestesi umum'],
  
    },
  ];

  const [instagramPosts, setInstagramPosts] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramFeeds = async () => {
      try {
        const res = await fetch('/api/instagram-feeds');
        if (res.ok) {
          const data = await res.json();
          setInstagramPosts(data.slice(0, 3));
        }

      const newsRes = await fetch('/api/news?limit=3');
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        setNewsArticles(newsData);
      }
      } catch (error) {
        console.error('Error fetching Instagram feeds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeeds();
  }, []);

  return (
    <section className="py-20 sm:py-32  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold  mb-6">
            Layanan Unggulan Kami
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Berbagai layanan kesehatan komprehensif untuk memenuhi kebutuhan
            medis Anda dan keluarga dengan fasilitas terbaik
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/50 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{
                    backgroundImage: service.linear }}
                >

                </div>

                <div className="relative z-10">
                  <div
                    className="mb-6 inline-flex p-4 bg-linear-to-br rounded-xl group-hover:shadow-lg transition-all"
                    style={{
                      backgroundImage:
                        'linear-linear(to bottom right, rgba(0, 91, 163, 0.1), rgba(0, 153, 216, 0.1))',
                    }}
                  >
                    <Icon
                      size={32}
                      className="text-secondary group-hover:text-primary transition-colors"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground/70 flex items-center gap-3"
                      >
                        <Check className="w-5 h-5 text-secondary shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Instagram Section */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  <Instagram size={16} />
                  Feed Instagram
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
                  Update Terbaru 
                </h3>

                <p className="text-foreground/70 max-w-2xl">
                  Tampilan posting terbaru dari Kami untuk berbagi edukasi
                  kesehatan, kegiatan rumah sakit, dan informasi layanan terbaru.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instagramPosts.length === 0 && (
                <div className="md:col-span-3 rounded-2xl border border-dashed border-border p-8 text-center text-foreground/70">
                  Belum ada tersedia feed Instagram. 
                </div>
              )}

              {instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-neutral-light p-4 hover:shadow-lg transition-all"
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-white">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </p>

                    <span className="inline-flex mt-2 items-center gap-2 text-primary text-sm  hover:text-primary-dark transition-colors">
                      Lihat di IG 
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>  

          
          {/* Berita Section */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/50">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-semibold mb-3">
                <Newspaper size={14} />
                Berita Terbaru
              </div>
              <h3 className="text-2xl sm:text-3xl font-black  text-foreground mb-2">
                Informasi dan Artikel
              </h3>
              <p className="text-sm text-foreground/70">
                Berita kesehatan, kegiatan, dan pengumuman penting dari RS Catharina 1914.
              </p>

            </div>
              <div className="space-y-4 mb-6">
                {newsArticles.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center text-foreground/60 text-sm">
                    Belum ada berita
                  </div>
                )}

                {newsArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/berita/${article.slug}`}
                    className="group flex gap-4 p-3 rounded-xl border border-border hover:bg-neutral-light hover:border-secondary/50 transition-all"
                  >
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary rounded text-xs font-semibold mb-1">
                        {article.category}
                      </span>
                      <p className="font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-2 text-sm mb-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/berita"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors text-sm"
              >
                Lihat Semua Berita
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
}