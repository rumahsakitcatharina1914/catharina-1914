'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/DoctorCard';
import { Stethoscope, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
          setDoctors(data.slice(0, 4)); 
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
    <section className="py-20 sm:py-32 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}  
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-[#0077b6] mb-3">
            Dokter Spesialis Kami
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
            Daftar Dokter Kami
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Dipercaya oleh banyak pasien dengan dedikasi tinggi untuk memberikan perawatan kesehatan terbaik.
          </p>
        </motion.div>

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
              {doctors.map((doctor, index) => (
                <motion.div 
                  key={doctor.id} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className="max-w-[250px] mx-auto w-full"

                >
                <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </div>

            {/* Tombol Lihat Semua */}
            <div className="text-center">
              <Link
                href="/dokter"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#0077b6] text-[#0077b6] font-bold rounded-full hover:bg-[#005ba3] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
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