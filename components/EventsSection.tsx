'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const EVENTS = [
  { id: 1, title: 'Annual General Meeting', date: 'Oct 15, 2026', location: 'Main Auditorium', category: 'General' },
  { id: 2, title: 'Research Symposium', date: 'Nov 02, 2026', location: 'Science Block', category: 'Academic' },
  { id: 3, title: 'Alumni Dinner', date: 'Dec 10, 2026', location: 'City Hotel', category: 'Social' },
];

export default function EventsSection() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-navy mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl">Join us for these exciting upcoming activities.</p>
        </div>
        <Link href="/events" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors">
          All Events <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white flex flex-col"
          >
            <div className="text-sm font-semibold text-gold mb-3 uppercase tracking-wider">{event.category}</div>
            <h3 className="text-xl font-bold text-navy mb-6 group-hover:text-primary transition-colors flex-grow">
              {event.title}
            </h3>
            
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Link href="/events" className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-navy rounded-lg font-medium">
        All Events <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}