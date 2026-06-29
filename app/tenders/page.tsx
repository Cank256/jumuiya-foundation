'use client';

import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  ArrowRight,
  Search,
  AlertCircle,
  Hash,
  CheckCircle,
} from 'lucide-react';

export interface Tender {
  id: string | number;
  title: string;
  reference_number?: string;
  description?: string;
  deadline?: string;
  status: 'open' | 'closed' | 'awarded' | string;
  created_at?: string;
}

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-emerald-50 text-emerald-700',
  closed: 'bg-gray-100 text-gray-500',
  awarded: 'bg-blue-50 text-blue-700',
};

const GUIDELINES = [
  'All bids must be submitted before the specified closing deadline',
  'Bidders must meet the minimum qualification requirements stated in the tender documents',
  'Tender documents can be obtained from the JDF procurement office',
  'Late submissions will not be accepted under any circumstances',
  'JDF reserves the right to accept or reject any bid without giving reasons',
  'All submissions must be clearly marked with the tender reference number',
];

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchTenders() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/tenders');
        if (!res.ok) throw new Error('Failed to load tenders');
        const data = await res.json();
        const open = (data.data ?? data).filter(
          (t: Tender) => t.status === 'open'
        );
        setTenders(open);
      } catch {
        setError("We couldn't load open tenders right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTenders();
  }, []);

  const filtered = tenders.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.reference_number?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  });

  return (
    <PageTemplate
      title="Tenders & Procurement"
      description="Open procurement notices and tender opportunities from Jumuiya Development Foundation."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Get Involved', href: '/partner' },
        { label: 'Tenders' },
      ]}
    >
      <div className="space-y-16">

        {/* Intro + guidelines */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">Our Procurement Process</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              Jumuiya Development Foundation is committed to a fair, transparent, and competitive
              procurement process. We invite qualified businesses, service providers, and consultants
              to participate in our tenders and contribute to community transformation across Uganda.
            </p>
            <p>
              All procurement is conducted in accordance with our institutional procurement policy
              and applicable regulations. We do not charge any fees to access our tender documents.
            </p>
          </div>

          <div className="bg-navy rounded-2xl p-7 text-white">
            <h3 className="text-base font-bold text-gold mb-5 uppercase tracking-wide">Tender Guidelines</h3>
            <ul className="space-y-3">
              {GUIDELINES.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Active tenders */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-navy">Active Tenders</h2>
              <div className="w-16 h-1 bg-gold mt-3" />
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search tenders…"
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
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-6 py-5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">
                {search ? 'No matching tenders found' : 'No active tenders at this time'}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                {search
                  ? 'Try a different search term or clear the filter.'
                  : 'New procurement notices are posted as they arise. Check back regularly or contact our procurement office.'}
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
              {filtered.map((tender) => {
                const deadline = tender.deadline ? new Date(tender.deadline) : null;
                const isExpiringSoon =
                  deadline &&
                  deadline > new Date() &&
                  (deadline.getTime() - Date.now()) / 86400000 <= 7;

                return (
                  <div
                    key={tender.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          {tender.reference_number && (
                            <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                              <Hash className="w-3 h-3" />
                              {tender.reference_number}
                            </span>
                          )}
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[tender.status] ?? 'bg-gray-100 text-gray-500'}`}>
                            {tender.status}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-navy mt-1 mb-3 group-hover:text-primary transition-colors">
                          {tender.title}
                        </h3>

                        {tender.description && (
                          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
                            {tender.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}
                          </p>
                        )}

                        {deadline && (
                          <span className={`flex items-center gap-1.5 text-sm ${isExpiringSoon ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
                            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                            Closes: {deadline.toLocaleDateString('en-UG', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                            {isExpiringSoon && ' · Closing soon'}
                          </span>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <Link
                          href={`/tenders/${tender.id}`}
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                        >
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Procurement contact */}
        <section className="bg-primary/5 rounded-3xl border border-primary/10 p-10">
          <h2 className="text-2xl font-bold text-navy mb-2">Procurement Office</h2>
          <p className="text-gray-600 mb-6">
            For enquiries about any active tender or to request physical tender documents,
            please contact our procurement team.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700 mb-8">
            <span>📧 info@jumuiyafoundation.org</span>
            <span>📞 +256 740 466701</span>
            <span>📍 Central, Kampala, Mutungo I, Zone 1A</span>
          </div>
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
