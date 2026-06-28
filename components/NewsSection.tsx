'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ImageWithLoader = dynamic(() => import('@/components/ImageWithLoader'), { ssr: false });

const NEWS = [
  { id: 1, title: 'New Science Laboratory Opened', excerpt: 'State-of-the-art facility brings new opportunities for research.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', date: 'June 01, 2026' },
  { id: 2, title: 'Jumuiya Partners with Global Tech', excerpt: 'New partnership aims to increase student placement worldwide.', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop', date: 'May 28, 2026' },
  { id: 3, title: 'Annual Sports Day Results', excerpt: 'A thrilling day of competition across all campuses.', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop', date: 'May 15, 2026' },
];

export default function NewsSection() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-navy mb-4">Latest News</h2>
          <p className="text-gray-600 max-w-2xl">Stay updated with happenings around Jumuiya.</p>
        </div>
        <Link href="/news" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors">
          All News <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {NEWS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all flex flex-col"
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
              <ImageWithLoader
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm text-gray-500 mb-3">{item.date}</div>
              <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">{item.excerpt}</p>
              <Link href={`/news/${item.id}`} className="text-primary font-medium flex items-center gap-2 group-hover:text-gold transition-colors">
                Read more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}