import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import { AlertTriangle, Shield, Lock, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Report Abuse | Jumuiya Development Foundation',
  description: 'Report safeguarding concerns, abuse, or misconduct involving Jumuiya Development Foundation.',
};

export default function ReportAbusePage() {
  return (
    <PageTemplate
      title="Report Abuse or Misconduct"
      description="JDF is committed to safeguarding the people we work with. Use this page to report any concern in confidence."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Report Abuse' }]}
    >
      <div className="max-w-3xl space-y-12">

        {/* Intro */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 space-y-1">
            <div className="font-bold text-base">If someone is in immediate danger, call emergency services (999 or your local equivalent) immediately.</div>
            <div>This form is not monitored 24/7. For urgent safeguarding concerns, please contact a local authority.</div>
          </div>
        </div>

        {/* Commitment */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-navy">Our Safeguarding Commitment</h2>
          <div className="w-14 h-1 bg-gold" />
          <p>Jumuiya Development Foundation has a zero-tolerance policy for abuse, exploitation, and any form of misconduct. This includes physical, sexual, emotional, or financial abuse; harassment; discrimination; and any behaviour that puts the safety, dignity, or wellbeing of community members, beneficiaries, staff, or volunteers at risk.</p>
          <p>We take every report seriously. All reports are treated confidentially, investigated promptly, and actioned in accordance with our Safeguarding Policy and applicable law.</p>
        </section>

        {/* Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <Lock className="w-5 h-5" />, title: 'Confidential', desc: 'Your identity will be protected throughout the process unless disclosure is legally required.' },
            { icon: <Shield className="w-5 h-5" />, title: 'Safe', desc: 'No retaliation against anyone who raises a concern in good faith.' },
            { icon: <Eye className="w-5 h-5" />, title: 'Accountable', desc: 'Every report is logged, reviewed, and responded to by our leadership team.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">{item.icon}</div>
              <div className="font-bold text-navy mb-1 text-sm">{item.title}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* What to report */}
        <section className="space-y-3 text-gray-700">
          <h2 className="text-xl font-bold text-navy">What Can Be Reported</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
            <li>Physical, sexual, emotional, or financial abuse by JDF staff, volunteers, or partners</li>
            <li>Exploitation of community members or beneficiaries</li>
            <li>Harassment, discrimination, or bullying in any form</li>
            <li>Fraud, bribery, or corruption involving JDF resources</li>
            <li>Child safeguarding concerns</li>
            <li>Misconduct that violates JDF's Code of Conduct</li>
            <li>Misuse of donor funds or programme resources</li>
          </ul>
        </section>

        {/* Report form */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-navy mb-2">Submit a Report</h2>
          <p className="text-gray-500 text-sm mb-6">You may report anonymously. Fields marked with * are required to process your report effectively.</p>
          <form className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="ra-name">Your Name <span className="text-gray-400 font-normal">(optional)</span></label>
                <input id="ra-name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Leave blank to report anonymously" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="ra-email">Email <span className="text-gray-400 font-normal">(optional)</span></label>
                <input id="ra-email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="For follow-up only" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="ra-type">Type of Concern <span className="text-red-500">*</span></label>
              <select id="ra-type" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white text-navy">
                <option value="">Select type of concern…</option>
                <option>Physical abuse</option>
                <option>Sexual abuse or exploitation</option>
                <option>Emotional or psychological abuse</option>
                <option>Financial abuse or fraud</option>
                <option>Child safeguarding concern</option>
                <option>Harassment or discrimination</option>
                <option>Misconduct by staff or volunteer</option>
                <option>Misuse of resources</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="ra-details">Details of the Incident or Concern <span className="text-red-500">*</span></label>
              <textarea id="ra-details" required rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Please describe what happened, when, where, and who was involved. Include as much detail as possible." />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2" htmlFor="ra-location">Location / Programme Area <span className="text-gray-400 font-normal">(if known)</span></label>
              <input id="ra-location" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="e.g. Gulu district, Youth Leadership Programme" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-colors shadow-sm">
              <AlertTriangle className="w-4 h-4" /> Submit Report
            </button>
            <p className="text-xs text-gray-400 text-center">All reports are received by JDF's safeguarding lead and treated with strict confidentiality.</p>
          </form>
        </section>

        {/* Direct contact */}
        <section className="space-y-3 text-gray-700">
          <h2 className="text-xl font-bold text-navy">Direct Safeguarding Contact</h2>
          <p className="text-sm">If you would prefer to report directly to a person, you can contact our safeguarding lead:</p>
          <div className="bg-navy/5 rounded-xl p-5 text-sm space-y-1">
            <p><strong>Email:</strong> safeguarding@jumuiyafoundation.org</p>
            <p><strong>Phone:</strong> +256 700 000 000</p>
            <p className="text-gray-500 text-xs pt-1">Alternatively, concerns about JDF can also be raised with the relevant national safeguarding or child protection authority in Uganda.</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
