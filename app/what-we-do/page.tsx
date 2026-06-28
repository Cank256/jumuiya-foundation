import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What We Do | Jumuiya Development Foundation',
  description: 'Explore the six core programme areas through which Jumuiya Development Foundation drives community transformation across Uganda.',
};

const PROGRAMMES = [
  {
    title: 'Education Services & Development Skills',
    slug: 'education',
    image: '/images/jdf/what-we-do-05.jpg',
    summary: 'Strengthen systems to build capacity, improve access, retention, school completion and resilience for equitable quality education.',
    color: 'bg-primary',
  },
  {
    title: 'Psychosocial Support & Wellbeing',
    slug: 'psychosocial-support',
    image: '/images/jdf/what-we-do-06.jpg',
    summary: 'Utilise education and preventive strategies to provide community-based support systems for mental health, wellbeing, and sexual and reproductive health.',
    color: 'bg-navy',
  },
  {
    title: 'Gender Empowerment & Human Rights',
    slug: 'gender-empowerment',
    image: '/images/jdf/women-empowerment-01.jpg',
    summary: 'Advocate for inclusive policies, protect women, girls and vulnerable groups, and promote gender equity and social accountability.',
    color: 'bg-gold',
  },
  {
    title: 'Community Enterprise & Sustainable Livelihoods',
    slug: 'sustainable-livelihoods',
    image: '/images/jdf/what-we-do-07.jpg',
    summary: 'Work with youth, women, and communities to design and promote income-generating activities, entrepreneurship, and financial literacy to reduce poverty.',
    color: 'bg-emerald-700',
  },
  {
    title: 'WASH & Nutrition',
    slug: 'wash-nutrition',
    image: '/images/jdf/what-we-do-05.jpg',
    summary: 'Develop and implement sustainable WASH and nutrition practices through community health education, backyard gardening, school meals and community farm projects.',
    color: 'bg-sky-700',
  },
  {
    title: 'Environmental Sustainability & Climate Education',
    slug: 'environment',
    image: '/images/jdf/what-we-do-06.jpg',
    summary: 'Promote community resilience to climate change through conservation of natural resources, sustainable agriculture, and environmental education.',
    color: 'bg-gray-800',
  },
];

export default function WhatWeDoPage() {
  return (
    <PageTemplate
      title="What We Do"
      description="Six interconnected programme areas working together to create lasting community transformation."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do' }]}
    >
      <div className="space-y-16">

        <section className="max-w-3xl space-y-4 text-gray-600 leading-relaxed">
          <p>
            JDF's work is guided by a belief that communities hold the answers to their own challenges. Our role is to create the conditions — through partnerships, resources, training, and advocacy — that allow communities to lead their own transformation.
          </p>
          <p>
            Our six programme areas are interdependent and mutually reinforcing. A child in a safe, well-nourished environment learns better. An empowered woman builds a more resilient family. A community with sustainable livelihoods invests more in its own future.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMMES.map((prog) => (
            <Link
              key={prog.slug}
              href={`/what-we-do/${prog.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image src={prog.image} alt={prog.title} fill sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 ${prog.color} opacity-40 group-hover:opacity-30 transition-opacity`} />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors">{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{prog.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-primary font-medium text-sm group-hover:text-gold transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Strategies */}
        <section className="bg-navy rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-8">Our Strategies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Research & Advocacy', desc: 'We leverage evidence to inform decisions and mobilise voices for policy change.' },
              { title: 'Partnerships & Resource Mobilisation', desc: 'We build strategic alliances and strengthen collaborations to support long-term change.' },
              { title: 'Innovation', desc: 'We embrace creativity and remain open to new tools and ideas from communities and partners.' },
            ].map((s, idx) => (
              <div key={idx} className="bg-white/10 rounded-2xl p-6">
                <div className="font-bold text-gold mb-2">{s.title}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
