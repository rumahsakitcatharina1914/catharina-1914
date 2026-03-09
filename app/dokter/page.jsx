import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import { Stethoscope } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma'



export const metadata = {
  title: 'Dokter | Rumah Sakit Catharina 1914',
  description: 'Daftar dokter spesialis profesional di Rumah Sakit Catharina 1914 dengan pengalaman dan keahlian di berbagai bidang medis.',
};

export default async function DokterPage(){
  const doctors = await prisma.doctor.findMany();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[500px] flex items-center overflow-hidden" style={{backgroundImage: 'linear-gradient(to bottom right, #005ba3, #003d7a, #005ba3)'}}>
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-secondary/20 backdrop-blur-sm text-secondary rounded-full text-sm font-bold border border-secondary/30">
                <Stethoscope size={16} />
                Tim Medis Profesional
              </div>
              <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-6 text-white leading-tight text-balance">
                Dokter Spesialis Terbaik
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl font-light">
                Dokter spesialis berpengalaman dan bersertifikat dengan dedikasi tinggi untuk memberikan perawatan kesehatan terbaik bagi setiap pasien.
              </p>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold">
                Daftar Lengkap
              </div>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                Daftar Dokter Spesialis
              </h2>
              <p className="text-xl text-foreground/70 font-light">
                Pilih dokter spesialis sesuai kebutuhan kesehatan Anda dan jadwalkan konsultasi dengan mudah sesuai jadwal yang tersedia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-neutral-light to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
                  Bagaimana Memilih Dokter?
                </h2>
                <div className="space-y-5">
                  <div className="bg-white p-6 rounded-xl border-l-4 border-l-secondary hover:shadow-lg transition-all">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-secondary font-bold text-lg">1</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2 text-lg">Tentukan Keluhan Kesehatan</h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          Identifikasi jenis keluhan atau gejala yang ingin Anda konsultasikan
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-l-primary hover:shadow-lg transition-all">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">2</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2 text-lg">Pilih Spesialisasi</h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          Pilih dokter spesialis yang sesuai dengan bidang kesehatan Anda
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-l-secondary hover:shadow-lg transition-all">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-secondary font-bold text-lg">3</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2 text-lg">Cek Jadwal Praktik</h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          Lihat jadwal praktik dokter yang tersedia di kartu dokter masing-masing
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-l-primary hover:shadow-lg transition-all">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">4</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2 text-lg">Jadwalkan Konsultasi</h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          Hubungi kami atau klik tombol jadwalkan untuk membuat appointment Anda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-3xl p-8 sm:p-12 border-2 border-primary/20">
                <h3 className="text-4xl font-serif font-bold text-foreground mb-8">
                  Keunggulan Tim Kami
                </h3>
                <ul className="space-y-5 mb-8">
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm mt-1">✓</div>
                    <div>
                      <span className="text-foreground font-bold">Bersertifikat & Tersertifikasi Internasional</span>
                      <p className="text-foreground/70 font-light text-sm mt-1">Semua dokter memiliki lisensi dan sertifikasi resmi</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm mt-1">✓</div>
                    <div>
                      <span className="text-foreground font-bold">Pengalaman Puluhan Tahun</span>
                      <p className="text-foreground/70 font-light text-sm mt-1">Rata-rata pengalaman 18+ tahun di bidangnya</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm mt-1">✓</div>
                    <div>
                      <span className="text-foreground font-bold">Mengikuti Perkembangan Medis</span>
                      <p className="text-foreground/70 font-light text-sm mt-1">Terus update dengan teknologi dan metode terkini</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm mt-1">✓</div>
                    <div>
                      <span className="text-foreground font-bold">Pendekatan Personal & Ramah</span>
                      <p className="text-foreground/70 font-light text-sm mt-1">Komunikasi terbuka dan empati dengan setiap pasien</p>
                    </div>
                  </li>
                </ul>

                <a href="#hubungi" className="w-full px-6 py-4 text-white rounded-xl hover:shadow-lg transition-all font-bold inline-flex items-center justify-center gap-2 group" style={{backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)'}}>
                  Hubungi Kami Sekarang
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold">
                Pertanyaan Umum
              </div>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                FAQ Jadwal Dokter
              </h2>
              <p className="text-lg text-foreground/70 font-light max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum tentang konsultasi dan jadwal dokter kami
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'Apakah saya perlu appointment sebelum konsultasi?',
                  answer: 'Kami merekomendasikan appointment untuk menghindari waktu tunggu yang lama. Anda bisa menelepon kami di 0274-555-1914 atau menggunakan form online untuk mendaftar. Walau tanpa appointment, kami tetap melayani pasien dengan urutan antrian yang ada.',
                },
                {
                  question: 'Berapa lama waktu konsultasi dengan dokter?',
                  answer: 'Durasi konsultasi berkisar 15-30 menit tergantung kondisi dan kompleksitas kasus kesehatan Anda. Waktu ini sudah termasuk pemeriksaan kesehatan awal dan diskusi mengenai diagnosis serta rencana perawatan.',
                },
                {
                  question: 'Apakah dokter menerima pasien baru?',
                  answer: 'Ya, semua dokter kami menerima pasien baru. Silakan hubungi kami untuk mendapatkan informasi jadwal dokter yang Anda inginkan dan membuat appointment sebagai pasien baru.',
                },
                {
                  question: 'Bagaimana jika saya tidak bisa datang pada jadwal yang ditentukan?',
                  answer: 'Hubungi kami minimal 24 jam sebelum jadwal konsultasi untuk mengganti jadwal Anda dengan waktu yang lain. Tim kami siap membantu mencari waktu yang sesuai dengan kebutuhan Anda.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-2xl border border-border p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
                >
                  <summary className="font-bold text-lg text-foreground flex items-center justify-between cursor-pointer group-hover:text-primary transition-colors">
                    <span>{faq.question}</span>
                    <span className="text-secondary group-open:rotate-180 transition-transform flex-shrink-0 ml-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed font-light text-base">
                    {faq.answer}
                  </p>
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
