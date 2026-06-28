import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Droplets, Apple, Home, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WASH & Nutrition | Jumuiya Development Foundation',
  description: 'JDF develops and implements sustainable WASH and nutrition practices for communities across Uganda.',
};

export default function WashNutritionPage() {
  return (
    <PageTemplate
      title="WASH & Nutrition"
      description="Develop and implement sustainable WASH and nutrition practices through community health education, backyard gardening, school meals and community farm projects."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'WASH & Nutrition' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Access to clean water, proper sanitation, hygiene practices, and adequate nutrition are foundational to health and human dignity. JDF works with communities to implement sustainable WASH and nutrition programmes that are locally owned and maintained.</p>
            <p>We integrate food security and nutrition into our community development work — through backyard gardening, school meal programmes, and community farm projects — to reduce malnutrition and strengthen household resilience.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/what-we-do-05.jpg" alt="WASH and nutrition" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Droplets className="w-5 h-5" />, title: 'Water & Sanitation', desc: 'Improving access to clean water and safe sanitation infrastructure in communities.' },
            { icon: <Apple className="w-5 h-5" />, title: 'Nutrition', desc: 'Addressing malnutrition through backyard gardens, school meals, and dietary education.' },
            { icon: <Home className="w-5 h-5" />, title: 'Hygiene Education', desc: 'Community health education on handwashing, hygiene, and disease prevention.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Community WASH infrastructure support and training', 'Backyard kitchen gardening for household nutrition', 'School meal programme coordination', 'Community farm project establishment', 'Hygiene promotion campaigns in schools and communities', 'Training community health volunteers on WASH practices'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />{item}</li>
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
