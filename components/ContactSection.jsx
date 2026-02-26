'use client';

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {

  const hospitalLocation = {
    name: 'Rumah Sakit Catharina 1914',
    latitude: 2.97418803051222,
    longitude: 99.60747961534287,
  };

  const [submitStatus, setSubmitStatus] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitStatus('Mengirim pesan...');

      try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim pesan');
      }

      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitStatus('Pesan berhasil dikirim. Terima kasih!');
      } catch {
      setSubmitStatus('Terjadi kendala saat mengirim pesan. Silakan coba lagi.');
      }
  };

  const contacts = [
    {
      icon: Phone,
      title: 'Telepon',
      details: ['0274-555-1914', '(021) 555-1914'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@catharina1914.com', 'appointments@catharina1914.com'],
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: MapPin,
      title: 'Lokasi',
      details: ['Jl. Kesehatan No. 1914', 'Yogyakarta 55000'],
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Minggu', 'IGD: 24 Jam'],
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section id="hubungi" className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold">
            Kontak Kami
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Hubungi Kami
          </h2>
          <p className="text-xl text-neutral-gray leading-relaxed">
            Hubungi Rumah Sakit Catharina 1914 untuk konsultasi, appointment, atau pertanyaan kesehatan Anda kapan saja
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/50 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--secondary))`
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl group-hover:shadow-lg transition-all">
                    <Icon
                      className="text-secondary group-hover:text-primary transition-colors"
                      size={28}
                    />
                  </div>

                  <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-primary transition-colors">
                    {contact.title}
                  </h3>

                  <div className="space-y-2">
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-foreground/70 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-border hover:shadow-xl transition-all">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
              Kirim Pesan
            </h3>

            <p className="text-foreground/70 mb-8 font-light">
              Isi form di bawah dan kami akan menghubungi Anda dalam waktu singkat
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-light transition-all placeholder:text-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-light transition-all placeholder:text-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-light transition-all placeholder:text-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Pesan
                </label>
                <textarea
                  rows="5"
                  placeholder="Tuliskan pesan atau pertanyaan Anda"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-light transition-all resize-none placeholder:text-foreground/40"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                style={{
                  backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)'
                }}
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Kirim Pesan
              </button>
              {submitStatus && (
                <p className="text-sm text-foreground/70 font-medium">{submitStatus}</p>
              )}
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-6">

            <h3 className="text-3xl font-serif font-bold text-foreground mb-8">
              Kunjungi Kami
            </h3>

            {/* Lokasi */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all">

              <div className="flex gap-4 items-start mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-secondary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">
                    Lokasi Utama
                  </h4>
                  <p className="text-foreground/70 leading-relaxed font-light">
                    Jalan Jl. Besar Sech Silau, Sei Renggas, Kisaran, <br />
                    Kabupaten Asahan, Sumatera Utara 21211, Indonesia
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  title={'Peta${hospitalLocation.name}'}
                  src={`https://www.google.com/maps?q=${hospitalLocation.latitude},${hospitalLocation.longitude}&output=embed`}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hospitalLocation.latitude},${hospitalLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-4 text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                <button
                  type="submit"
                  className="w-full text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)'
                  }}
                >
                  <MapPin size={20} className="group-hover:translate-x-1 transition-transform" />
                  Buka Rute Google
                </button>
              </a>

            </div>

            {/* Jam Operasional */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-secondary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">
                    Jam Operasional
                  </h4>
                  <p className="text-foreground/70 font-light mb-2">
                    <span className="font-semibold">Rawat Jalan:</span>
                    {' '}Senin - Minggu 07:00 - 18:00 WIB
                  </p>
                  <p className="text-foreground/70 font-light text-red-600 font-semibold">
                    IGD & Rawat Inap: 24 Jam Non-Stop
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
