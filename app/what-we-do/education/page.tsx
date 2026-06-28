import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Education Services & Development Skills | Jumuiya Development Foundation',
  description: 'JDF strengthens education systems, builds capacity, and improves access to equitable quality education across Uganda.',
};

export default function EducationPage() {
  return (
    <PageTemplate
      title="Education Services & Development Skills"
      description="Strengthen systems to build capacity, improve access, retention, school completion and resilience for equitable quality education."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'Education & Skills' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Education is the cornerstone of community transformation. JDF works alongside schools, community learning centres, and local leaders to strengthen education systems from the ground up — focusing on access, quality, and the retention of the most vulnerable learners.</p>
            <p>We believe education must be equitable, contextually relevant, and community-owned. Our programmes address barriers to learning at every level — from early childhood through adult literacy and vocational skills development.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/what-we-do-05.jpg" alt="Education programme" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <BookOpen className="w-5 h-5" />, title: 'Literacy & Numeracy', desc: 'Community-based literacy and numeracy programmes for children and adults.' },
            { icon: <GraduationCap className="w-5 h-5" />, title: 'School Completion', desc: 'Reducing dropout rates through mentoring, scholarships, and support systems.' },
            { icon: <Users className="w-5 h-5" />, title: 'Vocational Skills', desc: 'Training young people in marketable skills for economic empowerment.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Capacity building for teachers and school administrators', 'After-school tutoring and mentoring programmes', 'Adult literacy classes in community centres', 'Vocational and life-skills training for youth', 'School retention campaigns and awareness drives', 'Scholarship support for vulnerable learners'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />{item}</li>
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
