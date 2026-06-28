import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News | Jumuiya Development Foundation',
  description: 'Stay up to date with the latest news, stories, and updates from Jumuiya Development Foundation.',
};

const NEWS_ARTICLES = [
  {
    id: 1,
    category: 'Community',
    title: 'JDF Launches New Community Resilience Programme in Northern Uganda',
    excerpt: 'Jumuiya Development Foundation has launched a new 18-month programme supporting communities in Northern Uganda to build resilience through education, skills training, and psychosocial support.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop',
    date: 'May 28, 2026',
    featured: true,
  },
  {
    id: 2,
    category: 'Gender Empowerment',
    title: 'Women-Led Enterprises: Stories of Change from Eastern Uganda',
    excerpt: 'Through our Community Enterprise programme, over 200 women have established income-generating businesses, reducing poverty and building household resilience.',
    image: '/images/jdf/women-empowerment-01.jpg',
    date: 'May 15, 2026',
    featured: false,
  },
  {
    id: 3,
    category: 'Education',
    title: 'New Partnership Strengthens School Retention in Rural Communities',
    excerpt: 'A new strategic partnership will improve school completion rates and literacy outcomes for children in underserved communities across Uganda.',
    image: '/images/jdf/what-we-do-05.jpg',
    date: 'May 02, 2026',
    featured: false,
  },
  {
    id: 4,
    category: 'Health & Wellbeing',
    title: 'JDF Expands Mental Health Services to Reach More Youth',
    excerpt: 'Our Psychosocial Support programme has extended its reach, providing community-based mental health services and lifestyle modification support to young people.',
    image: '/images/jdf/what-we-do-06.jpg',
    date: 'April 20, 2026',
    featured: false,
  },
  {
    id: 5,
    category: 'Environment',
    title: 'Climate Education Workshops Empower Communities to Act',
    excerpt: 'JDF delivered climate education workshops across five districts, equipping community members with knowledge and practical tools to address climate change impacts.',
    image: '/images/jdf/what-we-do-07.jpg',
    date: 'April 10, 2026',
    featured: false,
  },
  {
    id: 6,
    category: 'Annual Report',
    title: '2025 Annual Report: Building Together, Learning Together',
    excerpt: "JDF's 2025 Annual Report is now available. Read about our achievements, the communities we served, and our plans for the year ahead.",
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=800&auto=format&fit=crop',
    date: 'March 30, 2026',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Community', 'Education', 'Gender Empowerment', 'Health & Wellbeing', 'Environment', 'Annual Report'];

export default function NewsPage() {
  const featured = NEWS_ARTICLES.find((a) => a.featured);
  const rest = NEWS_ARTICLES.filter((a) => !a.featured);

  return (
    <PageTemplate
      title="News & Stories"
      description="The latest updates, impact stories, and announcements from Jumuiya Development Foundation."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'News' },
      ]}
    >
      <div className="space-y-14">

        {/* Category filters (static — would be dynamic with state in a client component) */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                cat === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-navy hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="relative h-64 lg:h-full min-h-[280px] bg-gray-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-medium">{featured.category}</span>
                <span>·</span>
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
              <Link
                href={`/news/${featured.id}`}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors"
              >
                Read Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-grow">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-5">{article.excerpt}</p>
                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-gold transition-colors mt-auto"
                >
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Subscribe CTA */}
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
