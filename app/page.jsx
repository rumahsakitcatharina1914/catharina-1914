import Header from '@/components/Header';
import Footer from '@/components/Footer';


import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Link from 'next/link';
import SlideSection from '@/components/SlideSection';
import prisma from '@/lib/prisma'; 
import DoctorsSection from '../components/DoctorSection';
import PageTransition from '../components/PageTransition';


export const metadata = {
  title: 'Beranda | RS Catharina 1914 ',
  description: 'Rumah Sakit Catharina 1914 - Layanan kesehatan berkualitas dengan dokter spesialis berpengalaman dan fasilitas modern.',
};

export default async function HomePage() {

  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Header />
      
      <main className="overflow-hidden">
      <PageTransition>
        <SlideSection/>
        <DoctorsSection/>
        <ServicesSection />
        <ContactSection />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
