'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ambulance, Bed, Stethoscope, Microscope, Users, Zap, ArrowRight, Check, Instagram, ExternalLink} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Rawat Jalan',
      description: 'Layanan konsultasi dan pemeriksaan dengan dokter spesialis berpengalaman',
      features: ['Konsultasi dokter', 'Pemeriksaan kesehatan', 'Resep & Obat-obatan'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Bed,
      title: 'Rawat Inap',
      description: 'Perawatan intensif dengan fasilitas kamar modern dan nyaman',
      features: ['Kamar VIP & Standar', 'Perawatan 24 jam', 'Keluarga boleh menginap'],
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Ambulance,
      title: 'IGD (Gawat Darurat)',
      description: 'Layanan darurat 24 jam siap membantu kondisi medis mendesak',
      features: ['Respons 24/7', 'Dokter spesialis', 'Ambulans siaga'],
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Poliklinik Spesialis',
      description: 'Layanan kesehatan spesifik dari dokter ahli bidang tertentu',
      features: ['Mata', 'Jantung', 'Anak', 'Kandungan', 'dan lainnya'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Microscope,
      title: 'Laboratorium & Radiologi',
      description: 'Diagnosa akurat dengan peralatan modern dan teknologi terkini',
      features: ['Tes darah', 'Rontgen', 'CT Scan', 'USG', 'ECG'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Zap,
      title: 'Tindakan & Operasi',
      description: 'Prosedur medis dan operasi dengan tim ahli dan fasilitas steril',
      features: ['Operasi mayor', 'Operasi minor', 'Endoskopi', 'Anestesi umum'],
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const [instagramPosts, setInstagramPosts] = useState([]);

  useEffect(() => {
    const loadInstagramPosts = async () => {
      try {
        const response = await fetch('/api/instagram-feeds');
        if (!response.ok) return;
        const data = await response.json();
        setInstagramPosts(data);
      } catch {
        // fallback: keep empty state
      }
    };

    loadInstagramPosts();
  }, []);



  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white via-neutral-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold">
            Layanan Komprehensif
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Layanan Unggulan Kami
          </h2>
          <p className="text-xl text-neutral-gray leading-relaxed">
            Berbagai layanan kesehatan komprehensif untuk memenuhi kebutuhan medis Anda dan keluarga dengan fasilitas terbaik
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
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity" style={{backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--secondary))`}}></div>
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 bg-gradient-to-br rounded-xl group-hover:shadow-lg transition-all" style={{backgroundImage: `linear-gradient(to bottom right, rgba(0, 91, 163, 0.1), rgba(0, 153, 216, 0.1))`}}>
                    <Icon size={32} className="text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-foreground/70 flex items-center gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

       {/* instagram reels */}
        <div className="relative rounded-3xl overflow-hidden border border-primary/15 bg-white p-8 sm:p-12 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  <Instagram size={16}/>
                  Feed Instagram
                </div>
                <h3 className="text-3xl sm:text-4xl font serif- font-bold text-foreground mb-2">Update Terbaru RS Catharina</h3>
                <p className="text-foreground/70 max-w-2xl">Tampilkan posting terbaru Instagram untuk berbagi edukasi kesehatan, kegiatan rumah sakit, dan informasi layanan terbaru.</p>
              </div>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Ikuti Instagram
                <ExternalLink size={18} />
              </Link>
            </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instagramPosts.length === 0 && (
              <div className="md:col-span-3 rounded-2xl border border-dashed border-border p-8 text-center text-foreground/70">
                Belum ada feed Instagram. Tambahkan dari dashboard admin.
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
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</p>
                        <span className="inline-flex mt-2 items-center gap-2 text-primary text-sm font-semibold hover:text-primary-dark transition-colors">
                          Lihat di Instagram
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div> 
        </div>
      </div>
    </section>
  );
}
