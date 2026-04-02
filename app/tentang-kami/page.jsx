import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { CheckCircle, ArrowRight, Calendar, Target, Heart, Shield, Users, Award, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami | Rumah Sakit Catharina 1914',
  description: 'Sejarah, visi, misi, dan nilai-nilai Rumah Sakit Catharina 1914.',
};

async function getLatestNews() {
  try {
    const news = await prisma.news.findMany({ take: 3, orderBy: { publishedAt: 'desc' } });
    return news;
  } catch { return []; }
}

export default async function TentangKami() {
  const latestNews = await getLatestNews();

  const timeline = [
    { year: '1914', title: 'Pendirian', description: 'Rumah Sakit Catharina didirikan oleh para suster kongregasi dengan visi mulia melayani kesehatan masyarakat tanpa memandang latar belakang.' },
    { year: '1950', title: 'Ekspansi Pertama', description: 'Penambahan fasilitas rawat inap, bangsal baru, dan pembukaan departemen spesialis pertama untuk melayani lebih banyak pasien.' },
    { year: '2000', title: 'Era Modernisasi', description: 'Adopsi teknologi medis terkini, sertifikasi internasional, dan transformasi digital sistem manajemen rumah sakit.' },
    { year: '2024', title: 'Inovasi Digital', description: 'Terus berinovasi dengan layanan kesehatan digital, telemedicine, dan program kesehatan masyarakat berkelanjutan.' },
  ];

  const strukturOrganisasi = [
    { jabatan: 'Direktur Utama', nama: 'Dr. Andreas Santoso, Sp.PD', foto: null },
    { jabatan: 'Direktur Medis', nama: 'Dr. Maria Helena, Sp.OG', foto: null },
    { jabatan: 'Direktur Operasional', nama: 'Bpk. Thomas Kurniawan, M.M.', foto: null },
    { jabatan: 'Direktur Keuangan', nama: 'Ibu. Lucia Dewi, S.E., M.Ak.', foto: null },
    { jabatan: 'Kepala Keperawatan', nama: 'Ns. Fransiska, S.Kep., M.Kes.', foto: null },
    { jabatan: 'Kepala Farmasi', nama: 'Apt. Benediktus, S.Farm.', foto: null },
  ];

  const misiList = [
    'Memberikan pelayanan kesehatan berkualitas dan inovatif kepada seluruh lapisan masyarakat',
    'Menjangkau semua kalangan dengan harga yang terjangkau dan transparan',
    'Mengembangkan sumber daya manusia yang profesional, kompeten, dan berintegritas',
    'Berkomitmen pada penelitian, inovasi, dan pengembangan medis berkelanjutan',
  ];

  const tujuanList = [
    { icon: Shield, title: 'Keselamatan Pasien', desc: 'Standar keselamatan tertinggi di setiap prosedur medis' },
    { icon: Award, title: 'Akreditasi Nasional', desc: 'Mempertahankan akreditasi KARS Paripurna setiap periode' },
    { icon: TrendingUp, title: 'Pertumbuhan Layanan', desc: 'Terus memperluas jangkauan dan jenis layanan kesehatan' },
    { icon: Users, title: 'Kepuasan Masyarakat', desc: 'Menjadi mitra kesehatan terpercaya keluarga Indonesia' },
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* ════════════════════════════════════════
            HERO — full-bleed editorial
        ════════════════════════════════════════ */}
        <section
          className="relative min-h-[100svh] flex flex-col justify-end"
          style={{ background: 'linear-gradient(160deg, #001d3d 0%, #003566 45%, #0077b6 100%)' }}
        >
          {/* dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* diagonal accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full" style={{ background: '#00b4d8' }} />

          {/* floating year */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
            <span className="block text-[20vw] font-black text-white/[0.04] leading-none tracking-tighter pr-4">
              1914
            </span>
          </div>

          {/* content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-24 pt-40">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#00b4d8]" />
                <span className="text-[#90e0ef] text-xs tracking-[0.3em] uppercase font-semibold">Sejak 1914</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8">
                RUMAH<br />
                SAKIT<br />
                <span style={{ color: '#00b4d8' }}>CATHARINA</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-xl font-light">
                Lebih dari satu abad hadir — mengabdi untuk kesehatan masyarakat dengan hati, ilmu, dan teknologi terkini.
              </p>
            </div>
          </div>

          {/* bottom stats bar */}
          <div className="relative z-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                  { n: '110+', l: 'Tahun Berdiri' },
                  { n: '500+', l: 'Tenaga Medis' },
                  { n: '100K+', l: 'Pasien / Tahun' },
                  { n: '50+', l: 'Spesialisasi' },
                ].map((s, i) => (
                  <div key={i} className="py-8 px-2 border-r border-white/10 last:border-r-0 text-center">
                    <div className="text-3xl sm:text-4xl font-black text-white mb-1">{s.n}</div>
                    <div className="text-white/40 text-xs tracking-widest uppercase">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SEJARAH — horizontal scrolling timeline feel
        ════════════════════════════════════════ */}
        <section className="py-28 sm:py-40" style={{ background: '#f7f9fc' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>01 — Sejarah</p>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                Perjalanan<br />
                <span className="text-gray-300">110 Tahun</span>
              </h2>
            </div>

            {/* vertical timeline */}
            <div className="relative">
              {/* line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="relative flex gap-8 sm:gap-16 group">
                    {/* dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center font-black text-xs sm:text-sm border-2 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: i % 2 === 0 ? '#0077b6' : '#f7f9fc',
                          borderColor: '#0077b6',
                          color: i % 2 === 0 ? 'white' : '#0077b6',
                        }}>
                        {item.year.slice(2)}'
                      </div>
                    </div>

                    {/* content */}
                    <div className={`flex-1 pb-16 ${i < timeline.length - 1 ? '' : ''}`}>
                      <div className="group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: '#0077b6' }}>
                          {item.year}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed max-w-lg">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STRUKTUR ORGANISASI
        ════════════════════════════════════════ */}
        <section className="py-28 sm:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>02 — Struktur</p>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                Organisasi<br />
                <span className="text-gray-300">Kepemimpinan</span>
              </h2>
            </div>

            {/* top 1 director */}
            <div className="mb-6">
              <div className="max-w-xs mx-auto">
                <div className="relative rounded-2xl overflow-hidden border-2 p-6 text-center transition-all hover:shadow-xl"
                  style={{ borderColor: '#0077b6', background: 'linear-gradient(135deg, #001d3d, #0077b6)' }}>
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#90e0ef' }}>
                    {strukturOrganisasi[0].nama.split(' ')[0][0]}
                    {strukturOrganisasi[0].nama.split(' ')[1]?.[0] ?? ''}
                  </div>
                  <p className="text-xs tracking-widest uppercase font-bold mb-1" style={{ color: '#90e0ef' }}>
                    {strukturOrganisasi[0].jabatan}
                  </p>
                  <p className="text-white font-bold text-sm leading-snug">{strukturOrganisasi[0].nama}</p>
                </div>
                {/* connector */}
                <div className="flex justify-center"><div className="w-px h-8" style={{ background: '#e2e8f0' }} /></div>
              </div>
            </div>

            {/* 3 directors row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {strukturOrganisasi.slice(1, 4).map((org, i) => (
                <div key={i}>
                  <div className="rounded-2xl border border-gray-100 p-5 text-center hover:border-blue-200 hover:shadow-md transition-all bg-white group">
                    <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-black transition-all group-hover:scale-105"
                      style={{ background: '#e0f2fe', color: '#0077b6' }}>
                      {org.nama.split(' ')[0][0]}{org.nama.split(' ')[1]?.[0] ?? ''}
                    </div>
                    <p className="text-xs tracking-widest uppercase font-bold mb-1 text-gray-400">{org.jabatan}</p>
                    <p className="text-gray-800 font-semibold text-sm leading-snug">{org.nama}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6" style={{ background: '#e2e8f0' }} />
            </div>

            {/* 2 kepala row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {strukturOrganisasi.slice(4).map((org, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 p-5 text-center hover:border-blue-200 hover:shadow-md transition-all bg-white group">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-black"
                    style={{ background: '#f0f9ff', color: '#0077b6' }}>
                    {org.nama.split(' ')[0][0]}{org.nama.split(' ')[1]?.[0] ?? ''}
                  </div>
                  <p className="text-xs tracking-widest uppercase font-bold mb-1 text-gray-400">{org.jabatan}</p>
                  <p className="text-gray-800 font-semibold text-sm leading-snug">{org.nama}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════
            VISI MISI TUJUAN — bold split layout
        ════════════════════════════════════════ */}
        <section style={{ background: '#001d3d' }} className="py-28 sm:py-40">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#00b4d8' }}>03 — Arah</p>
              <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight">
                Visi, Misi<br />
                <span style={{ color: '#00b4d8' }}>& Tujuan</span>
              </h2>
            </div>

            {/* VISI — full width statement */}
            <div className="relative mb-12 p-10 sm:p-14 rounded-3xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="absolute top-6 right-8 text-[80px] font-black leading-none select-none"
                style={{ color: 'rgba(0,180,216,0.06)' }}>VISI</div>
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <Target className="flex-shrink-0 mt-1" size={20} style={{ color: '#00b4d8' }} />
                <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#00b4d8' }}>Visi Kami</span>
              </div>
              <p className="text-2xl sm:text-3xl text-white font-light leading-relaxed relative z-10 max-w-4xl">
                "Menjadi rumah sakit pilihan utama yang dikenal dengan standar pelayanan kesehatan internasional, inovasi berkelanjutan, dan kepedulian tulus terhadap setiap jiwa yang kami layani."
              </p>
            </div>

            {/* MISI grid */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <Heart size={20} style={{ color: '#00b4d8' }} />
                <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#00b4d8' }}>Misi Kami</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {misiList.map((m, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl group transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-3xl font-black leading-none flex-shrink-0"
                      style={{ color: 'rgba(0,180,216,0.25)' }}>
                      0{i + 1}
                    </span>
                    <p className="text-white/70 leading-relaxed text-sm group-hover:text-white/90 transition-colors">{m}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TUJUAN */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp size={20} style={{ color: '#00b4d8' }} />
                <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#00b4d8' }}>Tujuan Kami</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tujuanList.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div key={i} className="p-6 rounded-2xl group hover:bg-[#0077b6] transition-all duration-300 cursor-default"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                        style={{ background: 'rgba(0,180,216,0.15)' }}>
                        <Icon size={18} style={{ color: '#00b4d8' }} />
                      </div>
                      <h4 className="text-white font-bold mb-2 text-sm">{t.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">{t.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════
            BERITA — editorial masonry feel
        ════════════════════════════════════════ */}
        <section className="py-28 sm:py-40" style={{ background: '#f7f9fc' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-20">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>04 — Berita</p>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                  Informasi<br />
                  <span className="text-gray-300">Terkini</span>
                </h2>
              </div>
              <Link href="/berita"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm transition-all"
                style={{ background: '#001d3d', color: 'white' }}>
                Lihat Semua
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {latestNews.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 p-20 text-center text-gray-400">
                Belum ada berita tersedia.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* featured — large */}
                {latestNews[0] && (
                  <Link href={`/berita/${latestNews[0].slug}`}
                    className="lg:col-span-7 group relative overflow-hidden rounded-3xl"
                    style={{ minHeight: '480px' }}>
                    <img src={latestNews[0].thumbnail} alt={latestNews[0].title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                        style={{ background: '#0077b6' }}>
                        {latestNews[0].category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3 group-hover:text-[#90e0ef] transition-colors">
                        {latestNews[0].title}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-2 mb-4">{latestNews[0].excerpt}</p>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Calendar size={12} />
                        {new Date(latestNews[0].publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </Link>
                )}

                {/* side articles */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {latestNews.slice(1).map((article) => (
                    <Link key={article.id} href={`/berita/${article.slug}`}
                      className="group flex gap-4 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all">
                      <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden">
                        <img src={article.thumbnail} alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 py-5 pr-5 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold mb-2"
                          style={{ background: '#e0f2fe', color: '#0077b6' }}>
                          {article.category}
                        </span>
                        <h3 className="font-black text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#0077b6] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <Calendar size={11} />
                          {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* fill empty slots */}
                  {latestNews.length < 3 && (
                    <div className="flex-1 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center p-8 text-gray-400 text-sm text-center">
                      Berita lainnya segera hadir
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}