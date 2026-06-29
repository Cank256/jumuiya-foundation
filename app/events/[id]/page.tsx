'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Share2,
  Copy,
  CheckCheck,
} from 'lucide-react';

interface Event {
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
  featured_image?: string;
  registration_url?: string;
}

const STATUS_STYLES: Record<string, string> = {
  upcoming: 'bg-emerald-50 text-emerald-700',
  ongoing: 'bg-blue-50 text-blue-700',
  completed: 'bg-gray-100 text-gray-500',
};

const STATUS_LABELS: Record<string, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

const CATEGORY_COLORS: Record<string, string> = {
  Forum: 'bg-primary/10 text-primary',
  Workshop: 'bg-gold/10 text-amber-700',
  Training: 'bg-navy/10 text-navy',
  Fundraising: 'bg-rose-50 text-rose-600',
  Symposium: 'bg-emerald-50 text-emerald-700',
  Networking: 'bg-purple-50 text-purple-700',
};

function formatLongDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-UG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setEvent(data);
      } catch {
        setError('This event could not be loaded. It may have been removed.');
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchEvent();
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event?.title,
        text: `Check out this event from JDF: ${event?.title}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageTemplate
        title="Loading…"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Loading…' }]}
      >
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-72 bg-gray-200 rounded-2xl" />
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="space-y-3 mt-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error || !event) {
    return (
      <PageTemplate
        title="Event Not Found"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Not Found' }]}
      >
        <div className="max-w-lg mx-auto text-center py-16">
          <AlertCircle className="w-14 h-14 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-3">Event Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error ?? 'This event does not exist or may have been removed.'}
          </p>
          <button
            onClick={() => router.push('/events')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </button>
        </div>
      </PageTemplate>
    );
  }

  const startDate = event.start_date ? new Date(event.start_date) : null;
  const endDate = event.end_date ? new Date(event.end_date) : null;
  const isUpcoming =
    event.status === 'upcoming' ||
    event.status === 'ongoing' ||
    (startDate && startDate >= new Date());
  const resolvedStatus = event.status ?? (isUpcoming ? 'upcoming' : 'completed');

  return (
    <PageTemplate
      title={event.title}
      description={event.category ? `${event.category} · Jumuiya Development Foundation` : 'Event · Jumuiya Development Foundation'}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: event.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back + status */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <button
            onClick={() => router.push('/events')}
            className="inline-flex items-center gap-2 text-primary hover:text-gold font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Events
          </button>
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${STATUS_STYLES[resolvedStatus] ?? 'bg-gray-100 text-gray-500'}`}>
            {isUpcoming
              ? <><CheckCircle className="w-4 h-4" /> {STATUS_LABELS[resolvedStatus] ?? 'Upcoming'}</>
              : STATUS_LABELS[resolvedStatus] ?? 'Past Event'}
          </span>
        </div>

        {/* Featured image */}
        {event.featured_image && (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-100">
            <Image
              src={event.featured_image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Event details card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h3 className="text-base font-bold text-navy mb-5">Event Details</h3>
          <div className="space-y-4">
            {(startDate || endDate) && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Date</p>
                  <p className="text-navy font-medium text-sm">
                    {formatLongDate(event.start_date)}
                    {endDate && startDate?.toDateString() !== endDate.toDateString() && (
                      <span className="text-gray-500"> – {formatLongDate(event.end_date)}</span>
                    )}
                  </p>
                </div>
              </div>
            )}
            {event.time && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Time</p>
                  <p className="text-navy font-medium text-sm">{event.time}</p>
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Location</p>
                  <p className="text-navy font-medium text-sm">{event.location}</p>
                </div>
              </div>
            )}
            {event.seats && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Availability</p>
                  <p className="text-navy font-medium text-sm">{event.seats}</p>
                </div>
              </div>
            )}
            {event.category && (
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Category</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[event.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {event.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <section className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-3">About This Event</h3>
            <div className="w-10 h-0.5 bg-gold mb-5" />
            {/<[a-z][\s\S]*>/i.test(event.description) ? (
              <div
                className="prose prose-sm max-w-none text-gray-700 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            )}
          </section>
        )}

        {/* CTA */}
        {isUpcoming ? (
          <div className="bg-navy rounded-3xl p-8 md:p-10 text-white mb-10">
            <h3 className="text-2xl font-bold mb-3">Interested in Attending?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              For more information about this event, to register, or to discuss sponsorship opportunities,
              get in touch with our team.
            </p>
            <div className="flex flex-wrap gap-3">
              {event.registration_url ? (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10">
            <h3 className="text-xl font-bold text-navy mb-2">This event has passed</h3>
            <p className="text-gray-600 mb-6">
              Check our upcoming events for future programmes and opportunities to get involved.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                View Upcoming Events <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 border border-gray-200 text-navy px-6 py-3 rounded-full text-sm font-medium hover:border-primary/40 transition-colors"
              >
                {copied
                  ? <><CheckCheck className="w-4 h-4 text-emerald-600" /> Copied!</>
                  : <><Copy className="w-4 h-4" /> Copy link</>}
              </button>
            </div>
          </div>
        )}

      </div>
    </PageTemplate>
  );
}
