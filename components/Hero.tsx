'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop',
    title: 'Jumuiya Development Foundation',
    subtitle: 'Led by communities, co-creating solutions for lasting change.',
    cta1: { label: 'Our Impact', href: '/academics' },
    cta2: { label: 'About Us', href: '/about' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop',
    title: 'Building Community Resilience',
    subtitle: 'Ethical leadership, accountable citizenship, and sustainable livelihoods.',
    cta1: { label: 'What We Do', href: '/student-life' },
    cta2: { label: 'Partner With Us', href: '/contact' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1920&auto=format&fit=crop',
    title: 'Empowering the Next Generation',
    subtitle: 'Equipping young people and families with skills to shape their own futures.',
    cta1: { label: 'Education & Skills', href: '/academics' },
    cta2: { label: 'Support Us', href: '/admissions/apply' }
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full mt-20 md:mt-0 overflow-hidden bg-navy group">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
          
          <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {SLIDES[currentSlide].title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-200 mb-10"
              >
                {SLIDES[currentSlide].subtitle}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href={SLIDES[currentSlide].cta1.href} className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors">
                  {SLIDES[currentSlide].cta1.label}
                </Link>
                <Link href={SLIDES[currentSlide].cta2.href} className="px-8 py-3 bg-white hover:bg-gray-100 text-navy rounded-full font-medium transition-colors">
                  {SLIDES[currentSlide].cta2.label}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary backdrop-blur-md p-3 rounded-full text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary backdrop-blur-md p-3 rounded-full text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/70 text-xs uppercase tracking-widest rotate-90 mb-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
      </div>
    </div>
  );
}
