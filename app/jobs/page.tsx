'use client';

import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Calendar,
  Building2,
  Search,
  Info,
} from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  department?: string;
  employment_type?: string;
  location?: string;
  application_deadline?: string;
  description?: string;
  purpose_of_role?: string;
  status: 'active' | 'closed' | string;
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  internship: 'Internship',
  consultancy: 'Consultancy',
};

function stripHtml(html: string): string {
  if (!html || typeof window === 'undefined') return html ?? '';
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent ?? el.innerText ?? '').replace(/\s+/g, ' ').trim();
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to load jobs');
        const data = await res.json();
        const active = (data.data ?? data).filter(
          (j: Job) => j.status === 'active'
        );
        setJobs(active);
      } catch {
        setError("We couldn't load open positions right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filtered = jobs.filter((j) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      j.title?.toLowerCase().includes(q) ||
      j.department?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q)
    );
  });

  return (
    <PageTemplate
      title="Career Opportunities"
      description="Join the Jumuiya Development Foundation team and help drive lasting change across communities in Uganda."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Get Involved', href: '/partner' },
        { label: 'Careers' },
      ]}
    >
      <div className="space-y-16">

        {/* Why work with us */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">Work Where It Matters</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              At JDF, we believe that meaningful work begins with the right people. Our team is made up of
              development practitioners, community organisers, researchers, and administrative professionals
              who are united by a shared commitment to community-led transformation.
            </p>
            <p>
              We offer an environment that values innovation, ethical practice, and continuous learning.
              Whether you are an experienced development professional or just starting your career, JDF
              provides the space to grow while making a tangible difference.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Mission-Driven', desc: 'Every role contributes directly to community transformation', color: 'bg-primary' },
              { title: 'Learning Culture', desc: 'Continuous professional development and mentorship', color: 'bg-navy' },
              { title: 'Inclusive Workplace', desc: 'We value diverse backgrounds and lived experience', color: 'bg-gold' },
              { title: 'Real Impact', desc: 'Work that you can see and measure in communities', color: 'bg-gray-700' },
            ].map((item) => (
              <div key={item.title} className={`${item.color} rounded-2xl p-5 text-white`}>
                <div className="font-bold text-sm mb-1">{item.title}</div>
                <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open positions */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-navy">Open Positions</h2>
              <div className="w-16 h-1 bg-gold mt-3" />
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search roles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-gray-100 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <Info className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Nothing to show just yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Open positions will appear here as they become available. Check back soon for new opportunities.
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <Briefcase className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">
                {search ? 'No matching positions found' : 'No open positions at this time'}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                {search
                  ? 'Try a different search term or check back for new opportunities.'
                  : 'We are not actively hiring right now, but new roles are posted regularly. Check back soon.'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-6 text-primary font-medium text-sm hover:text-gold transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((job) => {
                const deadline = job.application_deadline
                  ? new Date(job.application_deadline)
                  : null;
                const isExpiringSoon =
                  deadline &&
                  deadline > new Date() &&
                  (deadline.getTime() - Date.now()) / 86400000 <= 7;

                return (
                  <div
                    key={job.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {job.department && (
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            {job.department}
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-navy mt-1 mb-3 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          {job.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-primary" />
                              {job.location}
                            </span>
                          )}
                          {job.employment_type && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-primary" />
                              {TYPE_LABELS[job.employment_type] ?? job.employment_type}
                            </span>
                          )}
                          {deadline && (
                            <span className={`flex items-center gap-1.5 ${isExpiringSoon ? 'text-amber-600 font-medium' : ''}`}>
                              <Calendar className="w-4 h-4 text-primary" />
                              Deadline: {deadline.toLocaleDateString('en-UG', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                              {isExpiringSoon && ' · Closing soon'}
                            </span>
                          )}
                        </div>

                        {(job.purpose_of_role || job.description) && (
                          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                            {stripHtml(job.purpose_of_role ?? job.description ?? '')}
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                        >
                          View & Apply <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Speculative applications */}
        <section className="bg-navy rounded-3xl p-10 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <Building2 className="w-10 h-10 text-gold mb-4" />
              <h2 className="text-2xl font-bold mb-3">Don't See a Role That Fits?</h2>
              <p className="text-gray-300 leading-relaxed">
                We are always interested in hearing from talented people who share our values.
                Send us your CV and a brief cover letter and we will be in touch if a suitable
                opportunity arises.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
