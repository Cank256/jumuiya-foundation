import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import { Heart, Shield, RefreshCw, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Donate | Jumuiya Development Foundation',
  description: 'Support Jumuiya Development Foundation with a donation and help empower communities across Uganda.',
};

const TIERS = [
  { amount: '$25', label: 'Community Supporter', desc: 'Provides learning materials for one child for a month.' },
  { amount: '$50', label: 'Change Maker', desc: 'Funds a community health session for 10 people.' },
  { amount: '$100', label: 'Impact Builder', desc: 'Supports a week of psychosocial counselling for youth.' },
  { amount: '$250', label: 'Transformation Partner', desc: 'Helps train a woman entrepreneur to launch her business.' },
  { amount: '$500', label: 'Community Champion', desc: 'Sponsors a full youth leadership workshop for 25 participants.' },
  { amount: 'Custom', label: 'Your Own Amount', desc: 'Every dollar makes a difference, no matter the size.' },
];

const WHY = [
  { icon: <Shield className="w-5 h-5" />, title: 'Transparent & Accountable', desc: 'We publish annual reports and detailed financial statements.' },
  { icon: <Users className="w-5 h-5" />, title: 'Community-Led', desc: 'Funds go directly to community-driven programmes in Uganda.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'Sustainable Impact', desc: 'We build long-term capacity, not dependency.' },
  { icon: <Heart className="w-5 h-5" />, title: 'Locally Rooted', desc: 'JDF is an indigenous organisation led by Ugandan practitioners.' },
];

export default function DonatePage() {
  return (
    <PageTemplate
      title="Donate & Support"
      description="Your generosity helps communities in Uganda build resilience, access education, and shape their own futures."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Get Involved', href: '/partner' }, { label: 'Donate' }]}
    >
      <div className="space-y-16">

        {/* Why give */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-navy">Why Give to JDF?</h2>
            <div className="w-16 h-1 bg-gold" />
            <p className="text-gray-600 leading-relaxed">
              Jumuiya Development Foundation works at the intersection of humanitarian response and long-term community development. When you donate, you are investing in communities — not just projects. Every shilling and dollar is channelled through locally-trusted networks to reach those who need it most.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in communities leading their own change. Your support gives them the tools, training, and confidence to do exactly that.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {WHY.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div className="font-bold text-navy mb-1 text-sm">{item.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Donation tiers */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Choose Your Impact</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-7 border flex flex-col gap-3 transition-all hover:shadow-lg ${idx === 4 ? 'bg-navy text-white border-navy' : 'bg-white border-gray-100 shadow-sm'}`}
              >
                <div className={`text-3xl font-bold ${idx === 4 ? 'text-gold' : 'text-primary'}`}>{tier.amount}</div>
                <div className={`font-semibold text-lg ${idx === 4 ? 'text-white' : 'text-navy'}`}>{tier.label}</div>
                <p className={`text-sm leading-relaxed flex-grow ${idx === 4 ? 'text-gray-300' : 'text-gray-500'}`}>{tier.desc}</p>
                <button
                  className={`mt-2 w-full py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    idx === 4
                      ? 'bg-gold hover:bg-amber-500 text-navy'
                      : 'bg-primary/10 hover:bg-primary hover:text-white text-primary'
                  }`}
                >
                  {tier.amount === 'Custom' ? 'Enter Amount' : `Give ${tier.amount}`}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Donation form placeholder */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-navy mb-6">Make a Donation</h2>
          <form className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="donor-first">First Name</label>
                <input id="donor-first" type="text" autoComplete="given-name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your first name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="donor-last">Last Name</label>
                <input id="donor-last" type="text" autoComplete="family-name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your last name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="donor-email">Email Address</label>
              <input id="donor-email" type="email" autoComplete="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="donor-amount">Donation Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input id="donor-amount" type="number" min="1" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-3">Frequency</label>
              <div className="flex gap-3">
                {['One-time', 'Monthly', 'Annually'].map((f) => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="frequency" value={f.toLowerCase()} className="accent-primary" defaultChecked={f === 'One-time'} />
                    <span className="text-sm text-navy">{f}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="donor-message">Dedication or Message <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea id="donor-message" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="In memory of, in honour of, or a note to our team…" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-sm hover:shadow-md">
              <Heart className="w-5 h-5" /> Donate Securely
            </button>
            <p className="text-xs text-gray-400 text-center">Your donation is processed securely. JDF is a registered non-profit. Contact us for tax receipt information.</p>
          </form>
        </section>

        {/* Other ways to give */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Other Ways to Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Volunteer', desc: 'Give your time and skills to our programmes.', href: '/volunteer' },
              { label: 'Partner With Us', desc: 'Form a strategic partnership with JDF.', href: '/partner' },
              { label: 'Fundraise', desc: 'Start your own fundraiser in support of JDF.', href: '/contact' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group bg-primary/5 hover:bg-primary rounded-2xl p-6 border border-primary/10 transition-all">
                <div className="font-bold text-navy group-hover:text-white text-lg mb-1">{item.label}</div>
                <p className="text-gray-500 group-hover:text-white/80 text-sm">{item.desc}</p>
                <ArrowRight className="w-4 h-4 text-primary group-hover:text-white mt-3 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
