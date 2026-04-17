import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import { Stethoscope, ArrowRight, CheckCircle } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Dokter | RS Catharina 1914',
  description: 'Daftar dokter spesialis profesional di Rumah Sakit Catharina 1914.',
};

export default async function DokterPage() {
  const doctors = await prisma.doctor.findMany();

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* Hero */}
        <section className="animate-stagger-3 py-28 sm:py-20" style={{ background: '#f7f9fc' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>Daftar Lengkap</p>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                  Dokter<br />
                  <span className="text-gray-300">Spesialis</span>
                      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mt-4">
                        Pilih dokter sesuai kebutuhan kesehatan dan jadwalkan konsultasi dengan mudah
                      </p>
                </h2>
              </div>
            </div>

            {doctors.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 p-20 text-center text-gray-400">
                Belum ada dokter tersedia.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/*Panduan*/}
        <section className="py-28 sm:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* left */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>Panduan</p>
                <h2 className="text-5xl font-black text-gray-900 leading-tight mb-12">
                  Cara Memilih<br />
                  <span style={{ color: '#0077b6' }}>Dokter</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { n: '01', title: 'Tentukan Keluhan', desc: 'Identifikasi jenis keluhan atau gejala yang ingin dikonsultasikan', color: '#0077b6' },
                    { n: '02', title: 'Pilih Spesialisasi', desc: 'Pilih dokter spesialis yang sesuai dengan bidang kesehatan Anda', color: '#0096c7' },
                    { n: '03', title: 'Cek Jadwal Praktik', desc: 'Lihat jadwal praktik dokter yang tersedia di kartu dokter', color: '#0077b6' },
                    { n: '04', title: 'Jadwalkan Konsultasi', desc: 'Hubungi kami untuk membuat appointment sesuai jadwal', color: '#0096c7' },
                  ].map((step, i) => (
                    <div key={i} className="group flex gap-5 p-6 rounded-2xl border hover:shadow-md transition-all"
                      style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                        style={{ background: step.color }}>
                        {step.n}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right — keunggulan */}
              <div className="rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #005ba3, #003566)' }}>
                <div className="p-8 sm:p-10">
                  <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3 text-white" >Keunggulan</p>
                  <h3 className="text-4xl font-black text-white leading-tight mb-8">
                    Tim Medis<br />
                    <span style={{ color: '#91C8E4' }}>Terpercaya</span>
                  </h3>

                  <div className="space-y-5 mb-10">
                    {[
                      { title: 'Bersertifikat ', desc: 'Semua dokter memiliki lisensi dan sertifikasi resmi' },
                      { title: 'Berpengalaman', desc: 'Rata-rata pengalaman puluhan tahun di bidangnya' },
                      { title: 'Update Teknologi Medis', desc: 'Terus update dengan metode dan teknologi terkini' },
                      { title: 'Pendekatan Personal', desc: 'Komunikasi terbuka dan empati dengan setiap pasien' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(0,180,216,0.2)' }}>
                          <CheckCircle size={13} style={{ color: '#91C8E4' }} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm mb-0.5">{item.title}</p>
                          <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a href="#hubungi"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: '#0077b6', color: 'white' }}>
                    Hubungi Kami <ArrowRight size={15} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/*FAQ*/}
        <section className="py-28 sm:py-36" style={{ background: '#f7f9fc' }}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-16">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0077b6' }}>FAQ</p>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                Pertanyaan<br />
                <span className="text-gray-300">Umum</span>
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: 'Apakah saya perlu appointment sebelum konsultasi?',
                  answer: 'Kami merekomendasikan appointment untuk menghindari waktu tunggu yang lama. Anda bisa menelepon kami atau menggunakan form online. Walau tanpa appointment, kami tetap melayani dengan urutan antrian.',
                },
                {
                  question: 'Berapa lama waktu konsultasi dengan dokter?',
                  answer: 'Durasi konsultasi berkisar 15-30 menit tergantung kondisi dan kompleksitas kasus. Sudah termasuk pemeriksaan awal dan diskusi diagnosis.',
                },
                {
                  question: 'Apakah dokter menerima pasien baru?',
                  answer: 'Ya, semua dokter kami menerima pasien baru. Hubungi kami untuk informasi jadwal dan membuat appointment.',
                },
                {
                  question: 'Bagaimana jika tidak bisa datang pada jadwal yang ditentukan?',
                  answer: 'Hubungi kami minimal 24 jam sebelum jadwal untuk reschedule. Tim kami siap membantu mencari waktu yang sesuai.',
                },
              ].map((faq, index) => (
                <details key={index}
                  className="group bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all"
                  style={{ borderColor: '#e2e8f0' }}>
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer font-black text-gray-900 hover:text-[#0077b6] transition-colors list-none">
                    <span>{faq.question}</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform"
                      style={{ background: '#e0f2fe' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#0077b6" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="h-px mb-4" style={{ background: '#f1f5f9' }} />
                    <p className="text-gray-500 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}