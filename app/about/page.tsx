import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Jumuiya Development Foundation',
  description: 'Learn about Jumuiya Development Foundation — our story, mission, vision, and core values.',
};

const PILLARS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Our Vision',
    text: 'A society where youth and communities take active leadership for community change rooted in ethical governance, service, and accountability.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Our Mission',
    text: 'We provide access and opportunity for individuals and community-based initiatives for sustainable livelihoods. Through partnership building, training, and programme implementation, we remove barriers and create platforms for economic self-reliance and sustainable change.',
    color: 'text-gold bg-gold/10',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Core Values',
    text: 'Our core values are rooted in ethical leadership, accountable citizenship, rights-based development, and collaboration.',
    color: 'text-navy bg-navy/10',
    list: ['Integrity & Accountability', 'Inclusivity & Diversity', 'Collaboration & Partnership', 'Innovation & Excellence'],
  },
];

const ACHIEVEMENTS = [
  '2008 — We first started our work in Pan-African leadership development',
  '2008 — Recognised by the AGDA for community-led development',
  '2008 — Grew to over 100 committed volunteers',
  '2019 — Partnered with ACME to strengthen community enterprise programmes',
  '2020 — Expanded our work on Women\'s Rights and gender equity',
  '2023 — Established Jumuiya Development Foundation in Uganda',
  '2025 — Became part of a global volunteer movement',
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8 pt-28 lg:pt-36">

      {/* Header */}
      <div className="mb-14">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 max-w-3xl">
          Founded on Community. Driven by Purpose.
        </h1>
        <div className="w-20 h-1 bg-gold" />
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Founded by community development professionals, <strong className="text-navy">Jumuiya Development Foundation (JDF) – Uganda</strong> is an indigenous for-impact non-profit organisation. We operate at the humanitarian-community-development nexus, working with communities, organisations, and individuals to co-create ideas and implement impactful projects for community transformation.
          </p>
          <p>
            Through our partnership-building model, we work with communities on education, governance, civic participation, and engagement projects. We thrive on nurturing collaborative relationships and opportunities for long-term community transformation.
          </p>
          <p>
            Our work reflects a simple but powerful belief: <em>lasting change happens when communities lead, when institutions listen, and when people are equipped with the skills, confidence, and values to shape their own futures.</em>
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/about/history" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
              Our Full History <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/team" className="inline-flex items-center gap-2 text-navy font-semibold hover:text-primary transition-colors">
              Meet the Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-navy rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="text-gold text-7xl font-serif leading-none mb-4 opacity-30 select-none">"</div>
          <blockquote className="text-lg md:text-xl leading-relaxed font-medium mb-6 -mt-6">
            With a common message, common tools and uncommon stories we can better support one another to be the change we want to see in the world.
          </blockquote>
          <cite className="text-gold font-semibold not-italic">— Morrison Saidu, Co-Founder</cite>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Vision / Mission / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {PILLARS.map((pillar) => (
          <div key={pillar.label} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${pillar.color}`}>
              {pillar.icon}
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">{pillar.label}</h3>
            <p className="text-gray-600 mb-3 flex-grow">{pillar.text}</p>
            {pillar.list && (
              <ul className="text-gray-600 space-y-1.5 list-none">
                {pillar.list.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-navy mb-8">Key Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Our History', href: '/about/history', desc: 'Trace our journey from 2008 to today.' },
          { label: 'Our Team', href: '/about/team', desc: 'Meet the people behind JDF.' },
          { label: 'Get Involved', href: '/partner', desc: 'Partner, volunteer, or donate.' },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-primary/5 hover:bg-primary hover:text-white rounded-2xl p-7 border border-primary/10 transition-all"
          >
            <h3 className="font-bold text-navy group-hover:text-white text-lg mb-1">{card.label}</h3>
            <p className="text-gray-600 group-hover:text-white/80 text-sm">{card.desc}</p>
            <ArrowRight className="w-4 h-4 text-primary group-hover:text-white mt-3 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

    </div>
  );
}
