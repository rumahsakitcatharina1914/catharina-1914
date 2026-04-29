import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { CheckCircle, ArrowRight, Calendar, Target, Heart, Shield, User, Users, Award, TrendingUp,} from 'lucide-react';
export const dynamic = 'force-dynamic'; 
export const revalidate = 0; 

export const metadata = {
  title: 'Tentang Kami | RS Catharina 1914',
  description: 'Sejarah, visi, misi, dan Struktur Organisasi Rumah Sakit Catharina 1914.',
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
    { year: '1914', title: 'Pendirian', description: 'Rumah sakit ini dahulunya berada di bawah kepemilikan perusahaan perkebunan Belanda-Amerika yang bernama Hollandsch-Amerikaansche Plantage Maatschappij (HAPM). Pada masa kepemilikan HAPM rumah sakit ini bernama Catharina Hospitaal yang diambil dari nama salah satu dokter pertama yang bertugas di rumah sakit tersebut.' },
    { year: '1950', title: 'Ekspansi Pertama', description: 'Dalam perjalanan sejarahnya yang tidak terlepas dari nasib perusahaan perkebunan HAPM yang pernah dinasionalisasi pada tahun 1960-an menjadi PN Karet XVI, kemudian berganti nama menjadi PT Uniroyal Rubber Sumatera Plantations, kemudian menjadi PT United Sumatera Plantations (USP)' },
    { year: '2000', title: 'Era Modernisasi', description: 'Kepemilikan menjadi PT Bakrie Sumatera Plantations hingga sampai akhirnya tahun 2015 rumah sakit ini berpisah manajemen dengan perusahan perkebunan dan dikukuhkan menjadi RSU Ibu Kartini oleh PT Kartini Sentra Medika. Adopsi yang dilakukan yaitu teknologi medis terkini, sertifikasi, dan transformasi digital sistem manajemen rumah sakit.' },
    { year: '2024', title: 'Inovasi Digital', description: 'Nama rumah sakit berubah menjadi RS Catharina 1914. Rumah Sakit ini terus mengembangkan inovasi digital melalui layanan kesehatan berbasis teknologi, termasuk telemedicine serta program kesehatan masyarakat yang berkelanjutan.' },
  ];


  const misiList = [
    'Menyediakan layanan masyarakat yang bermutu, terjangkau, dan berorientasi pada pasien.',
    'Menjaga dan mengembangkan tradisi kualitas pelayanan medis melalui penerapan nilai-nilai bekerja keras, berintegritas, dan bekerja sama di setiap aspek layanan.',
    'Melakukan pelatihan dan pengembangan berkelanjutan bagi tenaga medis dan staf, sehingga dapat memberikan pelayanan profesional yang selaras dengan kebutuhan masyarakat.',
    'Menjalin kemitraan yang erat dengan industri perkebunan dan pemerintah untuk mendukung peningkatan kualitas dan kesejahteraan lingkungan masyarakat.',
  ];

  const tujuanList = [
    { icon: Shield, title: 'Keselamatan Pasien', desc: 'Standar keselamatan tertinggi di setiap prosedur medis' },
    { icon: Award, title: 'Akreditasi Nasional', desc: 'Mempertahankan akreditasi pada setiap periode' },
    { icon: TrendingUp, title: 'Pertumbuhan Layanan', desc: 'Terus memperluas jangkauan dan jenis layanan kesehatan' },
    { icon: Users, title: 'Kepuasan Masyarakat', desc: 'Menjadi mitra kesehatan terpercaya keluarga Indonesia' },
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/*HERO */}
        <section
          className="animate-stagger-3 relative min-h-[100svh] flex flex-col justify-end"
          style={{ background: 'linear-gradient(160deg, #001d3d 0%, #003566 45%, #0077b6 100%)' }}
        >
          {/* dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

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
                <div className="w-10 h-0.5 bg-[#91C8E4]" />
                <span className="text-[#91C8E4] text-xs tracking-[0.3em] uppercase font-semibold">Sejak 1914</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8">
                Rumah<br />
                Sakit<br />
                <span style={{ color: '#91C8E4' }}>Catharina</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-xl font-semibold">
                Lebih dari satu abad hadir dengan mengabdi untuk kesehatan masyarakat dengan hati, ilmu, dan teknologi terkini.
              </p>
            </div>
          </div>

        </section>


        {/* SEJARAH */}
        <section className="animate-stagger-3 py-28 sm:py-40 animate-slide-up" >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>01 — Sejarah</p>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                Perjalanan<br />
                <span className="text-gray-300"> 100+ Tahun</span>
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

          {/* STRUKTUR ORGANISASI */}
          <section className="py-28 sm:py-40 bg-white animate-slide-up">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
              <div className="mb-20">
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#005ba3' }}>02 — Struktur</p>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                  Struktur<br />
                  <span className="text-gray-300">Organisasi</span>
                </h2>
              </div>
          
              {/*Level 1: Direktur PT. KSM*/}
              <div className="flex justify-center mb-0">
                <div className="px-6 py-3 rounded-xl text-center text-xs font-bold tracking-widest uppercase border"
                  style={{ background: '#f0f9ff', borderColor: '#bae6fd', color: '#0077b6' }}>
                  KURNIA FITRA UTAMA — Direktur PT. KSM
                </div>
              </div>
          
              {/* connector */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-300"  />
              </div>
          
              {/*Level 2: Kepala RS*/}
              <div className="flex justify-center mb-0">
                <div className="relative rounded-2xl overflow-hidden text-center px-10 py-5 min-w-[220px] shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #003d7a, #005ba3)' }}>
                  <p className="text-white font-black text-base">Dr. dr. Elman Boy, M.Kes</p>
                  <p className="text-white/60 text-xs tracking-widest uppercase mt-1">Kepala RS</p>
                </div>
              </div>
          
              {/* connector*/}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-300" />
              </div>
          
              {/*Level 3: Komite Medik*/}
              <div className="flex justify-center mb-0">
                <div className="px-5 py-3 rounded-xl text-center text-xs border max-w-sm w-full"
                  style={{ background: '#fefce8', borderColor: '#fde68a', color: '#92400e' }}>
                  <p className="font-bold mb-1">Komite Medik & Tim</p>
                  <p className="text-[10px] leading-relaxed opacity-70">Casemix · TB/DOTS · PPI & IPCN · Malaria · SPI · Marketing · Bimbingan Rohani</p>
                </div>
              </div>
          
              {/*Level 4: 2 Kabag — responsif*/}
              <div className="flex flex-col items-center">
                {/* vertical connector ke horizontal */}
                <div className="w-0.5 h-8 bg-gray-300" />
          
                {/* horizontal line */}
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gray-300" />
                </div>
          
                {/* 2 card kabag */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-0">
                  {[
                    { nama: 'Suhendrik', jabatan: 'Kabag Umum, Legal & Keuangan' },
                    { nama: 'Yessy Yulianti', jabatan: 'Kabag Penunjang Medis' },
                  ].map((o, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-gray-300"  />
                      <div className="rounded-2xl border p-4 text-center w-full hover:shadow-md transition-all"
                        style={{ background: '#e0f2fe', borderColor: '#7dd3fc' }}>
                        <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-black text-sm"
                          style={{ background: '#0077b6', color: 'white' }}>
                          <User size={16} />
                        </div>
                        <p className="font-bold text-gray-900 text-sm">{o.nama}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{o.jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
              {/* connector */}
              <div className="flex justify-center mt-2">
                <div className="w-0.5 h-8 bg-gray-300"  />
              </div>
          
              {/*Level 5: Staff*/}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #e2e8f0)' }} />
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 flex-shrink-0">Staff & Koordinator</p>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #e2e8f0)' }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { nama: 'Fendy Aditya T', jabatan: 'Legal' },
                    { nama: 'Zainul Umri', jabatan: 'Umum' },
                    { nama: 'Arif Hakim H', jabatan: 'Keuangan' },
                    { nama: 'Peri Fadli', jabatan: 'Payrol, Pajak & Asuransi' },
                    { nama: 'Ade Chandra', jabatan: 'Administrasi' },
                    { nama: 'Aithar Salman', jabatan: 'IT' },
                    { nama: 'Suriadi', jabatan: 'Gudang' },
                    { nama: 'Dedek Vivi Ampelani', jabatan: 'Keperawatan & Kebidanan' },
                    { nama: 'Endirianayah', jabatan: 'CSSD' },
                    { nama: 'Yuli Yasmin', jabatan: 'Rekam Medis' },
                    { nama: 'Putri Rezeki', jabatan: 'Laboratorium' },
                    { nama: 'Wafa Washilah', jabatan: 'Gizi' },
                    { nama: 'Ainul', jabatan: 'Radiologi' },
                    { nama: 'Aulia Cahaya', jabatan: 'Farmasi' },
                    { nama: 'Lia Nauli', jabatan: 'Laundry' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm hover:-translate-y-0.5 transition-all"
                      style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
                        style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                        <User size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-xs truncate">{s.nama}</p>
                        <p className="text-[10px] text-gray-400 truncate">{s.jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
              {/*Level 6: Instalasi */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #fed7aa)' }} />
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 flex-shrink-0">Kepala Instalasi</p>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #fed7aa)' }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { nama: 'Jhohan Reaniyah', jabatan: 'Ka. Instalasi Gawat Darurat' },
                    { nama: 'Chairun Nisa', jabatan: 'Ka. Instalasi Rawat Jalan' },
                    { nama: 'Budi Arifin', jabatan: 'Ka. Instalasi Rawat Inap' },
                    { nama: 'Zainuri', jabatan: 'Ka. Instalasi OK' },
                    { nama: 'Madana H', jabatan: 'Ka. Instalasi ICU' },
                    { nama: 'dr. Ratu Novita Sari', jabatan: 'Ka. Instalasi MCU' },
                    { nama: 'Mahmud Solin', jabatan: 'Ka. Unit Ambulans' },
                    { nama: 'Larsa Uncleyanti', jabatan: 'Ka. Instalasi Alat Medis' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm hover:-translate-y-0.5 transition-all"
                      style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
                        style={{ background: '#fb923c', color: 'white' }}>
                        <User size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-xs truncate">{s.nama}</p>
                        <p className="text-[10px] text-gray-400 truncate">{s.jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
              {/* Legend */}
              <div className="mt-12 flex flex-wrap gap-4 justify-center pt-8 border-t border-gray-100">
                {[
                  { color: '#e0f2fe', border: '#7dd3fc', label: 'Pimpinan' },
                  { color: '#f8fafc', border: '#e2e8f0', label: 'Tim Pendukung' },
                  { color: '#fff7ed', border: '#fed7aa', label: 'Tim Operasional' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border" style={{ background: l.color, borderColor: l.border }} />
                    <span className="text-xs text-gray-500">{l.label}</span>
                  </div>
                ))}
              </div>
          
            </div>
          </section>
        
        {/* VISI MISI TUJUAN */}
        <section style={{ background: '#D6E6F2' }} className="py-28 sm:py-40 animate-slide-up">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#005ba3' }}>03 — Arah</p>
              <h2 className="text-5xl sm:text-6xl font-black leading-tight" style={{ color: '#002a52' }}>
                Visi, Misi<br />
                <span style={{ color: '#005ba3' }}>& Tujuan</span>
              </h2>
            </div>

            {/* VISI — full width statement */}
            <div className="relative mb-12 p-10 sm:p-14 rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #003d7a, #005ba3)', border: '1px solid #0077c8' }}>
              <div className="absolute top-6 right-8 text-[80px] font-black leading-none select-none"
                style={{ color: 'rgba(255,255,255,0.05)' }}>VISI</div>
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <Target  size={20} style={{ color: '#91C8E4' }} />
                <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#90e0ef' }}>Visi Kami</span>
              </div>
              <p className="text-2xl sm:text-3xl text-white  leading-relaxed relative z-10 max-w-4xl">
                "Menjadi rumah sakit terkemuka yang dikenal dengan tradisi pelayanan kesehatan bermutu demi meningkatkan kualitas hidup masyarakat sekitar, khususnya pemangku kepentingan di industri perkebunan."
              </p>
            </div>

            {/* MISI grid */}
            <div className="flex items-center gap-4 mb-6">
              <Heart size={20} style={{ color: '#005ba3' }} />
              <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#005ba3' }}>Misi Kami</span>
            </div>

            {/* MISI grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {misiList.map((m, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl  bg-white hover:shadow-md transition-all group"
                  style={{ background:'#F7FBFC', border: '1px solid #dbeafe' }}>
                  <span className="text-3xl font-black leading-none flex-shrink-0 mt-2 "
                    style={{ color: '#005ba3' }}>
                    0{i + 1}
                  </span>
                  <p className="leading-relaxed text-sm group-hover:text-gray-900 transition-colors"
                    style={{ color: '#475569' }}>{m}</p>
                </div>
              ))}
            </div>

            {/* TUJUAN label */}
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp size={20} style={{ color: '#005ba3' }} />
              <span className="text-xs tracking-widest uppercase font-bold" style={{ color: '#005ba3' }}>Tujuan Kami</span>
            </div>

            {/* TUJUAN cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tujuanList.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-white group hover:shadow-lg transition-all duration-300 cursor-default"
                    style={{background:'#F7FBFC',  border: '1px solid #dbeafe' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                      style={{ background: '#e0f2fe' }}>
                      <Icon size={18} style={{ color: '#005ba3' }} />
                    </div>
                    <h4 className="font-bold mb-2 text-sm" style={{ color: '#002a52' }}>{t.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{t.desc}</p>
                  </div>
                );
              })}
            </div>
                  

          </div>
        </section>

        {/* BERITA */}
        <section className="py-28 sm:py-40">
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
                style={{ background: '#005ba3', color: 'white' }}>
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
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3  transition-colors">
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