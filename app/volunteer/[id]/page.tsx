'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Share2,
  Star,
} from 'lucide-react';

interface VolunteerRole {
  id: string | number;
  title: string;
  area?: string;
  location?: string;
  commitment?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  skills?: string[] | string;
  benefits?: string;
  application_process?: string;
  apply_here?: string;
  status?: 'active' | 'closed' | string;
}

function parseSkills(skills?: string[] | string): string[] {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  try { return JSON.parse(skills); } catch { return [skills]; }
}

function isHtml(str?: string): boolean {
  return !!str && /<[a-z][\s\S]*>/i.test(str);
}

function RichContent({ html, plain }: { html?: string; plain?: string }) {
  if (!html && !plain) return null;
  if ((html ?? plain) && isHtml(html ?? plain ?? '')) {
    return (
      <div
        className="prose prose-sm max-w-none text-gray-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-navy"
        dangerouslySetInnerHTML={{ __html: html ?? plain ?? '' }}
      />
    );
  }
  return <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plain ?? html}</p>;
}

function Section({ title, html, plain }: { title: string; html?: string; plain?: string }) {
  if (!html && !plain) return null;
  return (
    <section>
      <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      <div className="w-10 h-0.5 bg-gold mb-5" />
      <RichContent html={html} plain={plain} />
    </section>
  );
}

export default function VolunteerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [role, setRole] = useState<VolunteerRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/volunteer/${params.id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setRole(data);
      } catch {
        setError("We couldn't load this volunteer opportunity. It may no longer be available.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchRole();
  }, [params.id]);

  if (loading) {
    return (
      <PageTemplate
        title="Loading…"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer', href: '/volunteer' }, { label: 'Loading…' }]}
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

  if (error || !role) {
    return (
      <PageTemplate
        title="Opportunity Not Found"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer', href: '/volunteer' }, { label: 'Not Found' }]}
      >
        <div className="max-w-lg mx-auto text-center py-16">
          <AlertCircle className="w-14 h-14 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-3">Opportunity Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error ?? "This volunteer role doesn't exist or is no longer accepting applications."}
          </p>
          <button
            onClick={() => router.push('/volunteer')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Volunteer
          </button>
        </div>
      </PageTemplate>
    );
  }

  const isActive = !role.status || role.status === 'active';
  const skills = parseSkills(role.skills);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${role.title} — JDF Volunteer`,
        text: `Volunteer opportunity at Jumuiya Development Foundation: ${role.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageTemplate
      title={role.title}
      description={role.area ? `${role.area} · Jumuiya Development Foundation` : 'Volunteer Opportunity · Jumuiya Development Foundation'}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Volunteer', href: '/volunteer' },
        { label: role.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back + status row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <button
            onClick={() => router.push('/volunteer')}
            className="inline-flex items-center gap-2 text-primary hover:text-gold font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Opportunities
          </button>

          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${
            isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}>
            {isActive
              ? <><CheckCircle className="w-4 h-4" /> Open</>
              : <><XCircle className="w-4 h-4" /> Closed</>}
          </span>
        </div>

        {/* Role overview card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h3 className="text-base font-bold text-navy mb-5">Role Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {role.area && (
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Programme Area</p>
                  <p className="text-navy font-medium text-sm">{role.area}</p>
                </div>
              </div>
            )}
            {role.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Location</p>
                  <p className="text-navy font-medium text-sm">{role.location}</p>
                </div>
              </div>
            )}
            {role.commitment && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Commitment</p>
                  <p className="text-navy font-medium text-sm">{role.commitment}</p>
                </div>
              </div>
            )}
            {skills.length > 0 && (
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Skills & Background</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-10">
          <Section title="About This Role" html={role.description} />
          <Section title="Key Responsibilities" html={role.responsibilities} />
          <Section title="Who We're Looking For" html={role.requirements} />
          <Section title="What You'll Gain" html={role.benefits} />
        </div>

        {/* Application CTA */}
        <div className="mt-12">
          {isActive ? (
            <div className="bg-primary rounded-3xl p-8 md:p-10 text-white">
              <Star className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-3">Ready to Apply?</h3>
              {role.application_process ? (
                <div className="text-white/80 mb-6 prose prose-sm max-w-none [&_p]:text-white/80 [&_li]:text-white/80">
                  <RichContent html={role.application_process} />
                </div>
              ) : (
                <p className="text-white/80 mb-6 leading-relaxed">
                  Take the first step — complete our application and we will be in touch within
                  5 business days to discuss your suitability and next steps.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {role.apply_here ? (
                  <a
                    href={role.apply_here}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-7 py-3 rounded-full transition-colors"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-7 py-3 rounded-full transition-colors"
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
              <h3 className="text-xl font-bold text-navy mb-2">This Role is Closed</h3>
              <p className="text-gray-600 mb-6">
                Applications for this role are no longer being accepted. Browse other opportunities.
              </p>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                View All Opportunities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </PageTemplate>
  );
}
