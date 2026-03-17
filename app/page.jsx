import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import AboutSection from '@/components/AboutSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import PendirianSection from '@/components/PendirianSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Link from 'next/link';
import SlideSection from '@/components/SlideSection';
import prisma from '@/lib/prisma'; 
import DoctorsSection from '../components/DoctorSection';
import HeroSection from '../components/SlideSection';


export const metadata = {
  title: 'Rumah Sakit Catharina 1914 | Beranda',
  description: 'Rumah Sakit Catharina 1914 - Layanan kesehatan berkualitas dengan dokter spesialis berpengalaman dan fasilitas modern.',
};

export default async function HomePage() {

  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Header />
      <main>
        <SlideSection/>
        {/* <AboutSection /> */}
        <DoctorsSection/>
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
