'use client';

import Link from 'next/link';
import { Calendar, PhoneCall, MapPin, ClipboardList, ArrowRight } from 'lucide-react';

export default function QuickInfo() {
  const infoItems = [
    {
      title: 'Jadwal Dokter',
      desc: 'Lihat jadwal praktek spesialis',
      icon: Calendar,
      link: '/dokter',
    },
    {
      title: 'Kontak Darurat',
      desc: 'Layanan UGD & Ambulans 24 Jam',
      icon: PhoneCall,
      link: '/#hubungi',
    },
    {
      title: 'Layanan Medis',
      desc: 'Cari tahu layanan kesehatan kami',
      icon: ClipboardList,
      link: '/layanan',
    },
    {
      title: 'Lokasi Kami',
      desc: 'Petunjuk arah ke rumah sakit',
      icon: MapPin,
      link: '/#hubungi',
    },
  ];

  const handleSmoothScroll = (e, path) => {
    // Mengecek apakah link yang diklik mengandung tanda pagar '#'
    if (path.includes('#')) {
      const id = path.split('#')[1]; 
      const element = document.getElementById(id); 
      
      // Jika section-nya ketemu (artinya kita sedang di halaman Beranda)
      if (element) {
        e.preventDefault(); 
        element.scrollIntoView({ behavior: 'smooth' }); 
        window.history.pushState(null, '', `/#${id}`); 
      }
    }
  };

  return (
    <div className="relative z-40 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 -mt-12 sm:-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {infoItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.link}
              onClick={(e) => handleSmoothScroll(e, item.link)}
              className="group bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div>
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: '#e0f2fe'}}
                >
                  <Icon size={28} strokeWidth={2.5} style={{ color: '#0077b6'}} />
                </div>

                {/* Text */}
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Link */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-300 group-hover:text-[#0077b6] transition-colors">
                Selengkapnya
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-2"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}