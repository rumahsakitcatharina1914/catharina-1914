import Link from 'next/link';
import { Phone, MapPin, Mail, Clock, Stethoscope, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{backgroundImage: 'linear-gradient(to bottom, #003d7a, #005ba3, #003d7a)'}}>
      {/* Top Section - Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-lg bg-white" >
                  <Image
                      src="/catharina-logo.png"
                      alt="Logo RSU Catharina"
                      width={30}
                      height={30}
                      className="object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl leading-tight">RSU Catharina</div>
                  <div className="text-sm font-bold text-secondary">1914</div>
                </div>
              </div>
            <p className="text-base text-white/90 leading-relaxed mb-6 font-light max-w-sm">
              Rumah Sakit Catharina 1914 adalah fasilitas layanan kesehatan terpercaya yang berkomitmen memberikan pelayanan kesehatan berkualitas tinggi untuk semua lapisan masyarakat.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/61581625051155"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/20 hover:bg-secondary rounded-lg flex items-center justify-center text-secondary hover:text-white transition-all group"
              >
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="https://www.tiktok.com/@rsucatharina1914"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/20 hover:bg-secondary rounded-lg flex items-center justify-center text-secondary hover:text-white transition-all group"
                aria-label="TikTok"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>       

              <a 
                href="https://www.instagram.com/rsucatharina1914kisaran_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/20 hover:bg-secondary rounded-lg flex items-center justify-center text-secondary hover:text-white transition-all group"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-secondary transition-colors font-medium text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-secondary group-hover:w-4 transition-all"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-white/80 hover:text-secondary transition-colors font-medium text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-secondary group-hover:w-4 transition-all"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-white/80 hover:text-secondary transition-colors font-medium text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-secondary group-hover:w-4 transition-all"></span>
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/dokter" className="text-white/80 hover:text-secondary transition-colors font-medium text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-secondary group-hover:w-4 transition-all"></span>
                  Dokter
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider">Layanan</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-white/80 hover:text-secondary transition-colors cursor-pointer font-medium flex items-center gap-2 group">
                <Stethoscope size={16} className="text-secondary" />
                Rawat Jalan
              </li>
              <li className="text-white/80 hover:text-secondary transition-colors cursor-pointer font-medium flex items-center gap-2 group">
                <Stethoscope size={16} className="text-secondary" />
                Rawat Inap
              </li>
              <li className="text-white/80 hover:text-secondary transition-colors cursor-pointer font-medium flex items-center gap-2 group">
                <Stethoscope size={16} className="text-secondary" />
                IGD (24 Jam)
              </li>
              <li className="text-white/80 hover:text-secondary transition-colors cursor-pointer font-medium flex items-center gap-2 group">
                <Stethoscope size={16} className="text-secondary" />
                Poliklinik
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <section>
            <div>
              <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider">Kontak</h3>
              <div className="space-y-5">
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-secondary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase">Telepon</p>
                    <p className="text-white/90 font-medium text-xs">0812-6326-4846</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-secondary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase">Lokasi</p>
                    <p className="text-white/90 font-medium text-xs"> Jalan Besar Sech Silau, Sei Renggas, Kisaran</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 ">
                    <Mail size={16} className="text-secondary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase">Email</p>
                    <p className="text-white/90 font-small text-xs">rumahsakitcatharina@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* IGD Banner */}
        <div className="bg-gradient-to-r from-red-600/20 to-red-600/10 border-2 border-red-500/50 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <div className="flex gap-4 items-center">
            <Clock className="text-red-400 flex-shrink-0" size={28} />
            <div>
              <p className="font-bold text-red-300 mb-1">Layanan Darurat 24 Jam</p>
              <p className="text-white/90 text-sm">IGD kami siap melayani Anda kapan pun dibutuhkan dengan respons cepat dan profesional</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10"></div>
          <div className="flex flex-col md:flex-row justify-end items-center gap-6 mt-6">
            <p className="text-sm text-white/70 flex items-center gap-2 text-center md:text-right">
              Copyright © {currentYear} Rumah Sakit Catharina 1914. 
            </p>
          </div>
        </div>

    </footer>
  );
}
