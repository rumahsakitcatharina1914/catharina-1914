'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
            : 'bg-white border-b-2 border-secondary/10 shadow-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-10"
              onClick={() => setIsMenuOpen(false)}
            >
    
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 p-0.5">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                  <Image 
                    src="/catharina-logo.png" 
                    alt="RS Catharina 1914"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 leading-tight">
                  RS Catharina
                </div>
                <div className="text-xs font-bold text-secondary tracking-wider">
                  1914
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      nav-link relative px-5 lg:px-6 py-2.5 text-sm lg:text-base font-semibold 
                      transition-all duration-300 rounded-xl group
                      ${isActive 
                        ? 'text-white shadow-lg'
                        : 'text-primary hover:text-secondary hover:scale-85'
                      }
                    `}
                     style={isActive ? {
                          background: 'linear-gradient(90deg, #005ba3 0%, #003d7a 100%)'
                        } : {}}
                  >
                    {link.label}
                    
                    {!isActive && (

                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
                    )}
                    
                  </Link>
                );
              })}
            </div>


            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/admin"
                className="relative px-6 py-3 rounded-xl text-white font-bold text-sm overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, #005ba3 0%, #003d7a 100%)'
                }}
              >
                <span className="relative z-10">Masuk Admin</span>
                <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-10 p-2.5 hover:bg-primary/10 rounded-xl transition-all duration-300 text-primary group"
              aria-label="Toggle menu"
            >
              <div className="relative w-7 h-7">
                <Menu 
                  size={28} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <X 
                  size={28} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0 shadow-2xl'  
                     : 'translate-x-full shadow-none'
        }`}
      >
        <div className="flex flex-col h-full">
          
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20 p-0.5">
                <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/catharina-logo2.png" 
                    alt="RS Catharina"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-primary">RS Catharina</div>
                <div className="text-xs font-bold text-secondary">1914</div>
              </div>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation*/}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center justify-between px-5 py-4 rounded-xl font-semibold 
                      transition-all duration-300
                      ${isActive
                        ? 'text-white shadow-md'
                        : 'text-foreground hover:bg-primary/5 hover:text-primary'
                      }
                    `}

                      style={isActive ? {
                      background: 'linear-gradient(90deg, #005ba3 0%, #003d7a 100%)',
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                    } : {
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    ) : (
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #005ba3 0%, #003d7a 100%)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Masuk Admin
              <ChevronRight size={18} />
            </Link>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              © 2026 RS Catharina 1914
            </p>
          </div>
        </div>
      </div>

      <div className="h-20" />

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}