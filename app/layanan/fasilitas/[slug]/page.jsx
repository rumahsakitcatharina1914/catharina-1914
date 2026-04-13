// app/layanan/fasilitas/[id]/page.jsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fasilitas = await prisma.fasilitas.findUnique({ where: { id: parseInt(slug) } });
  if (!fasilitas) return {};
  return {
    title: `${fasilitas.label} | RS Catharina 1914`,
    description: fasilitas.description ?? `Fasilitas ${fasilitas.label} di RS Catharina 1914`,
  };
}

export default async function FasilitasDetail({ params }) {
  const { slug } = await params;
  const fasilitas = await prisma.fasilitas.findUnique({ where: { id: parseInt(slug) } });
  if (!fasilitas) notFound();

  // Fasilitas lainnya
  const related = await prisma.fasilitas.findMany({
    where: { isActive: true, NOT: { id: fasilitas.id } },
    orderBy: { order: 'asc' },
    take: 4,
  });

  return (
    <>
      <Header />
      <main>
 
        {/* Hero  */}
        <section className="relative overflow-hidden" 
            style={{ background: '#003566' ,
            minHeight: '50vh'
        }}>
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
 
 
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end"
            style={{ minHeight: '50vh', paddingBottom: '5rem', paddingTop: '8rem' }}>
 
            <Link href="/layanan"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors w-fit">
              <ArrowLeft size={16} /> Kembali ke Layanan
            </Link>
 
            <div className="inline-flex items-center gap-2 mb-4 text-gray-50">
              <Building2 size={16}  />
              <span className="text-xs tracking-[0.3em] uppercase font-bold">
                Fasilitas RS Catharina 1914
              </span>
            </div>
 
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tight">
              {fasilitas.label}
            </h1>
          </div>
        </section>
 
        {/* Konten */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 
              {/* Main content */}
              <div className="lg:col-span-2">
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#0077b6' }}>
                  Tentang Fasilitas
                </p>
                <h2 className="text-4xl font-black text-gray-900 mb-8">Deskripsi Fasilitas</h2>

                {/* Gambar di bawah deskripsi */}
                {fasilitas.image && (
                  <div className="mt-8 mb-8 relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-md border border-border">
                    <Image
                      src={fasilitas.image}
                      alt={fasilitas.label}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
 
                {/* Deskripsi */}
                {fasilitas.description ? (
                  <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {fasilitas.description}
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
                    Deskripsi fasilitas belum tersedia.
                  </div>
                )}
 
              </div>
 
              {/* Sidebar */}
              <div className="space-y-6">
 
                {/* Info card */}
                {/* <div className="p-6 rounded-2xl" style={{ background: '#e0f2fe' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={18} style={{ color: '#0077b6' }} />
                    <p className="font-black text-gray-900">Informasi Fasilitas</p>
                  </div>
                  <p className="text-gray-700 font-semibold">{fasilitas.label}</p>
                  <p className="text-gray-500 text-sm mt-1">RS Catharina 1914</p>
                </div> */}
 
                {/* CTA */}
                <div className="p-6 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #003566, #0077b6)' }}>
                  <h4 className="font-black text-lg mb-2">Butuh Informasi?</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Hubungi tim kami untuk informasi lebih lanjut tentang fasilitas ini.
                  </p>
                  <button
                    className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    Hubungi Kami <ArrowRight size={14} />
                  </button>
                </div>
 
                {/* Fasilitas lainnya */}
                {related.length > 0 && (
                  <div>
                    <p className="font-black text-gray-900 mb-3">Fasilitas Lainnya</p>
                    <div className="space-y-2">
                      {related.map((item) => (
                        <Link key={item.id} href={`/layanan/fasilitas/${item.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all group"
                          style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
                          {item.image ? (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={item.image} alt={item.label} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: '#e0f2fe' }}>
                              <Building2 size={16} style={{ color: '#0077b6' }} />
                            </div>
                          )}
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors truncate flex-1">
                            {item.label}
                          </span>
                          <ArrowRight size={14} className="text-gray-400 flex-shrink-0" />
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
 