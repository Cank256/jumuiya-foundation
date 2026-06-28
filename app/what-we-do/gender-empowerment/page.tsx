import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Scale, Users2, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gender Empowerment & Human Rights | Jumuiya Development Foundation',
  description: 'JDF advocates for inclusive policies, protects women and girls, and promotes gender equity and social accountability across Uganda.',
};

export default function GenderEmpowermentPage() {
  return (
    <PageTemplate
      title="Gender Empowerment & Human Rights"
      description="Advocate for inclusive policies, protect women, girls and vulnerable groups, and promote gender equity and social accountability."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'Gender Empowerment' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Gender equality is not a side issue — it is central to everything JDF does. We work to dismantle the structural barriers that prevent women, girls, and marginalised groups from fully participating in community, economic, and political life.</p>
            <p>Through advocacy, community education, and direct programme support, we promote rights-based development that leaves no one behind. We work with men and boys as partners in this work, recognising that gender equality benefits everyone.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/women-empowerment-01.jpg" alt="Gender empowerment programme" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Shield className="w-5 h-5" />, title: 'Protection', desc: 'Protecting women, girls, and vulnerable groups from gender-based violence and discrimination.' },
            { icon: <Scale className="w-5 h-5" />, title: 'Advocacy', desc: 'Influencing policies and social norms that perpetuate gender inequality.' },
            { icon: <Users2 className="w-5 h-5" />, title: 'Social Accountability', desc: 'Strengthening community mechanisms to uphold rights and challenge injustice.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-amber-700 flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gold/5 rounded-2xl p-8 border border-gold/20">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Gender-based violence prevention and response programmes', 'Women\'s rights awareness and legal literacy campaigns', 'Girls\' education and leadership development', 'Men and boys engagement in gender equality work', 'Advocacy with local government on inclusive policies', 'Community accountability monitoring and reporting'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />{item}</li>
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
