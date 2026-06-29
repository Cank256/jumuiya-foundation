'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Building2,
  User,
  Users,
  DollarSign,
  Share2,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Job {
  id: string | number;
  uuid: string;
  title: string;
  department?: string;
  employment_type?: string;
  location?: string;
  salary_range?: string;
  application_deadline?: string;
  reports_to?: string;
  supervises_who?: string;
  description?: string;
  purpose_of_role?: string;
  responsibilities?: string;
  requirements?: string;
  core_competencies?: string;
  application_requirements?: string;
  application_process?: string;
  disclaimer?: string;
  apply_here?: string;
  has_document?: boolean;
  document_download_url?: string;
  document_name?: string;
  formatted_file_size?: string;
  status: 'active' | 'closed' | string;
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  internship: 'Internship',
  consultancy: 'Consultancy',
};

function RichContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm max-w-none text-gray-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-navy [&_h4]:font-bold [&_h4]:text-navy"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Section({ title, html, plain }: { title: string; html?: string; plain?: string }) {
  if (!html && !plain) return null;
  return (
    <section>
      <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      <div className="w-10 h-0.5 bg-gold mb-5" />
      {html ? <RichContent html={html} /> : <p className="text-gray-700 leading-relaxed">{plain}</p>}
    </section>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setJob(data);
      } catch {
        setError("We couldn't load this position. It may have been removed or is no longer available.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchJob();
  }, [params.id]);

  if (loading) {
    return (
      <PageTemplate
        title="Loading…"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/jobs' }, { label: 'Loading…' }]}
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

  if (error || !job) {
    return (
      <PageTemplate
        title="Position Not Found"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/jobs' }, { label: 'Not Found' }]}
      >
        <div className="max-w-lg mx-auto text-center py-16">
          <AlertCircle className="w-14 h-14 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-3">Position Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error ?? "This job posting doesn't exist or may have already been closed."}
          </p>
          <button
            onClick={() => router.push('/jobs')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </button>
        </div>
      </PageTemplate>
    );
  }

  const deadline = job.application_deadline ? new Date(job.application_deadline) : null;
  const deadlineEndOfDay = deadline ? new Date(new Date(deadline).setHours(23, 59, 59, 999)) : null;
  const isExpired = deadlineEndOfDay ? deadlineEndOfDay < new Date() : false;
  const isActive = job.status === 'active' && !isExpired;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} — Jumuiya Development Foundation`,
        text: `Career opportunity at JDF: ${job.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageTemplate
      title={job.title}
      description={job.department ? `${job.department} · Jumuiya Development Foundation` : 'Jumuiya Development Foundation'}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Careers', href: '/jobs' },
        { label: job.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back + status row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <button
            onClick={() => router.push('/jobs')}
            className="inline-flex items-center gap-2 text-primary hover:text-gold font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Positions
          </button>

          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${
            isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}>
            {isActive
              ? <><CheckCircle className="w-4 h-4" /> Open</>
              : <><XCircle className="w-4 h-4" /> Closed</>}
          </span>
        </div>

        {/* Overview card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h3 className="text-base font-bold text-navy mb-5">Position Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {job.department && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Department</p>
                  <p className="text-navy font-medium text-sm">{job.department}</p>
                </div>
              </div>
            )}
            {job.employment_type && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Employment Type</p>
                  <p className="text-navy font-medium text-sm capitalize">
                    {TYPE_LABELS[job.employment_type] ?? job.employment_type}
                  </p>
                </div>
              </div>
            )}
            {job.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Location</p>
                  <p className="text-navy font-medium text-sm">{job.location}</p>
                </div>
              </div>
            )}
            {job.salary_range && (
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Salary Range</p>
                  <p className="text-navy font-medium text-sm">{job.salary_range}</p>
                </div>
              </div>
            )}
            {deadline && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Application Deadline</p>
                  <p className={`font-medium text-sm ${isExpired ? 'text-red-600' : 'text-navy'}`}>
                    {deadline.toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {isExpired && ' (Expired)'}
                  </p>
                </div>
              </div>
            )}
            {job.reports_to && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Reports To</p>
                  <p className="text-navy font-medium text-sm">{job.reports_to}</p>
                </div>
              </div>
            )}
            {job.supervises_who && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Supervises</p>
                  <p className="text-navy font-medium text-sm">{job.supervises_who}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-10">
          <Section title="Job Description" html={job.description} />
          <Section title="Purpose of the Role" html={job.purpose_of_role} />
          <Section title="Key Responsibilities" html={job.responsibilities} />
          <Section title="Qualifications & Experience" html={job.requirements} />
          <Section title="Core Competencies" html={job.core_competencies} />
          <Section title="Application Requirements" html={job.application_requirements} />
        </div>

        {/* Document download */}
        {job.has_document && job.document_download_url && (
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
              PDF
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-navy mb-1">Full Job Description Available</h4>
              <p className="text-gray-600 text-sm mb-3">
                Download the complete job description for detailed role information.
                {job.document_name && <span className="ml-1 text-gray-400">({job.document_name}{job.formatted_file_size ? ` · ${job.formatted_file_size}` : ''})</span>}
              </p>
              <a
                href={job.document_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-gold transition-colors"
              >
                Download Document <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        {job.disclaimer && (
          <div className="mt-10 bg-gray-50 border-l-4 border-gray-300 rounded-r-2xl p-6">
            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Disclaimer</h4>
            <RichContent html={job.disclaimer} />
          </div>
        )}

        {/* Application CTA */}
        <div className="mt-12">
          {isActive ? (
            <div className="bg-navy rounded-3xl p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Apply?</h3>
              {job.application_process ? (
                <div className="text-gray-300 mb-6 [&_p]:text-gray-300 [&_li]:text-gray-300 prose prose-sm max-w-none">
                  <RichContent html={job.application_process} />
                </div>
              ) : (
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Submit your application with your CV, a tailored cover letter, and any relevant
                  certificates to our HR team. We look forward to hearing from you.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {job.apply_here ? (
                  <a
                    href={job.apply_here}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors"
                  >
                    Apply via Contact Form <ArrowRight className="w-4 h-4" />
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
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-center">
              <XCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">This Position is Closed</h3>
              <p className="text-gray-600 mb-6">
                Applications for this role are no longer being accepted. Browse our other open positions.
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                View All Positions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </PageTemplate>
  );
}
