import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  Ambulance, Bed, Stethoscope, Microscope, Users, Zap,
  CheckCircle, Shield, Clock, Users2, ArrowRight, Phone, ChevronRight
} from 'lucide-react';

export const metadata = {
  title: 'Layanan | RS Catharina 1914',
  description: 'Jelajahi berbagai layanan kesehatan unggulan kami.',
};

export default function Layanan() {
  const services = [
    {
      id: 1, icon: Stethoscope,
      title: 'Rawat Jalan', short: 'Konsultasi & Pemeriksaan',
      description: 'Layanan konsultasi dan pemeriksaan dengan dokter spesialis berpengalaman untuk berbagai keluhan kesehatan Anda dan keluarga.',
      features: ['Konsultasi dokter umum & spesialis', 'Pemeriksaan kesehatan menyeluruh', 'Resep dan obat-obatan', 'Vaksinasi dan imunisasi', 'Tindakan medis sederhana'],
      image: '/layanan/rawat-jalan.jpeg',
      color: '#0077b6', bg: '#e0f2fe', num: '01',
    },
    {
      id: 2, icon: Bed,
      title: 'Rawat Inap', short: 'Perawatan Intensif',
      description: 'Fasilitas perawatan intensif dengan ruang yang nyaman dan tim medis 24 jam untuk pemulihan yang optimal.',
      features: ['Kamar VIP dan Kelas I, II, dan III', 'Perawatan intensif 24 jam', 'Nutrisi dan makanan khusus', 'Keluarga boleh menginap', 'Sarana rekreasi dan hiburan'],
      image: '/layanan/rawat-inap.jpg',
      color: '#0077b6', bg: '#e0f2fe', num: '02',
    },
    {
      id: 3, icon: Ambulance,
      title: 'IGD', short: 'Instalasi Gawat Darurat',
      description: 'Layanan darurat 24 jam dengan respons cepat dan tim ahli untuk kondisi medis yang mendesak dan mengancam jiwa.',
      features: ['Respons 24 jam tanpa henti', 'Dokter spesialis darurat', 'Ambulans siaga siap jemput', 'Tindakan stabilisasi cepat', 'Laboratorium & radiologi 24 jam'],
      image: '/layanan/igd.jpeg',
      color: '#0077b6', bg: '#e0f2fe', num: '03',
    },
    {
      id: 4, icon: Users,
      title: 'Poliklinik Spesialis', short: '10+ Bidang Spesialisasi',
      description: 'Layanan kesehatan spesifik dari dokter ahli berbagai bidang sesuai kebutuhan medis Anda dengan teknologi terkini.',
      features: ['Poliklinik Mata', 'Poliklinik Jantung & Vaskular', 'Poliklinik Anak & Pediatri', 'Poliklinik Kandungan & Kebidanan', 'Poliklinik Saraf & Neurologi', '10+ spesialisasi lainnya'],
      image: '/layanan/poli.jpeg',
      color: '#0077b6', bg: '#e0f2fe', num: '04',
    },
    {
      id: 5, icon: Microscope,
      title: 'Laboratorium & Radiologi', short: 'Diagnosa Akurat & Modern',
      description: 'Diagnosa akurat dengan peralatan laboratorium modern dan teknologi radiologi terkini untuk hasil yang presisi.',
      features: ['Tes darah lengkap', 'Rontgen (X-Ray)', 'CT Scan & MRI', 'USG (Ultrasonografi)', 'EKG', 'Hasil cepat & akurat'],
      image: '/layanan/lab.jpeg',
      color: '#0077b6', bg: '#e0f2fe', num: '05',
    },
    {
      id: 6, icon: Zap,
      title: 'Tindakan & Operasi', short: 'Prosedur Medis Lengkap',
      description: 'Prosedur medis dan operasi dengan tim ahli, fasilitas steril berstandar internasional, dan teknologi modern.',
      features: ['Operasi mayor & minor', 'Endoskopi diagnostik & terapeutik', 'Anestesi umum & lokal', 'Ruang operasi berstandar internasional', 'Kamar pemulihan monitoring', 'Tim anestesi profesional'],
      schedule: 'Jadwal sesuai kebutuhan pasien',
      image: '/layanan/operasi.jpeg',
      color: '#0077b6', bg: '#e0f2fe', num: '06',
    },
  ];

  const advantages = [
    { icon: Shield, title: 'Standar Internasional', description: 'Fasilitas dan prosedur sesuai standar kesehatan internasional' },
    { icon: Clock, title: 'Respons Cepat', description: 'Tim medis siap dengan respons cepat untuk setiap kebutuhan' },
    { icon: Users2, title: 'Dokter Berpengalaman', description: 'Dokter spesialis berpengalaman puluhan tahun di bidangnya' },
    { icon: CheckCircle, title: 'Perawatan Holistik', description: 'Pendekatan menyeluruh untuk kesembuhan yang optimal' },
  ];

  const fasilitas = [
    { src: '/layanan/operasi.jpeg', label: 'Ruang Operasi', large: true },
  { src: '  /layanan/icu.jpeg', label: 'ICU' },
    { src: '/layanan/lab.jpeg', label: 'Laboratorium' },
    { src: '/layanan/lab.jpeg', label: 'Radiologi' },
    { src: '/layanan/kamar-vip.jpeg', label: 'Kamar VIP' },
    { src: '/layanan/poli.jpeg', label: 'Poliklinik' },
    { src: '/layanan/farmasi.jpg', label: 'Farmasi', wide: true },
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/*HERO*/}
        <section className="py-28 sm:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#0077b6' }}>Fasilitas & Layanan Kami</p>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
                  Siap Melayani<br /><span style={{ color: '#0077b6' }}>Kesehatan Anda</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                  Tim medis profesional kami siap memberikan layanan terbaik dengan pendekatan personal dan penuh perhatian.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-white text-sm hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #003566, #0077b6)' }}>
                    Buat Janji Temu <ArrowRight size={16} />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all"
                    style={{ border: '2px solid #e2e8f0', color: '#374151' }}>
                    <Phone size={16} /> Hubungi Sekarang
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.id} href={`#layanan-${s.id}`}
                      className="group flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-all"
                      style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                        <Icon size={18} style={{ color: s.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-gray-900 text-sm truncate">{s.title}</p>
                        {/* <p className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-gray-600 transition-colors">
                          Lihat detail <ChevronRight size={10} />
                        </p> */}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        
        
        {/* LAYANAN */}
        
        
        <section className="py-20 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-bold mb-4">
                Layanan Kami
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Layanan Kesehatan Terpadu
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fasilitas medis lengkap dengan dokter spesialis berpengalaman untuk kebutuhan kesehatan Anda
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    id={`layanan-${service.id}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Badge Number */}
                      <div className="absolute top-4 right-4">
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                          style={{ background: service.color }}
                        >
                          {service.num}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                          style={{ background: `${service.color}dd` }}
                        >
                          {service.short}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Icon & Title */}
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                          style={{ background: service.bg }}
                        >
                          <Icon size={24} style={{ color: service.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: service.bg }}
                            >
                              <CheckCircle size={12} style={{ color: service.color }} />
                            </div>
                            <span className="text-xs text-gray-600 line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-1"
                        style={{ background: service.color }}
                      >
                        Info Lengkap
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

    

        {/* FASILITAS GALLERY */}
        <section className="py-28 sm:py-36" style={{ background: '#f7f9fc' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>Fasilitas Lainnya</p>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                  Fasilitas<br /><span className="text-gray-300">Kami</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Fasilitas yang Tersedia di Rumah Sakit Umum Catharina 1914
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px]">
              {fasilitas.map((item, i) => (
                <div key={i}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.large ? 'col-span-2 row-span-2' : ''} ${item.wide ? 'col-span-2' : ''}`}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white text-xs font-bold px-2 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}