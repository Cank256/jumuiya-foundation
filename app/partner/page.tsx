import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { Handshake, Globe, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner With Us | Jumuiya Development Foundation',
  description: 'Build a strategic partnership with Jumuiya Development Foundation and co-create lasting change in Ugandan communities.',
};

const PARTNER_TYPES = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Institutional Partners',
    desc: 'International NGOs, government agencies, and multilateral bodies that co-implement programmes or provide technical support.',
    color: 'bg-primary',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Funding Partners',
    desc: 'Foundations, trusts, and grant-making bodies that fund our community-led programmes and capacity-building initiatives.',
    color: 'bg-navy',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Corporate Partners',
    desc: 'Businesses aligned with our values that engage through CSR, employee volunteering, or pro-bono expertise.',
    color: 'bg-gold',
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Community Partners',
    desc: 'Local CBOs, religious organisations, and community groups that work alongside JDF at the grassroots level.',
    color: 'bg-gray-700',
  },
];

const PARTNERSHIP_BENEFITS = [
  'Joint programme design and co-implementation',
  'Access to JDF\'s established community networks in Uganda',
  'Shared learning, evidence, and evaluation findings',
  'Brand visibility and co-branding on publications',
  'Invitations to partner events, forums, and summits',
  'Regular impact reporting and financial accountability',
  'Recognition in annual reports and on our website',
  'Engagement with our global volunteer and diaspora network',
];

const PARTNER_LOGOS = [
  { src: '/images/jdf/partners-logo-01.png', alt: 'Partner 1' },
  { src: '/images/jdf/partners-logo-02.png', alt: 'Partner 2' },
  { src: '/images/jdf/partners-logo-03.png', alt: 'Partner 3' },
  { src: '/images/jdf/partners-logo-04.png', alt: 'Partner 4' },
  { src: '/images/jdf/partners-logo-05.png', alt: 'Partner 5' },
  { src: '/images/jdf/partners-logo-06.png', alt: 'Partner 6' },
];

export default function PartnerPage() {
  return (
    <PageTemplate
      title="Partner With Us"
      description="Build strategic alliances, strengthen collaborations, and mobilise resources for long-term community transformation."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Get Involved', href: '/partner' }, { label: 'Partner With Us' }]}
    >
      <div className="space-y-20">

        {/* Why partner */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-navy">Build Together, Change Together</h2>
            <div className="w-16 h-1 bg-gold" />
            <p>
              JDF's partnership model is built on mutual respect, shared values, and genuine collaboration. We don't just receive support — we co-design, co-implement, and co-learn with our partners. Whether you are an international funder, a local civil society organisation, or a corporate entity with purpose, there is a partnership model that works for you.
            </p>
            <p>
              Our partnerships span education, gender, livelihoods, health, and environmental sustainability. We bring deep community trust, established networks across Uganda, and a track record of ethical, evidence-based programming.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PARTNER_TYPES.map((type, idx) => (
              <div key={idx} className={`${type.color} rounded-2xl p-5 text-white`}>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">{type.icon}</div>
                <div className="font-bold text-sm mb-1">{type.title}</div>
                <p className="text-white/70 text-xs leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">What Partnership Includes</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PARTNERSHIP_BENEFITS.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Current partners */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Our Current Partners</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {PARTNER_LOGOS.map((p, idx) => (
              <div key={idx} className="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="relative w-full h-14 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                  <Image src={p.src} alt={p.alt} fill sizes="15vw" className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership enquiry form */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-navy mb-2">Partnership Enquiry</h2>
          <p className="text-gray-500 mb-8">Tell us about your organisation and how you'd like to work together.</p>
          <form className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="p-name">Your Name <span className="text-red-500">*</span></label>
                <input id="p-name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="p-org">Organisation <span className="text-red-500">*</span></label>
                <input id="p-org" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Organisation name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="p-email">Email Address <span className="text-red-500">*</span></label>
              <input id="p-email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@organisation.org" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="p-type">Partnership Type</label>
              <select id="p-type" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white text-navy">
                <option value="">Select partnership type…</option>
                <option>Institutional Partner</option>
                <option>Funding Partner</option>
                <option>Corporate Partner</option>
                <option>Community Partner</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="p-message">Tell Us More <span className="text-red-500">*</span></label>
              <textarea id="p-message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Describe your organisation, areas of interest, and how you'd like to collaborate…" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition-colors shadow-sm hover:shadow-md">
              <Handshake className="w-5 h-5" /> Submit Enquiry
            </button>
          </form>
        </section>

      </div>
    </PageTemplate>
  );
}
