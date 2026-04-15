'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/DoctorCard';
import { Stethoscope, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        if (res.ok) {
          const data = await res.json();
          setDoctors(data.slice(0, 6)); // Ambil 6 dokter teratas
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
            Dokter Spesialis Kami
          </h2>
          <p className="text-xl text-neutral-gray leading-relaxed text-gray-400">
            Dipercaya oleh banyak pasien dengan dedikasi tinggi untuk memberikan perawatan kesehatan terbaik
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-gray-300 overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Dokter */}
        {!loading && doctors.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="max-w-[250px] mx-auto w-full">
                <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>

            {/* Tombol Lihat Semua */}
            <div className="text-center">
              <Link
                href="/dokter"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all group border-2"
                style={{
                backgroundImage: isHovered 
                    ? 'linear-gradient(to bottom right, rgba(4, 79, 140, 0.2), rgba(0, 153, 216, 0.2))' 
                    : 'linear-gradient(to right, #005ba3, #003d7a)',
                color: isHovered ? '#005ba3' : 'white',
                }}
                onMouseEnter={() => setIsHovered(true)}  
                onMouseLeave={() => setIsHovered(false)} 
              >
                Lihat Semua Dokter
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && doctors.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto text-foreground/30 mb-4" size={64} />
            <p className="text-foreground/70 font-semibold mb-1">Belum ada dokter terdaftar</p>
            <p className="text-sm text-foreground/50">Data dokter akan segera ditampilkan</p>
          </div>
        )}
      </div>
    </section>
  );
}   