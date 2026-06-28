import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, BookOpen, Heart, Leaf, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Impact | Jumuiya Development Foundation',
  description: 'Discover the real-world impact of Jumuiya Development Foundation across Uganda — stories, data, and annual reports.',
};

const STATS = [
  { icon: <TrendingUp className="w-6 h-6" />, value: '100+', label: 'Projects delivered across Uganda' },
  { icon: <Users className="w-6 h-6" />, value: '50,000+', label: 'Community members reached' },
  { icon: <BookOpen className="w-6 h-6" />, value: '15+', label: 'Years of community-led development' },
  { icon: <Heart className="w-6 h-6" />, value: '200+', label: 'Women-led enterprises supported' },
  { icon: <Leaf className="w-6 h-6" />, value: '5', label: 'Districts with climate education' },
  { icon: <Shield className="w-6 h-6" />, value: '6', label: 'Core programme areas' },
];

const STORIES = [
  {
    name: 'Grace, Northern Uganda',
    programme: 'Community Enterprise',
    quote: 'Through the enterprise training I started a small tailoring business. I now employ two other women from my village.',
    image: '/images/jdf/testimonial-1.jpg',
  },
  {
    name: 'Samuel, Eastern Uganda',
    programme: 'Education & Skills',
    quote: 'The literacy programme helped me finish school. I am now mentoring other young people in my community.',
    image: '/images/jdf/testimonial-4.jpg',
  },
  {
    name: 'Amina, Kampala',
    programme: 'Psychosocial Support',
    quote: 'JDF gave me a safe space to heal and rebuild. Today I am a community health volunteer.',
    image: '/images/jdf/testimonial-5.jpg',
  },
];

const REPORTS = [
  { label: '2024 / 2025 Annual Report', href: '#', size: 'PDF · 4.2 MB' },
  { label: '2023 / 2024 Annual Report', href: '#', size: 'PDF · 3.8 MB' },
  { label: '2022 / 2023 Annual Report', href: '#', size: 'PDF · 3.5 MB' },
  { label: '2021 / 2022 Annual Report', href: '#', size: 'PDF · 3.1 MB' },
  { label: '2019 / 2020 Annual Report', href: '#', size: 'PDF · 2.9 MB' },
  { label: '2018 / 2019 Annual Report', href: '#', size: 'PDF · 2.6 MB' },
  { label: '2017 / 2018 Annual Report', href: '#', size: 'PDF · 2.4 MB' },
  { label: '2016 / 2017 Annual Report', href: '#', size: 'PDF · 2.1 MB' },
];

export default function ImpactPage() {
  return (
    <PageTemplate
      title="Our Impact"
      description="Evidence of lasting change — stories, data, and reports from across our community programmes."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Impact' }]}
    >
      <div className="space-y-20">

        {/* Stats */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Impact at a Glance</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-navy">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How we measure impact */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">How We Measure Change</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              For JDF, evidence is critical for any intervention. We leverage research and evidence to inform decisions and actions. Through advocacy, we educate, connect, amplify and mobilise voices for policy change.
            </p>
            <p>
              Our twin elements of research and advocacy help us to learn about our communities, the issues they face, and how we can work together to influence the conversation for policy change. We track progress across all six programme areas using community-defined indicators and independent evaluations.
            </p>
            <Link href="/what-we-do" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
              See what we do <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Research & Advocacy', desc: 'Evidence-based policy engagement', color: 'bg-primary' },
              { label: 'Community Ownership', desc: 'Communities guide planning and learning', color: 'bg-navy' },
              { label: 'Partnerships', desc: 'Strategic alliances for long-term change', color: 'bg-gold' },
              { label: 'Innovation', desc: 'Creative, adaptable approaches', color: 'bg-gray-700' },
            ].map((item, idx) => (
              <div key={idx} className={`${item.color} rounded-2xl p-5 text-white`}>
                <div className="font-bold mb-1">{item.label}</div>
                <div className="text-white/70 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact stories */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Stories of Change</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORIES.map((story, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="relative h-52 bg-gray-100">
                  <Image src={story.image} alt={story.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover object-top" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{story.programme}</span>
                  <blockquote className="text-gray-700 italic leading-relaxed flex-grow">"{story.quote}"</blockquote>
                  <div className="mt-4 font-semibold text-navy text-sm">— {story.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Annual Reports */}
        <section id="annual-reports">
          <h2 className="text-3xl font-bold text-navy mb-3">Annual Reports</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPORTS.map((report, idx) => (
              <a
                key={idx}
                href={report.href}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">PDF</div>
                  <div>
                    <div className="font-medium text-navy group-hover:text-primary transition-colors">{report.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{report.size}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Help Us Create More Impact</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Every contribution supports communities in Uganda to build resilience, access education, and shape their own futures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors">Donate Now</Link>
            <Link href="/partner" className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-full transition-colors">Become a Partner</Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
