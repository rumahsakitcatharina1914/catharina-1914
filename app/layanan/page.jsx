import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic'; 
export const revalidate = 0; 
import {
  Ambulance, Bone, Bed, Stethoscope, Microscope, Users, Zap,
  CheckCircle, Shield, ImageIcon, Clock, Users2, ArrowRight, Phone, ChevronRight,
  BedDouble, 
} from 'lucide-react';

export const metadata = {
  title: 'Layanan | RS Catharina 1914',
  description: 'Jelajahi berbagai layanan kesehatan unggulan kami.',
};


// Map icon by judul layanan
const iconMap = {
  'Rawat Jalan': Stethoscope,
  'Rawat Inap' : Bed,
  'IGD': Ambulance,
  'Poliklinik': Users,
  'Laboratorium': Microscope,
  'Radiologi' : Microscope,
  'Tindakan & Operasi': Zap,
  'ICU' : Shield,
};

async function getLayanan() {
  try {
    return await prisma.layanan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

async function getFasilitas() {
  try {
    return await prisma.fasilitas.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function Layanan() {
  const [services, fasilitasList] = await Promise.all([getLayanan(), getFasilitas()]);

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* HERO */}
        <section className="animate-stagger-3 py-28 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#0077b6' }}> Layanan & Fasilitas Kami</p>
                <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
                  Siap Melayani<br /><span style={{ color: '#0077b6' }}>Kesehatan Anda</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                  Tim medis profesional kami siap memberikan layanan terbaik dengan pendekatan personal dan penuh perhatian.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/6281263264846?text=Halo%20RS%20Catharina%201914%2C%20saya%20ingin%20bertanya%20seputar%20informasi%20layanan%20kesehatan."
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-white  text-sm hover:opacity-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #003566, #0077b6)' }}>
                    <Phone size={16} /> Hubungi Sekarang
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: '01', title: 'Rawat Jalan', icon: Stethoscope },
                  { num: '02', title: 'Rawat Inap', icon: Bed },
                  { num: '03', title: 'IGD', icon: Ambulance },
                  { num: '04', title: 'Poliklinik', icon: Users },
                  { num: '05', title: 'Laboratorium', icon: Microscope },
                  { num: '06', title: 'Radiologi', icon: Bone  },
                  { num: '07', title: 'Tindakan & Operasi', icon: Zap },
                  { num: '08', title: 'ICU', icon: Shield },
                ].map((s) => {              
                  const Icon = s.icon;   
                  return (                  
                    <a key={s.num} href={`#layanan-${s.num}`}
                      className="group flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-all"
                      style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: '#e0f2fe' }}>
                        <Icon size={18} style={{ color: '#0077b6' }} />
                      </div>
                      <p className="font-black text-gray-900 text-sm truncate">{s.title}</p>
                    </a>
                  );                        
                })}                         
              </div>
            </div>
          </div>
        </section>

        
        {/* LAYANAN  */}
        <section 
          className=" animate-stagger-2 py-15 sm:py-25"
          style={{ background: '#f7f9fc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>Layanan</p>
                  <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                    Layanan<br /><span className="text-gray-300">Kami</span>
                      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mt-4">
                          Layanan medis lengkap dengan sesuai standar untuk kebutuhan kesehatan Anda
                      </p>
                  </h2>
                </div>
              </div>
              
            

            {services.length === 0 ? (
              <div className="text-center py-20 text-gray-400">Belum ada layanan tersedia.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                  const Icon = iconMap[service.title] || Stethoscope;
                  const features = Array.isArray(service.features) ? service.features : [];
                  return (
                    <div key={service.id} id={`layanan-${service.id}`}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {service.image ? (
                          <Image src={service.image} alt={service.title} fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: service.bg }}>
                            <Icon size={60} style={{ color: '#0077b6', opacity: 0.3 }} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                            style={{ background: '#005ba3' }}>{service.short}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl flex font-semibold items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ background: '#e0f2fe', color: '#0077b6' }}>
                            {service.num}
                          </div>
                          <h3 className="text-xl mt-2 font-bold text-gray-900 group-hover:text-primary transition-colors">{service.title}</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{service.description}</p>

                        <div className="space-y-2 mb-4">
                          {features.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: service.bg }}>
                                <CheckCircle size={12} style={{color: '#0077b6' }} />
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
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* FASILITAS GALLERY */}
        {fasilitasList.length > 0 && (
          <section className="animate-stagger-2  py-15 sm:py-25" style={{ background: '#f7f9fc' }}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>Fasilitas Lainnya</p>
                  <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                    Fasilitas<br /><span className="text-gray-300">Kami</span>
                      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mt-2">
                        Fasilitas yang tersedia di Rumah Sakit Umum Catharina 1914
                      </p>
                  </h2>
                </div>
                
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense">
                
                {fasilitasList.map((item) => {
                  let sizeClasses = "col-span-1 row-span-1 aspect-square"; 
                  if (item.isLarge) {
                    sizeClasses = "col-span-1 row-span-1 aspect-square"; 
                  } else if (item.isWide) {
                    sizeClasses = "col-span-2 row-span-1 aspect-[2/1]"; 
                  }

                  return (
                    <Link key={item.id} href={`/layanan/fasilitas/${item.id}`}
                    
                      className={`relative overflow-hidden rounded-2xl group cursor-pointer block w-full h-full ${sizeClasses}`}
                    >
          
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.label} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center absolute inset-0">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      )}
                      
                      {/* Overlay & Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <p className="text-white text-sm font-bold">{item.label}</p>
                        {item.description && (
                          <p className="text-white/70 text-xs line-clamp-2 mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}

              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
