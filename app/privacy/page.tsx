import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy | Jumuiya Development Foundation',
  description: 'Learn how Jumuiya Development Foundation collects, uses, and protects your personal data.',
};

const LAST_UPDATED = 'June 2026';

export default function PrivacyPage() {
  return (
    <PageTemplate
      title="Privacy Policy"
      description={`How we collect, use, and protect your personal information. Last updated: ${LAST_UPDATED}.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
    >
      <div className="max-w-3xl space-y-10 text-gray-700 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">1. Introduction</h2>
          <p>Jumuiya Development Foundation ("JDF", "we", "us", or "our") is committed to protecting the privacy and personal data of all individuals who interact with our organisation. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, contact us, or engage with our programmes.</p>
          <p>By using our website or services, you consent to the practices described in this policy.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Contact information</strong> — name, email address, phone number, and organisation when you contact us or submit a form.</li>
            <li><strong>Donation data</strong> — payment and transaction information when you make a financial contribution.</li>
            <li><strong>Volunteer & partner data</strong> — background, skills, and application details when you apply to volunteer or partner with us.</li>
            <li><strong>Usage data</strong> — pages visited, time on site, browser type, and referral source collected automatically via analytics tools.</li>
            <li><strong>Communications</strong> — emails, messages, and newsletter subscriptions.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Respond to enquiries and provide requested services</li>
            <li>Process donations and issue tax receipts</li>
            <li>Manage volunteer applications and placements</li>
            <li>Send newsletters and programme updates (with your consent)</li>
            <li>Improve our website and communications</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">4. Data Sharing</h2>
          <p>We do not sell, rent, or trade your personal data. We may share information with trusted third parties only where necessary to deliver our services (e.g. payment processors, email platforms) and only under strict data protection agreements. We may also disclose information where required by law.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">5. Data Retention</h2>
          <p>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Donor and financial records are retained for a minimum of 7 years in line with financial regulations. You may request deletion of your data at any time (see Section 7).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">6. Cookies & Analytics</h2>
          <p>Our website uses cookies and analytics tools (such as Vercel Analytics) to understand how visitors use our site. We use only anonymised, aggregated data. You can control cookie preferences through your browser settings or our consent banner. We do not use advertising cookies or track you across other websites.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing communications at any time</li>
            <li>Lodge a complaint with a relevant data protection authority</li>
          </ul>
          <p>To exercise any of these rights, contact us at <strong>info@jumuiyafoundation.org</strong>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">8. Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The latest version will always be published on this page with the date of last update. Significant changes will be communicated via email or a notice on our website.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">10. Contact Us</h2>
          <p>For any questions or concerns about this Privacy Policy or how we handle your data:</p>
          <div className="bg-navy/5 rounded-xl p-5 text-sm space-y-1">
            <p><strong>Jumuiya Development Foundation</strong></p>
            <p>Kampala, Uganda</p>
            <p>Email: info@jumuiyafoundation.org</p>
            <p>Phone: +256 700 000 000</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
