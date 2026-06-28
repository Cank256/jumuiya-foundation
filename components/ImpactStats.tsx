'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, BookOpen, Heart } from 'lucide-react';

const STATS = [
  { icon: <MapPin className="w-7 h-7" />, value: '100+', label: 'Projects Across Uganda', color: 'text-primary' },
  { icon: <Users className="w-7 h-7" />, value: '50,000+', label: 'Community Members Reached', color: 'text-gold' },
  { icon: <BookOpen className="w-7 h-7" />, value: '15+', label: 'Years of Experience', color: 'text-navy' },
  { icon: <Heart className="w-7 h-7" />, value: '6', label: 'Core Programme Areas', color: 'text-primary' },
];

export default function ImpactStats() {
  return (
    <section className="bg-navy rounded-3xl py-14 px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Our Impact</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          For over 15 years, we have worked alongside communities in Uganda and beyond to drive lasting change.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="text-center flex flex-col items-center gap-3"
          >
            <div className={`w-14 h-14 rounded-full bg-white/10 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-300 text-sm leading-snug max-w-[120px]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
