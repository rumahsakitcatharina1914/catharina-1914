'use client';

import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const hospitalLocation = {
    name: 'Rumah Sakit Catharina 1914',
    latitude: 2.97418803051222,
    longitude: 99.60747961534287,
  };

  const [submitStatus, setSubmitStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('Mengirim pesan...');
    setIsSuccess(false);

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
      setIsSuccess(true);
      setSubmitStatus('Pesan berhasil dikirim. Terima kasih!');
    } catch {
      setIsSuccess(false);
      setSubmitStatus('Terjadi kendala saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hubungi" className="py-24 sm:py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#0077b6' }}>
            Hubungi Kami
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Pusat Bantuan
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Tim kami siap membantu menjawab pertanyaan Anda terkait layanan medis, jadwal dokter, maupun fasilitas rumah sakit.
          </p>
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* CONTACT FORM */}
          <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col h-full relative overflow-hidden">
            
            {/* Dekorasi Latar */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-blue-50 opacity-50 blur-3xl z-0" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                Kirim Pesan Langsung
              </h3>
              <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                Isi form di bawah ini dengan lengkap. Tim kami akan membalas pesan Anda.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Contoh: Putri Saniy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#0077b6] bg-gray-50/50 hover:bg-white transition-all placeholder:text-gray-400 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WA</label>
                    <input
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#0077b6] bg-gray-50/50 hover:bg-white transition-all placeholder:text-gray-400 font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
                  <input
                    type="email"
                    placeholder="Contoh: putri@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#0077b6] bg-gray-50/50 hover:bg-white transition-all placeholder:text-gray-400 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pesan & Pertanyaan</label>
                  <textarea
                    rows="5"
                    placeholder="Tuliskan keluhan, pertanyaan, atau informasi yang Anda butuhkan..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#0077b6] bg-gray-50/50 hover:bg-white transition-all resize-none placeholder:text-gray-400 font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: '#005ba3' }}
                >
                  {isSubmitting ? (
                    'Memproses...'
                  ) : (
                    <>
                      Kirim Pesan 
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Status Pesan */}
                {submitStatus && (
                  <div className={`flex items-center gap-2 p-4 rounded-xl mt-4 font-semibold text-sm ${isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-[#005ba3] border border-blue-100'}`}>
                    {isSuccess && <CheckCircle2 size={18} />}
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* INFO & LOKASI */}
          <div className="lg:col-span-2 space-y-6">

            {/* Kotak Peta Lokasi */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden group hover:border-blue-100 transition-all duration-300">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-3" style={{ background: '#e0f2fe', color: '#0077b6' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1 text-lg">Alamat Lengkap</h4>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    Jalan Besar Sech Silau, Sei Renggas, Kisaran,<br />
                    Kab. Asahan, Sumatera Utara 21211
                  </p>
                </div>
              </div>

              {/* Iframe Peta Google Maps */}
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-52 relative">
                <iframe
                  title={`Peta ${hospitalLocation.name}`}
                  src={`https://maps.google.com/maps?q=${hospitalLocation.latitude},${hospitalLocation.longitude}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Tombol Rute */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hospitalLocation.latitude},${hospitalLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ background: ' #005ba3' }}
              >
                <MapPin size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Buka di Google Maps
              </a>
            </div>

            {/* Kotak Jam Operasional */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-gray-100 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#e0f2fe', color: '#0077b6' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-4 text-lg">Jam Operasional</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">Poliklinik / Rawat Jalan:</span>
                      <span className="text-gray-500 font-medium">Senin - Minggu (07:00 - 18:00 WIB)</span>
                    </div>
                    <div className="w-full h-px bg-gray-100" />
                    <div className="flex flex-col">
                      <span className="font-bold text-red-600">IGD & Rawat Inap:</span>
                      <span className="text-red-500 font-bold bg-red-50 w-fit px-2 py-1 rounded-md mt-1">24 Jam Non-Stop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak Tambahan */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-gray-100 transition-all duration-300">
               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600"><Phone size={18}/></div>
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telepon Utama</p>
                     <p className="font-bold text-gray-900">0812-6326-4846</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600"><Mail size={18}/></div>
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Resmi</p>
                     <p className="font-bold text-gray-900">rumahsakitcatharina@gmail.com</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}