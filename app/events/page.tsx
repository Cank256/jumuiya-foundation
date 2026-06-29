'use client';

import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Info,
  CalendarDays,
} from 'lucide-react';

export interface Event {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  time?: string;
  seats?: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | string;
  featured?: boolean;
  registration_url?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Forum: 'bg-primary/10 text-primary',
  Workshop: 'bg-gold/10 text-amber-700',
  Training: 'bg-navy/10 text-navy',
  Fundraising: 'bg-rose-50 text-rose-600',
  Symposium: 'bg-emerald-50 text-emerald-700',
  Networking: 'bg-purple-50 text-purple-700',
  Conference: 'bg-blue-50 text-blue-700',
};

function formatEventDate(start?: string, end?: string) {
  if (!start) return '';
  const s = new Date(start);
  const startStr = s.toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' });
  if (!end) return startStr;
  const e = new Date(end);
  if (s.toDateString() === e.toDateString()) return startStr;
  // Same month
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }
  return `${startStr} – ${e.toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [past, setPast] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const all: Event[] = data.data ?? data;
        const now = new Date();
        setUpcoming(
          all.filter(
            (e) =>
              e.status === 'upcoming' ||
              e.status === 'ongoing' ||
              (e.start_date && new Date(e.start_date) >= now)
          )
        );
        setPast(
          all.filter(
            (e) =>
              e.status === 'completed' ||
              (e.start_date && new Date(e.start_date) < now && e.status !== 'upcoming' && e.status !== 'ongoing')
          )
        );
      } catch {
        setError('We could not load events right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];
  const rest = featured ? upcoming.filter((e) => e.id !== featured.id) : [];

  return (
    <PageTemplate
      title="Events"
      description="Workshops, forums, training programmes, and community activities — join us and be part of the change."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
    >
      <div className="space-y-16">

        {/* Loading */}
        {loading && (
          <div className="space-y-10">
            <div className="animate-pulse bg-navy rounded-3xl p-10 space-y-4">
              <div className="h-5 bg-white/20 rounded w-24" />
              <div className="h-8 bg-white/20 rounded w-2/3" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-4/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-4/5" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <Info className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">Nothing to show just yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Our upcoming events will appear here. Check back soon or contact us to learn about future programmes.
            </p>
          </div>
        )}

        {/* No upcoming events */}
        {!loading && !error && upcoming.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <CalendarDays className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">No upcoming events</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              New events are added regularly. Check back soon or contact us to enquire about future programmes.
            </p>
          </div>
        )}

        {/* Featured event hero */}
        {!loading && !error && featured && (
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white">
            <span className="inline-block bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-6">
              {featured.featured ? 'Featured Event' : 'Next Event'}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{featured.title}</h2>
            {featured.description && (
              <p className="text-gray-300 text-lg max-w-2xl mb-8 leading-relaxed line-clamp-3">
                {featured.description}
              </p>
            )}
            <div className="flex flex-wrap gap-5 mb-8">
              {(featured.start_date || featured.end_date) && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>{formatEventDate(featured.start_date, featured.end_date)}</span>
                </div>
              )}
              {featured.time && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>{featured.time}</span>
                </div>
              )}
              {featured.location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>{featured.location}</span>
                </div>
              )}
              {featured.seats && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>{featured.seats}</span>
                </div>
              )}
            </div>
            <Link
              href={`/events/${featured.id}`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Upcoming events grid */}
        {!loading && !error && rest.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-navy mb-8">All Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col"
                >
                  {event.category && (
                    <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[event.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {event.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors flex-grow leading-snug">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-2 pt-4 border-t border-gray-100 mb-4">
                    {(event.start_date || event.end_date) && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{formatEventDate(event.start_date, event.end_date)}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.seats && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{event.seats}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:text-gold transition-colors"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past events */}
        {!loading && !error && past.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-navy mb-6">Past Events</h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              {past.map((event, idx) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-2 hover:bg-gray-50 transition-colors group ${
                    idx < past.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <div className="font-medium text-navy group-hover:text-primary transition-colors">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1 flex-wrap">
                      {event.start_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.start_date).toLocaleDateString('en-UG', { month: 'long', year: 'numeric' })}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto flex-shrink-0">
                    Completed
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Host / sponsor CTA */}
        <section className="bg-primary/5 rounded-3xl p-10 text-center border border-primary/10">
          <h2 className="text-2xl font-bold text-navy mb-3">Want to Host or Sponsor an Event?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Partner with us to co-host a community workshop, forum, or training programme. Get in touch and we will explore how we can work together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-medium transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
}
