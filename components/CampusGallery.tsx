'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ImageWithLoader = dynamic(() => import('@/components/ImageWithLoader'), { ssr: false });

const IMAGES = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
];

export default function CampusGallery() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-navy mb-4">Life at Campus</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our world-class facilities and vibrant student life.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {IMAGES.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={`relative rounded-xl overflow-hidden ${idx === 0 || idx === 3 ? 'aspect-square' : 'aspect-[4/5]'} bg-gray-100 group`}
          >
            <ImageWithLoader
              src={src}
              alt={`Campus Image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}