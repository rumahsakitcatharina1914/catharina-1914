'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Instagram, Newspaper, Mail, Stethoscope, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const isLoginPage = pathname === '/admin';

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Menu items - update href ke /admin/dashboard
  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/feeds', icon: Instagram, label: 'IG Feeds' },
    { href: '/admin/news', icon: Newspaper, label: 'Berita' },
    { href: '/admin/messages', icon: Mail, label: 'Pesan Masuk' },
    { href: '/admin/doctors', icon: Stethoscope, label: 'Kelola Dokter' },
  ];

  const logoutAdmin = async () => {
    if (!confirm('Yakin ingin logout?')) return;
    
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin'; // Redirect ke /admin (login page)
  };

  return (
    <div className="min-h-screen bg-neutral-light flex">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:flex-col md:w-52 bg-white border-r border-border">
        <div className="px-6 py-6 border-b border-border">
          <h1 className="text-xl font-serif font-bold text-primary">Admin Panel</h1>
          <p className="text-xs text-foreground/70 mt-0.5">RSU Catharina 1914</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-secondary-light text-primary shadow-sm'
                    : 'text-foreground hover:bg-neutral-light'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* SIDEBAR MOBILE */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)}
          ></div>
          
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-border z-50 flex flex-col">
            <div className="px-6 py-6 border-b border-border flex items-start justify-between">
              <div>
                <h1 className="text-xl font-serif font-bold text-primary">Admin Panel</h1>
                <p className="text-xs text-foreground/70 mt-0.5">RSU Catharina 1914</p>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-1.5 hover:bg-neutral-light rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-secondary-light text-primary shadow-sm'
                        : 'text-foreground hover:bg-neutral-light'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
              
              <button
                onClick={logoutAdmin}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>      
          </aside>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="md:hidden bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-serif font-bold text-primary">Admin Panel</h1>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}