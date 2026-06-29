'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Tag,
  User,
  ArrowRight,
  AlertCircle,
  Share2,
  Copy,
  CheckCheck,
  Newspaper,
} from 'lucide-react';

interface NewsArticle {
  id: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featured_image?: string;
  published_at?: string;
  creator?: { name: string };
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
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setArticle(data);
      } catch {
        setError('This article could not be loaded. It may have been removed.');
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchArticle();
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article?.title,
        text: article?.excerpt ?? article?.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageTemplate
        title="Loading…"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: 'Loading…' }]}
      >
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-72 bg-gray-200 rounded-2xl" />
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="space-y-3 mt-4">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error || !article) {
    return (
      <PageTemplate
        title="Article Not Found"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: 'Not Found' }]}
      >
        <div className="max-w-lg mx-auto text-center py-16">
          <AlertCircle className="w-14 h-14 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-3">Article Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error ?? 'This article does not exist or may have been removed.'}
          </p>
          <button
            onClick={() => router.push('/news')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title={article.title}
      description={article.excerpt ?? (article.category ? `${article.category} · Jumuiya Development Foundation` : undefined)}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'News', href: '/news' },
        { label: article.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push('/news')}
          className="inline-flex items-center gap-2 text-primary hover:text-gold font-medium transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> All News
        </button>

        {/* Featured image */}
        {article.featured_image ? (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-100">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-navy/10 flex items-center justify-center mb-8">
            <Newspaper className="w-10 h-10 text-primary/30" />
          </div>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          {article.category && (
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
              <Tag className="w-3 h-3 inline mr-1" />
              {article.category}
            </span>
          )}
          {article.published_at && (
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(article.published_at)}
            </span>
          )}
          {article.creator?.name && (
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {article.creator.name}
            </span>
          )}
        </div>

        {/* Excerpt pull-quote */}
        {article.excerpt && (
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 mb-8">
            <p className="text-gray-700 text-lg italic leading-relaxed">{article.excerpt}</p>
          </div>
        )}

        {/* Article body */}
        {article.content && (
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12
              [&_h2]:text-navy [&_h2]:font-bold [&_h3]:text-navy [&_h3]:font-bold
              [&_a]:text-primary [&_a]:no-underline [&_a:hover]:text-gold
              [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
              [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-gray-600
              [&_img]:rounded-xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Share bar */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-base font-bold text-navy mb-4">Share this article</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary/40 text-navy px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              {copied
                ? <><CheckCheck className="w-4 h-4 text-emerald-600" /> Copied!</>
                : <><Copy className="w-4 h-4" /> Copy link</>}
            </button>
          </div>
        </div>

        {/* More news CTA */}
        <div className="mt-14 bg-navy rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">More from JDF</h3>
          <p className="text-gray-300 text-sm mb-6">
            Stay informed with the latest updates, stories, and announcements from our work across Uganda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              All News <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

      </div>
    </PageTemplate>
  );
}
