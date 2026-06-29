'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Hash,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  FileText,
  Share2,
  Clock,
} from 'lucide-react';

interface TenderDocument {
  id?: number;
  name?: string;
  type: string;
  url: string;
  size?: number;
}

interface Tender {
  id: string | number;
  title: string;
  reference_number?: string;
  description?: string;
  requirements?: string;
  deadline?: string;
  created_at?: string;
  status: 'open' | 'closed' | 'awarded' | string;
  document_url?: string;
  documents?: TenderDocument[];
  has_rfp_document?: boolean;
  rfp_download_url?: string;
  rfp_document_name?: string;
  rfp_document_size?: number;
  has_tor_document?: boolean;
  tor_download_url?: string;
  tor_document_name?: string;
  tor_document_size?: number;
}

const DOC_TYPE_LABELS: Record<string, string> = {
  rfp: 'Request for Proposal (RFP)',
  tor: 'Terms of Reference (ToR)',
  specification: 'Technical Specifications',
  other: 'Tender Document',
};

function formatBytes(bytes?: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function isHtml(str?: string): boolean {
  return !!str && /<[a-z][\s\S]*>/i.test(str);
}

function RichContent({ html, plain }: { html?: string; plain?: string }) {
  if (!html && !plain) return null;
  if (html && isHtml(html)) {
    return (
      <div
        className="prose prose-sm max-w-none text-gray-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-navy"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plain ?? html}</p>;
}

const SUBMISSION_GUIDELINES = [
  'All bids must be submitted before the specified deadline',
  'Bidders must meet the minimum qualification requirements',
  'Submissions must be in sealed envelopes clearly marked with the tender reference number',
  'Late submissions will not be accepted',
  'JDF reserves the right to accept or reject any bid',
];

export default function TenderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTender() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/tenders/${params.id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setTender(data);
      } catch {
        setError("We couldn't load this tender. It may have been removed or closed.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchTender();
  }, [params.id]);

  if (loading) {
    return (
      <PageTemplate
        title="Loading…"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tenders', href: '/tenders' }, { label: 'Loading…' }]}
      >
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="space-y-3 mt-6">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error || !tender) {
    return (
      <PageTemplate
        title="Tender Not Found"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tenders', href: '/tenders' }, { label: 'Not Found' }]}
      >
        <div className="max-w-lg mx-auto text-center py-16">
          <AlertCircle className="w-14 h-14 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-3">Tender Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error ?? "This tender doesn't exist or may have already been closed."}
          </p>
          <button
            onClick={() => router.push('/tenders')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tenders
          </button>
        </div>
      </PageTemplate>
    );
  }

  const deadline = tender.deadline ? new Date(tender.deadline) : null;
  const isExpired = deadline ? deadline < new Date() : false;
  const isOpen = tender.status === 'open' && !isExpired;

  // Build the documents array from all available sources
  const documents: TenderDocument[] = [];
  if (tender.documents?.length) {
    documents.push(...tender.documents);
  } else {
    if (tender.has_rfp_document && tender.rfp_download_url) {
      documents.push({
        name: tender.rfp_document_name ?? 'RFP Document',
        type: 'rfp',
        url: tender.rfp_download_url,
        size: tender.rfp_document_size,
      });
    }
    if (tender.has_tor_document && tender.tor_download_url) {
      documents.push({
        name: tender.tor_document_name ?? 'ToR Document',
        type: 'tor',
        url: tender.tor_download_url,
        size: tender.tor_document_size,
      });
    }
    if (tender.document_url && documents.length === 0) {
      documents.push({ type: 'other', url: tender.document_url });
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tender.title} — JDF Tenders`,
        text: `Tender opportunity at Jumuiya Development Foundation: ${tender.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageTemplate
      title={tender.title}
      description="Tender Opportunity · Jumuiya Development Foundation"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tenders', href: '/tenders' },
        { label: tender.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back + status row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <button
            onClick={() => router.push('/tenders')}
            className="inline-flex items-center gap-2 text-primary hover:text-gold font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Tenders
          </button>

          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${
            isOpen
              ? 'bg-emerald-50 text-emerald-700'
              : tender.status === 'awarded'
              ? 'bg-blue-50 text-blue-700'
              : 'bg-red-50 text-red-600'
          }`}>
            {isOpen
              ? <><CheckCircle className="w-4 h-4" /> Open</>
              : tender.status === 'awarded'
              ? <><CheckCircle className="w-4 h-4" /> Awarded</>
              : <><XCircle className="w-4 h-4" /> Closed</>}
          </span>
        </div>

        {/* Tender info card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h3 className="text-base font-bold text-navy mb-5">Tender Information</h3>
          <div className="space-y-4">
            {tender.reference_number && (
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Reference Number</p>
                  <p className="text-navy font-medium text-sm font-mono">{tender.reference_number}</p>
                </div>
              </div>
            )}
            {deadline && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Submission Deadline</p>
                  <p className={`font-medium text-sm ${isExpired ? 'text-red-600' : 'text-navy'}`}>
                    {deadline.toLocaleDateString('en-UG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    {isExpired && ' (Expired)'}
                  </p>
                </div>
              </div>
            )}
            {tender.created_at && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Published</p>
                  <p className="text-navy font-medium text-sm">
                    {new Date(tender.created_at).toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {tender.description && (
          <section className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-3">Tender Description</h3>
            <div className="w-10 h-0.5 bg-gold mb-5" />
            <RichContent html={tender.description} plain={tender.description} />
          </section>
        )}

        {/* Requirements */}
        {tender.requirements && (
          <section className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-3">Requirements & Qualifications</h3>
            <div className="w-10 h-0.5 bg-gold mb-5" />
            <RichContent html={tender.requirements} plain={tender.requirements} />
          </section>
        )}

        {/* Submission guidelines */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 mb-10">
          <h3 className="text-base font-bold text-navy mb-4 uppercase tracking-wide">Submission Guidelines</h3>
          <ul className="space-y-2.5">
            {SUBMISSION_GUIDELINES.map((g, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        {documents.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
            <h3 className="text-base font-bold text-navy mb-2">Tender Documents</h3>
            <p className="text-gray-500 text-sm mb-5">
              Download the tender package including specifications, terms, and conditions.
            </p>
            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-navy text-sm truncate">
                        {DOC_TYPE_LABELS[doc.type?.toLowerCase()] ?? 'Tender Document'}
                      </p>
                      {doc.name && (
                        <p className="text-xs text-gray-400 truncate">
                          {doc.name}{doc.size ? ` · ${formatBytes(doc.size)}` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-4 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-gold transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-2">
          {isOpen ? (
            <div className="bg-navy rounded-3xl p-8 md:p-10 text-white">
              <FileText className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-3">Ready to Submit a Bid?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Prepare your bid in line with the tender specifications and submit it to our procurement
                office before the closing deadline. Ensure all documents are complete and clearly
                marked with the tender reference number.
              </p>

              <div className="bg-white/10 rounded-2xl p-5 mb-6 text-sm space-y-2">
                <p className="font-semibold text-white mb-3">Procurement Office Contact</p>
                <p className="text-gray-300">📧 info@jumuiyafoundation.org</p>
                <p className="text-gray-300">📞 +256 740 466701</p>
                <p className="text-gray-300">📍 Central, Kampala, Mutungo I, Zone 1A</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
                >
                  Contact Procurement Office <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-center">
              <XCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">
                {tender.status === 'awarded' ? 'Tender Awarded' : 'Tender Closed'}
              </h3>
              <p className="text-gray-600 mb-6">
                {tender.status === 'awarded'
                  ? 'This tender has been awarded to a successful bidder. Thank you to all who submitted.'
                  : 'Submissions for this tender are no longer being accepted.'}
              </p>
              <Link
                href="/tenders"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                View Active Tenders <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </PageTemplate>
  );
}
