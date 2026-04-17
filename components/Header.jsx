'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang-kami', label: 'Tentang Kami' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/dokter', label: 'Dokter' },
  ];

  return (
    <>
      <header 
        
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
            : 'bg-white '
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20 sm:h-24'
          }`}>

            {/*LOGO BRANDING*/}
            <Link 
              href="/" 
              className="flex items-center gap-3 lg:gap-4 group z-10"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <Image 
                  src="/catharina-logo.png" 
                  alt="RS Catharina 1914"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-none mb-1 group-hover:text-[#005ba3] transition-colors">
                  RS Catharina
                </h1>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#0077b6] tracking-[0.25em] uppercase">
                  1914
                </p>
              </div>
            </Link>

            {/*DESKTOP NAVIGATION*/}
            <div className="hidden md:flex items-center p-1.5 bg-gray-200 rounded-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-[#005ba3] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── TOMBOL CTA ADMIN ── */}
            <div className="hidden md:flex items-center">
              <Link
                href="/admin"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #005ba3, #0077b6)' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <User size={16} className="relative z-10" />
                <span className="relative z-10">Area Admin</span>
              </Link>
            </div>

            {/*MOBILE MENU BUTTON*/}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={20} className={`absolute transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X size={20} className={`absolute transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/*MOBILE MENU OVERLAY*/}
      <div 
        className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE MENU DRAWER */}
      <div 
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] max-w-sm bg-gray-50 rounded-3xl z-50 md:hidden transition-all duration-500 ease-out flex flex-col overflow-hidden shadow-2xl border border-gray-200 ${
          isMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-12 opacity-0 invisible'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-20 pb-6 flex flex-col gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 pl-2">
            Menu Navigasi
          </p>

          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-[#005ba3] shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={{
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMenuOpen ? 1 : 0,
                  transitionDelay: `${index * 50}ms`
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Footer Area */}
        <div className="p-6 bg-white mt-auto border-t border-gray-200">
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90 shadow-lg shadow-blue-900/20"
            style={{ background: 'linear-gradient(135deg, #005ba3, #0077b6)' }}
            onClick={() => setIsMenuOpen(false)}
          >
            Masuk Area Admin
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      

      {/* UKURAN NAVBAR */}
      <div className="h-20 sm:h-22" />
    </>
  );
}