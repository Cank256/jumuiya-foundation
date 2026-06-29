'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Clock, CalendarDays } from 'lucide-react';

interface Event {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  time?: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | string;
}

function formatEventDate(start?: string) {
  if (!start) return '';
  return new Date(start).toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const all: Event[] = data.data ?? data;
        const now = new Date();

        // Filter to upcoming/ongoing events only, take first 3
        const upcoming = all
          .filter(
            (e) =>
              e.status === 'upcoming' ||
              e.status === 'ongoing' ||
              (e.start_date && new Date(e.start_date) >= now)
          )
          .slice(0, 3);

        setEvents(upcoming);
      } catch {
        // Silently fail — section simply won't render
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl">Join us for these exciting upcoming activities.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse border border-gray-200 rounded-2xl p-6 bg-white space-y-4">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-5 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

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
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white flex flex-col"
          >
            {event.category && (
              <div className="text-sm font-semibold text-gold mb-3 uppercase tracking-wider">
                {event.category}
              </div>
            )}
            <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary transition-colors flex-grow leading-snug">
              {event.title}
            </h3>
            {event.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                {event.description}
              </p>
            )}

            <div className="space-y-3 pt-4 border-t border-gray-100 mt-auto">
              {event.start_date && (
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{formatEventDate(event.start_date)}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <Link
              href={`/events/${event.id}`}
              className="mt-5 inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:text-gold transition-colors"
            >
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>

      <Link href="/events" className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-navy rounded-lg font-medium">
        All Events <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
