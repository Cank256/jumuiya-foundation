import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import { Calendar, MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events | Jumuiya Development Foundation',
  description: 'Upcoming events, workshops, and community activities hosted by Jumuiya Development Foundation.',
};

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Community Resilience Forum 2026',
    description: 'An annual gathering of community leaders, development practitioners, and partners to share learnings, celebrate progress, and co-create strategies for the year ahead.',
    date: 'July 18, 2026',
    time: '9:00 AM – 5:00 PM EAT',
    location: 'Kampala, Uganda',
    category: 'Forum',
    seats: 'Open Registration',
    featured: true,
  },
  {
    id: 2,
    title: 'Gender Empowerment Workshop',
    description: 'A practical workshop for community health workers and NGO staff focused on gender-sensitive programming, inclusive policy advocacy, and protection of women and girls.',
    date: 'August 05, 2026',
    time: '8:30 AM – 4:00 PM EAT',
    location: 'Gulu, Uganda',
    category: 'Workshop',
    seats: 'Limited Seats',
  },
  {
    id: 3,
    title: 'Youth Leadership Training Programme',
    description: 'A five-day residential training for young people aged 18–30 covering ethical leadership, civic participation, entrepreneurship, and community project design.',
    date: 'August 18–22, 2026',
    time: 'Full Day (Residential)',
    location: 'Mbale, Uganda',
    category: 'Training',
    seats: 'Applications Open',
  },
  {
    id: 4,
    title: 'Annual Fundraising Gala',
    description: "Join us for an evening of inspiration, celebration, and giving. The Annual Gala brings together supporters, partners, and friends to raise funds for JDF's community programmes.",
    date: 'October 10, 2026',
    time: '7:00 PM – 11:00 PM EAT',
    location: 'Kampala, Uganda',
    category: 'Fundraising',
    seats: 'Tickets Required',
  },
  {
    id: 5,
    title: 'Environmental Sustainability Symposium',
    description: 'Explore community-driven solutions to climate change, sustainable agriculture, and natural resource conservation with practitioners and researchers from across East Africa.',
    date: 'November 14, 2026',
    time: '9:00 AM – 4:00 PM EAT',
    location: 'Kampala, Uganda',
    category: 'Symposium',
    seats: 'Open Registration',
  },
  {
    id: 6,
    title: 'Partner Networking Breakfast',
    description: 'An informal networking breakfast for current and prospective JDF partners to connect, share opportunities, and explore new collaborations.',
    date: 'December 03, 2026',
    time: '8:00 AM – 10:30 AM EAT',
    location: 'Kampala, Uganda',
    category: 'Networking',
    seats: 'By Invitation',
  },
];

const PAST_EVENTS = [
  { title: 'Community Health Education Campaign', date: 'March 2026', location: 'Northern Uganda' },
  { title: 'Women Entrepreneurship Summit', date: 'February 2026', location: 'Kampala' },
  { title: '2025 Annual General Meeting', date: 'December 2025', location: 'Kampala' },
  { title: 'WASH & Nutrition Training for Communities', date: 'October 2025', location: 'Eastern Uganda' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Forum: 'bg-primary/10 text-primary',
  Workshop: 'bg-gold/10 text-amber-700',
  Training: 'bg-navy/10 text-navy',
  Fundraising: 'bg-rose-50 text-rose-600',
  Symposium: 'bg-emerald-50 text-emerald-700',
  Networking: 'bg-purple-50 text-purple-700',
};

export default function EventsPage() {
  const featured = UPCOMING_EVENTS.find((e) => e.featured);
  const rest = UPCOMING_EVENTS.filter((e) => !e.featured);

  return (
    <PageTemplate
      title="Events"
      description="Workshops, forums, training programmes, and community activities — join us and be part of the change."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Events' },
      ]}
    >
      <div className="space-y-16">

        {/* Featured event */}
        {featured && (
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white">
            <span className="inline-block bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-6">
              Featured Event
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{featured.title}</h2>
            <p className="text-gray-300 text-lg max-w-2xl mb-8 leading-relaxed">{featured.description}</p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-gold" />
                <span>{featured.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5 text-gold" />
                <span>{featured.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-gold" />
                <span>{featured.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-gold" />
                <span>{featured.seats}</span>
              </div>
            </div>
            <Link
              href={`/events/${featured.id}`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Upcoming events grid */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-8">All Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col"
              >
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[event.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {event.category}
                </span>
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors flex-grow">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.seats}</span>
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:text-gold transition-colors"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Past events */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Past Events</h2>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            {PAST_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-2 ${
                  idx < PAST_EVENTS.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <div>
                  <div className="font-medium text-navy">{event.title}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">Completed</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 rounded-3xl p-10 text-center border border-primary/10">
          <h2 className="text-2xl font-bold text-navy mb-3">Want to Host or Sponsor an Event?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Partner with us to co-host a community workshop, forum, or training programme. Get in touch and let's explore how we can work together.
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
