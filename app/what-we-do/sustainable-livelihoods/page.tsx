import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Briefcase, PiggyBank, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Enterprise & Sustainable Livelihoods | Jumuiya Development Foundation',
  description: 'JDF works with youth, women, and communities to design and promote income-generating activities, entrepreneurship, and financial literacy.',
};

export default function SustainableLivelihoodsPage() {
  return (
    <PageTemplate
      title="Community Enterprise & Sustainable Livelihoods"
      description="Work with youth, women, and communities to design and promote income-generating activities, value addition, entrepreneurship, and financial literacy."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'Sustainable Livelihoods' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Economic empowerment is central to breaking cycles of poverty. JDF works with youth, women, and communities to co-design income-generating initiatives that are rooted in local assets, market opportunities, and community values.</p>
            <p>We combine practical business training with mentoring, peer networks, and access to micro-finance linkages — giving community entrepreneurs the full ecosystem they need to succeed and grow.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/what-we-do-07.jpg" alt="Sustainable livelihoods" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Briefcase className="w-5 h-5" />, title: 'Entrepreneurship Training', desc: 'Business planning, marketing, and operations coaching for community entrepreneurs.' },
            { icon: <PiggyBank className="w-5 h-5" />, title: 'Financial Literacy', desc: 'Savings, budgeting, and access to financial services for households.' },
            { icon: <TrendingUp className="w-5 h-5" />, title: 'Value Addition', desc: 'Processing and packaging support to increase the value of local products.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Women\'s enterprise groups and savings circles', 'Business skills and financial literacy training', 'Youth entrepreneurship incubation programmes', 'Value chain analysis and market linkages', 'Mentoring by experienced business practitioners', 'Linkages to micro-finance institutions and cooperatives'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/what-we-do" className="inline-flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors"><ArrowRight className="w-4 h-4 rotate-180" /> All Programmes</Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors">Get Involved <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </PageTemplate>
  );
}
