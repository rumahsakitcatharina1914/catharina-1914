'use client';

import Link from 'next/link';
import {  Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    id: 1,
    title: 'Layanan Kesehatan Berkualitas Untuk Keluarga Anda',
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
  }
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
            {/* Background Image */}
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
                backgroundImage: `linear-gradient(135deg, rgba(5, 102, 181, 0.91), rgba(41, 176, 229, 0.7))`
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-bold border border-white/30 animate-fade-in-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.1s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    <Heart size={16} className="animate-pulse" />
                    {s.badge}
                  </div>

                  {/* Title */}
                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight text-balance animate-slide-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.2s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    {s.title}
                  </h1>

                  {/* Description */}
                  <p
                    className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl font-light animate-slide-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.3s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    {s.description}
                  </p>

                  {/* CTA Buttons */}
                  {/* <div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up"
                    style={{
                      animationDelay: idx === currentSlide ? '0.4s' : '0s',
                      animationFillMode: 'both'
                    }}
                  >
                    <Link
                      href={s.ctaHref}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-secondary hover:bg-secondary text-primary-dark font-bold text-sm sm:text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                    >
                      {s.ctaText}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="#hubungi"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-lg rounded-xl backdrop-blur-md border-2 border-white/30 transition-all duration-300 hover:border-white/50 w-full sm:w-auto"
                    >
                      <PhoneCall size={20} />
                      Hubungi Kami
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-30 flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="p-2.5 sm:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full border border-white/30 hover:border-white/60 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white group-hover:scale-125 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="p-2.5 sm:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full border border-white/30 hover:border-white/60 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3 items-center">
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
      </div>
    </section>
  );
}
