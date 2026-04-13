// app/layanan/[slug]/page.jsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CheckCircle, Clock, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const layanan = await prisma.layanan.findFirst({ where: { slug } });
  if (!layanan) return {};
  return {
    title: `${layanan.title} | RS Catharina 1914`,
    description: layanan.description,
  };
}

export default async function LayananDetail({ params }) {
  const { slug } = await params;
  const layanan = await prisma.layanan.findFirst({ where: { slug } });
  if (!layanan) notFound();

  const features = Array.isArray(layanan.features) ? layanan.features : [];


  const related = await prisma.layanan.findMany({
    where: { isActive: true, NOT: { id: layanan.id } },
    orderBy: { order: 'asc' },
    take: 3,
  });

  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section className="relative overflow-hidden" style={{ minHeight: '40vh' }}>
          <div 
            className="absolute inset-0"
            style={{ background: '#003566' }}
              >
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end"
            style={{ minHeight: '40vh', paddingBottom: '6rem', paddingTop: '4rem' }}>

            <Link href="/layanan" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-10 transition-colors w-fit">
              <ArrowLeft size={16} /> Kembali ke Layanan
            </Link>

            {/* <div className="w-fit inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black text-white mb-4"
              style={{ background: layanan.color }}>
              {layanan.num} — {layanan.short}
            </div> */}

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tight mb-4">
              {layanan.title}
            </h1>

            {layanan.schedule && (
              <div className="flex items-center gap-2 mt-2 text-white/60 text-sm">
                <Clock size={15} />
                <span>{layanan.schedule}</span>
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Main content */}
              <div className="lg:col-span-2">
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: layanan.color }}>
                  Tentang Layanan
                </p>
                <h2 className="text-4xl font-black text-gray-900 mb-6">Deskripsi Layanan</h2>
                  {layanan.image && (
                    <div className="mt-8 mb-8 relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-md border border-border">
                      <Image 
                      src={layanan.image} 
                      alt={layanan.title} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                  )}

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{layanan.description}</p>
                </div>

                {features.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Fasilitas & Layanan Tersedia</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border"
                          style={{ borderColor: '#e2e8f0', background: layanan.bg }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: layanan.color }}>
                            <CheckCircle size={13} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Jadwal */}
                {layanan.schedule && (
                  <div className="p-6 rounded-2xl" style={{ background: layanan.bg }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={18} style={{ color: layanan.color }} />
                      <p className="font-black text-gray-900">Jadwal Operasional</p>
                    </div>
                    <p className="text-gray-700 font-semibold">{layanan.schedule}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="p-6 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #003566, #0077b6)' }}>
                  <h4 className="font-black text-lg mb-2">Butuh Informasi?</h4>
                  <p className="text-white/70 text-sm mb-4">Hubungi tim kami untuk informasi lebih lanjut tentang layanan ini.</p>
                  <button className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    Hubungi Kami <ArrowRight size={14} />
                  </button>
                </div>

                {/* Layanan lain */}
                {related.length > 0 && (
                  <div>
                    <p className="font-black text-gray-900 mb-3">Layanan Lainnya</p>
                    <div className="space-y-2">
                      {related.map((r) => (
                        <Link key={r.id} href={`/layanan/${r.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all group"
                          style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: r.bg }}>
                            <span className="text-xs font-black" style={{ color: r.color }}>{r.num}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors truncate">{r.title}</span>
                          <ChevronRight size={14} className="text-gray-400 flex-shrink-0 ml-auto" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
