// components/PageTransition.jsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname(); // Memantau halaman mana yang sedang aktif
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Reset state ke posisi hilang/turun setiap kali pindah halaman
    setMounted(false);

    // 2. Beri jeda waktu super singkat (50ms) agar browser menyadari 
    //    perubahan dari opacity-0 ke opacity-100
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    // Bersihkan timer untuk mencegah memory leak
    return () => clearTimeout(timer);
  }, [pathname]); // Gunakan pathname sebagai trigger efek

  return (
    <div
      key={pathname} // Paksa React membuat ulang div ini setiap halamannya beda
      className={`transition-all duration-700 ease-out transform ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}