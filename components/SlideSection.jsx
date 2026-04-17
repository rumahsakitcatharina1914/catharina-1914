'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    id: 1,
    title: 'Selamat Datang di Website Resmi RSU Catharina 1914',
    description: 'Rumah Sakit Catharina 1914 hadir dengan dokter spesialis berpengalaman, fasilitas medis terkini, dan komitmen penuh memberikan perawatan dan pelayanan terbaik.',
    badge: 'Terpercaya sejak 1914',
    image: '/uploads/slide/no1.jpg'
  },
  {
    id: 2,
    title: 'Tim Dokter Spesialis Berpengalaman',
    description: 'Tersedia dokter spesialis berpengalaman yang siap memberikan diagnosis akurat dan perawatan profesional untuk kesehatan optimal Anda.',
    badge: 'Dokter Spesialis yang Berpengalaman',
    image: '/uploads/slide/no2.jpg'
  },
  {
    id: 3,
    title: 'Fasilitas Kesehatan Modern & Lengkap',
    description: 'Dilengkapi dengan teknologi medis terkini, laboratorium canggih, dan ruang rawat yang nyaman untuk pemulihan optimal Anda.',
    badge: 'Fasilitas Terdepan',
    image: '/uploads/slide/no3.jpg'
  },
  {
    id: 4,
    title: 'Layanan Darurat 24/7',
    description: 'Tim medis kami siap 24 jam setiap hari untuk menangani keadaan darurat dengan cepat dan profesional.',
    badge: 'Layanan 24 Jam',
    image: '/uploads/slide/no4.jpg'
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Carousel Container */}
      <div className="relative w-full h-screen">
        {/* Slides */}
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/*Gambar Background */}
            <div className="absolute inset-0">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                priority={idx === currentSlide}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(105deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)`
              }}
            >
              
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">

                  {/* Title */}
                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight  text-white mb-4 sm:mb-6 leading-tight text-balance animate-slide-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.2s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    {s.title}
                  </h1>

                  {/* Description */}
                  <p
                    className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl  animate-slide-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.3s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    {s.description}
                  </p>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Indicators */}
      {/* <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3 items-center">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full border border-white/50 ${
              index === currentSlide
                ? 'w-8 sm:w-10 h-3 sm:h-3 bg-secondary'
                : 'w-3 sm:w-3 h-3 sm:h-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
}

