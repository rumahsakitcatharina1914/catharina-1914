'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang-kami', label: 'Tentang Kami' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/dokter', label: 'Dokter' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white to-white border-b-2 border-secondary/10 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300" style={{backgroundImage: 'linear-gradient(to bottom right, #005ba3, #003d7a)'}}>
            C
          </div>
        <div className="hidden sm:block">
          <div className="font-serif font-bold text-primary text-xl leading-tight group-hover:text-secondary transition-colors">
            Catharina
          </div>
            <div className="text-xs font-bold text-secondary">1914</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors font-semibold text-base relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex gap-3">
          <Link
            href="/admin"
            className="px-8 py-3 rounded-xl text-white hover:shadow-xl transition-all font-bold text-sm hover:scale-105 transform duration-300"
            style={{backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)'}}
          >
            Masuk Sebagai Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-neutral-light rounded-lg transition-colors text-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-white to-neutral-lighter border-t-2 border-secondary/20 shadow-xl animate-fade-in-up">
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-foreground hover:bg-secondary/10 hover:text-primary rounded-lg transition-all font-semibold border-l-4 border-l-transparent hover:border-l-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="block px-6 py-3 text-white rounded-xl hover:shadow-xl transition-all text-center font-bold mt-6 transform hover:scale-105"
              style={{backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)'}}
              onClick={() => setIsMenuOpen(false)}
            >
              Masuk Sebagai Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
