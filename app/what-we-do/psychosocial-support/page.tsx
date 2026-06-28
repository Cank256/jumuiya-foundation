import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Users, ShieldCheck, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Psychosocial Support & Wellbeing | Jumuiya Development Foundation',
  description: 'JDF provides community-based mental health and wellbeing support for youth and communities across Uganda.',
};

export default function PsychosocialPage() {
  return (
    <PageTemplate
      title="Psychosocial Support & Wellbeing"
      description="Utilise education and preventive strategies to provide community-based support systems for mental health and wellbeing."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'Psychosocial Support' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Mental health is central to individual and community wellbeing. JDF uses education and preventive strategies to build community-based support systems that address mental health, sexual and reproductive health, and lifestyle modification — particularly for youth and families facing adversity.</p>
            <p>We work with trained community health volunteers, peer support groups, and specialist practitioners to deliver contextually appropriate support that respects culture and promotes dignity.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/what-we-do-06.jpg" alt="Psychosocial support" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Heart className="w-5 h-5" />, title: 'Mental Health Support', desc: 'Community-based counselling, peer support, and mental health awareness.' },
            { icon: <Users className="w-5 h-5" />, title: 'Youth Wellbeing', desc: 'Safe spaces, life skills, and sexual and reproductive health education for young people.' },
            { icon: <ShieldCheck className="w-5 h-5" />, title: 'Preventive Strategies', desc: 'Education campaigns on substance abuse, trauma, and healthy lifestyle choices.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-navy/10 text-navy flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-navy/5 rounded-2xl p-8 border border-navy/10">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Training community health volunteers in psychosocial first aid', 'Peer support group facilitation for youth and women', 'Awareness campaigns on mental health stigma', 'Sexual and reproductive health education sessions', 'Lifestyle modification coaching for families', 'Referral pathways to clinical mental health services'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" />{item}</li>
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
