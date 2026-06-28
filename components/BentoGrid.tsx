'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, GraduationCap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Education & Skills',
    description: 'Strengthen systems to build capacity and improve access to equitable quality education.',
    icon: <GraduationCap className="w-6 h-6" />,
    href: '/academics',
    colSpan: 'md:col-span-2',
    color: 'bg-primary'
  },
  {
    title: 'Psychosocial Support',
    description: 'Community-based support systems for mental health and wellbeing.',
    icon: <Users className="w-6 h-6" />,
    href: '/student-life/health',
    colSpan: 'md:col-span-1',
    color: 'bg-navy'
  },
  {
    title: 'Gender & Rights',
    description: 'Advocate for inclusive policies and empower vulnerable groups.',
    icon: <BookOpen className="w-6 h-6" />,
    href: '/student-life/support',
    colSpan: 'md:col-span-1',
    color: 'bg-gold'
  },
  {
    title: 'Community Enterprise',
    description: 'Promoting income-generating activities and entrepreneurship to reduce poverty.',
    icon: <Globe className="w-6 h-6" />,
    href: '/resources/downloads',
    colSpan: 'md:col-span-2',
    color: 'bg-gray-800'
  }
];

export default function BentoGrid() {
  return (
    <section>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-navy mb-4">What We Do</h2>
        <p className="text-gray-600 max-w-2xl">Learn more about our core initiatives and how we empower communities.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`rounded-2xl p-6 lg:p-8 text-white flex flex-col justify-between group overflow-hidden relative ${feature.colSpan} ${feature.color}`}
          >
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 transition-transform duration-500 group-hover:scale-110">
              {feature.icon}
            </div>
            
            <div className="mb-12">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-white/80 relative z-10">{feature.description}</p>
            </div>
            
            <Link href={feature.href} className="flex items-center gap-2 font-medium hover:gap-4 transition-all w-fit relative z-10">
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
