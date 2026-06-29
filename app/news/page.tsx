'use client';

import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag, AlertCircle, Newspaper } from 'lucide-react';

export interface NewsArticle {
  id: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featured_image?: string;
  published_at?: string;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  Community: 'bg-primary/10 text-primary',
  Education: 'bg-navy/10 text-navy',
  'Gender Empowerment': 'bg-rose-50 text-rose-600',
  'Health & Wellbeing': 'bg-emerald-50 text-emerald-700',
  Environment: 'bg-green-50 text-green-700',
  'Annual Report': 'bg-gold/10 text-amber-700',
};

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setArticles(data.data ?? data);
      } catch {
        setError('We could not load the latest news right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[],
  ];

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = featured ? filtered.filter((a) => a.id !== featured.id) : [];

  return (
    <PageTemplate
      title="News & Stories"
      description="The latest updates, impact stories, and announcements from Jumuiya Development Foundation."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
    >
      <div className="space-y-14">

        {/* Category filter pills */}
        {!loading && !error && categories.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-navy hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-10">
            <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-gray-100">
              <div className="h-64 lg:h-80 bg-gray-200" />
              <div className="p-10 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded w-full" />
                <div className="h-6 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-6 py-5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <Newspaper className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {activeCategory !== 'All'
                ? 'No articles in this category yet.'
                : 'No news articles have been published yet. Check back soon.'}
            </p>
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-6 text-primary font-medium text-sm hover:text-gold transition-colors"
              >
                Show all articles
              </button>
            )}
          </div>
        )}

        {/* Featured article */}
        {!loading && !error && featured && (
          <article className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="relative h-64 lg:h-full min-h-[300px] bg-gray-100 overflow-hidden">
              {featured.featured_image ? (
                <Image
                  src={featured.featured_image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-navy/30 flex items-center justify-center">
                  <Newspaper className="w-20 h-20 text-white/30" />
                </div>
              )}
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
                {featured.category && (
                  <>
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {featured.category}
                    </span>
                  </>
                )}
                {featured.published_at && (
                  <>
                    <span className="text-gray-300">·</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(featured.published_at)}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 group-hover:text-primary transition-colors leading-snug">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
              )}
              <Link
                href={`/news/${featured.slug ?? featured.id}`}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors"
              >
                Read Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        )}

        {/* Article grid */}
        {!loading && !error && rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  {article.featured_image ? (
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-navy/20 flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-white/40" />
                    </div>
                  )}
                  {article.category && (
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${CATEGORY_COLORS[article.category] ?? 'bg-white/90 text-gray-600'}`}>
                      {article.category}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {article.published_at && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug flex-grow">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/news/${article.slug ?? article.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-gold transition-colors mt-auto"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-navy rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Informed</h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-6">
            Subscribe to our newsletter and receive the latest news, impact stories, and updates directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              className="flex-grow px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-amber-500 text-navy font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </PageTemplate>
  );
}
