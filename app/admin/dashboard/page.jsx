'use client';

import { useEffect, useState } from 'react';
import { Instagram, Mail, Stethoscope, Newspaper, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    feeds: 0,
    messages: 0,
    doctors: 0,
    News: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [feedRes, msgRes, docRes, newRes] = await Promise.all([
        fetch('/api/instagram-feeds'),
        fetch('/api/messages'),
        fetch('/api/doctors'),
        fetch('/api/news'),
      ]);

      const feeds = feedRes.ok ? await feedRes.json() : [];
      const messages = msgRes.ok ? await msgRes.json() : [];
      const doctors = docRes.ok ? await docRes.json() : [];
      const news = docRes.ok ? await newRes.json() : [];

      setStats({
        feeds: feeds.length,
        messages: messages.length,
        doctors: doctors.length,
        news: news.length,
      });
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: 'Instagram Feeds',
      value: stats.feeds,
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      href: '/admin/feeds',
    },
    {
      title: 'Pesan Masuk',
      value: stats.messages,
      icon: Mail,
      color: 'from-blue-500 to-cyan-600',
      href: '/admin/messages',
    },
    {
      title: 'Total Dokter',
      value: stats.doctors,
      icon: Stethoscope,
      color: 'from-green-500 to-emerald-600',
      href: '/admin/doctors',
    },

    {
      title: 'Berita',
      value: stats.news,
      icon: Newspaper,
      color: 'from-blue-500 to-purple-600',
      href: '/admin/news',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-foreground/70">Selamat datang di Admin Panel RS Catharina 1914</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-2xl border-2 border-border p-6 hover:shadow-lg transition-all group"
            > 
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-foreground/70 text-sm font-semibold">{card.title}</h3>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}
                >
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-4xl font-bold text-foreground">{card.value}</p>
              <p className="text-sm text-primary mt-2 group-hover:underline">Lihat detail →</p>
            </Link>
          );
        })}
      </div>

    </div>
  );
}