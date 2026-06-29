'use client';

import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  AlertCircle,
  Users,
} from 'lucide-react';

export interface VolunteerRole {
  id: string | number;
  title: string;
  area?: string;
  location?: string;
  commitment?: string;
  description?: string;
  skills?: string[] | string;
  status?: 'active' | 'closed' | string;
}

const BENEFITS = [
  'Be part of a global community of change-makers',
  'Develop hands-on development and leadership skills',
  'Work alongside experienced practitioners',
  'Receive a certificate of service',
  'Access JDF professional development workshops',
  'Build meaningful cross-cultural relationships',
];

function parseSkills(skills?: string[] | string): string[] {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  try { return JSON.parse(skills); } catch { return [skills]; }
}

export default function VolunteerPage() {
  const [roles, setRoles] = useState<VolunteerRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/volunteer');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const active = (data.data ?? data).filter(
          (r: VolunteerRole) => !r.status || r.status === 'active'
        );
        setRoles(active);
      } catch {
        setError("We couldn't load volunteer opportunities right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  return (
    <PageTemplate
      title="Volunteer With Us"
      description="Join a growing network of passionate volunteers helping communities in Uganda build resilience and shape their own futures."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Get Involved', href: '/partner' },
        { label: 'Volunteer' },
      ]}
    >
      <div className="space-y-16">

        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">Make a Difference With Your Time</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              Volunteering with JDF means more than just lending a hand — it means becoming part of a
              community-centred movement for lasting change. Whether you have a week or six months,
              local knowledge or international experience, there is a place for you in our work.
            </p>
            <p>
              We match volunteers carefully with roles that align with their skills and our community
              needs. Every placement is supported by our team and guided by our core values of ethical
              leadership, inclusivity, and accountability.
            </p>
          </div>
          <div className="bg-navy rounded-3xl p-8 text-white space-y-4">
            <h3 className="text-xl font-bold text-gold">Why Volunteers Choose JDF</h3>
            <ul className="space-y-3">
              {BENEFITS.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Roles */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Current Volunteer Opportunities</h2>
          <div className="w-16 h-1 bg-gold mb-10" />

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
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

          {!loading && !error && roles.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <Users className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">No open roles at this time</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                New volunteer opportunities are posted regularly. In the meantime, reach out to
                express your interest.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-gold transition-colors"
              >
                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {!loading && !error && roles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => {
                const skills = parseSkills(role.skills);
                return (
                  <div
                    key={role.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col gap-4"
                  >
                    <div>
                      {role.area && (
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {role.area}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-navy mt-1 group-hover:text-primary transition-colors">
                        {role.title}
                      </h3>
                    </div>
                    {role.description && (
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-3">
                        {role.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      {role.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {role.location}
                        </span>
                      )}
                      {role.commitment && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {role.commitment}
                        </span>
                      )}
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/volunteer/${role.id}`}
                      className="mt-auto inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:text-gold transition-colors"
                    >
                      View & Apply <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">How It Works</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply Online', desc: 'Fill in the volunteer application form with your background and availability.' },
              { step: '02', title: 'Screening Call', desc: 'Our team will schedule a brief call to discuss your interests and our needs.' },
              { step: '03', title: 'Placement Match', desc: 'We match you with a suitable role based on your skills and community need.' },
              { step: '04', title: 'Induction & Start', desc: 'Receive a full induction, meet your team, and begin your volunteer journey.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="text-4xl font-bold text-primary/20 mb-3">{item.step}</div>
                <div className="font-bold text-navy mb-2">{item.title}</div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-3xl p-10 text-center text-white">
          <Star className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Volunteer?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Take the first step — send us your details and we will be in touch within 5 business days.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
}
