'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';

interface NewsArticle {
  id: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  category?: string;
  featured_image?: string;
  published_at?: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const all: NewsArticle[] = data.data ?? data;
        // Show the 3 most recent articles
        setArticles(all.slice(0, 3));
      } catch {
        // Silently fail — section simply won't render
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Don't render the section while loading or if there's nothing to show
  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-4">Latest News</h2>
            <p className="text-gray-600 max-w-2xl">Stay updated with happenings around Jumuiya.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="aspect-[4/3] w-full bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

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
        {articles.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all flex flex-col"
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
              {item.featured_image ? (
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-navy/20 flex items-center justify-center">
                  <Newspaper className="w-10 h-10 text-white/40" />
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              {item.published_at && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(item.published_at)}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">{item.title}</h3>
              {item.excerpt && (
                <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">{item.excerpt}</p>
              )}
              <Link
                href={`/news/${item.slug ?? item.id}`}
                className="text-primary font-medium flex items-center gap-2 group-hover:text-gold transition-colors mt-auto"
              >
                Read more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Link href="/news" className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-navy rounded-lg font-medium">
        All News <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
