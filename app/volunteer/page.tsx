import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import { Clock, MapPin, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Volunteer | Jumuiya Development Foundation',
  description: 'Join the Jumuiya Development Foundation volunteer network and help transform communities across Uganda.',
};

const ROLES = [
  {
    title: 'Community Facilitator',
    area: 'Education & Skills',
    location: 'Northern / Eastern Uganda',
    commitment: '3–6 months',
    description: 'Facilitate community learning sessions, support literacy programmes, and mentor youth in underserved schools and communities.',
    skills: ['Teaching / facilitation', 'Community engagement', 'Swahili or Luganda a plus'],
  },
  {
    title: 'Gender & Rights Advocate',
    area: 'Gender Empowerment',
    location: 'Kampala & districts',
    commitment: '3 months+',
    description: 'Support our advocacy work on gender-based violence, women\'s rights, and inclusive policy development.',
    skills: ['Advocacy / research', 'Report writing', 'Stakeholder engagement'],
  },
  {
    title: 'Psychosocial Support Worker',
    area: 'Wellbeing',
    location: 'Various districts',
    commitment: '6 months',
    description: 'Provide community-based mental health and wellbeing support under the supervision of trained practitioners.',
    skills: ['Counselling / psychology background', 'Empathy & active listening', 'Community experience'],
  },
  {
    title: 'Communications & Media Volunteer',
    area: 'Organisational',
    location: 'Remote / Kampala',
    commitment: 'Flexible',
    description: 'Help tell JDF\'s story through social media, blog writing, photography, or video content creation.',
    skills: ['Content creation', 'Social media', 'Photography / videography'],
  },
  {
    title: 'Enterprise & Livelihoods Coach',
    area: 'Community Enterprise',
    location: 'Rural Uganda',
    commitment: '3–6 months',
    description: 'Coach community entrepreneurs — particularly women — in business skills, financial literacy, and income-generating activities.',
    skills: ['Business / finance background', 'Coaching & mentoring', 'Patience & cultural sensitivity'],
  },
  {
    title: 'WASH & Nutrition Coordinator',
    area: 'Health',
    location: 'Eastern Uganda',
    commitment: '6 months',
    description: 'Support community health education, backyard gardening projects, and school meal initiatives.',
    skills: ['Public health / nutrition', 'Project coordination', 'Community mobilisation'],
  },
];

const BENEFITS = [
  'Be part of a global community of change-makers',
  'Develop hands-on development and leadership skills',
  'Work alongside experienced practitioners',
  'Receive a certificate of service',
  'Access JDF professional development workshops',
  'Build meaningful cross-cultural relationships',
];

export default function VolunteerPage() {
  return (
    <PageTemplate
      title="Volunteer With Us"
      description="Join a growing network of passionate volunteers helping communities in Uganda build resilience and shape their own futures."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Get Involved', href: '/partner' }, { label: 'Volunteer' }]}
    >
      <div className="space-y-16">

        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">Make a Difference With Your Time</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              Volunteering with JDF means more than just lending a hand — it means becoming part of a community-centred movement for lasting change. Whether you have a week or six months, local knowledge or international experience, there is a place for you in our work.
            </p>
            <p>
              We match volunteers carefully with roles that align with their skills and our community needs. Every placement is supported by our team and guided by our core values of ethical leadership, inclusivity, and accountability.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROLES.map((role, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{role.area}</span>
                  <h3 className="text-xl font-bold text-navy mt-1">{role.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{role.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {role.commitment}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((s) => (
                    <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
                <Link href="/contact" className="mt-auto inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:text-gold transition-colors">
                  Apply for this role <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
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

        {/* Apply CTA */}
        <section className="bg-primary rounded-3xl p-10 text-center text-white">
          <Star className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Volunteer?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Take the first step — send us your details and we will be in touch within 5 business days.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-colors">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
}
