import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';

export const metadata: Metadata = {
  title: 'Terms of Use | Jumuiya Development Foundation',
  description: 'Terms and conditions governing the use of the Jumuiya Development Foundation website.',
};

export default function TermsPage() {
  return (
    <PageTemplate
      title="Terms of Use"
      description="Please read these terms carefully before using our website. Last updated: June 2026."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]}
    >
      <div className="max-w-3xl space-y-10 text-gray-700 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">1. Acceptance of Terms</h2>
          <p>By accessing and using the Jumuiya Development Foundation website ("the Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">2. Use of the Site</h2>
          <p>You may use this Site for lawful purposes only. You must not:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Transmit unsolicited communications or spam</li>
            <li>Attempt to gain unauthorised access to our systems</li>
            <li>Upload or distribute harmful, offensive, or misleading content</li>
            <li>Impersonate JDF or any member of our team</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">3. Intellectual Property</h2>
          <p>All content on this Site — including text, images, logos, graphics, and programme materials — is the property of Jumuiya Development Foundation or its content suppliers and is protected by applicable intellectual property laws.</p>
          <p>You may not reproduce, distribute, or use any content from this Site for commercial purposes without prior written permission from JDF. Non-commercial sharing with proper attribution is permitted.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">4. Donations</h2>
          <p>All donations made through our website are final and non-refundable except where required by law or in exceptional circumstances at JDF's sole discretion. Donations are used to support our community programmes in Uganda and will be allocated at the discretion of JDF leadership in line with our mission.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">5. Third-Party Links</h2>
          <p>Our Site may contain links to third-party websites. These links are provided for convenience only. JDF does not endorse or take responsibility for the content, privacy practices, or accuracy of any third-party sites.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">6. Disclaimer of Warranties</h2>
          <p>The Site is provided "as is" without warranties of any kind, express or implied. JDF does not warrant that the Site will be available, error-free, or free from harmful components. We reserve the right to modify or discontinue the Site at any time without notice.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, JDF shall not be liable for any indirect, incidental, or consequential damages arising from your use of this Site or inability to use it.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">8. Governing Law</h2>
          <p>These Terms are governed by the laws of Uganda. Any disputes shall be subject to the exclusive jurisdiction of the courts of Uganda.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">9. Changes to These Terms</h2>
          <p>We may revise these Terms at any time. The current version will always be published on this page. Your continued use of the Site after changes are posted constitutes your acceptance of the revised terms.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">10. Contact</h2>
          <div className="bg-navy/5 rounded-xl p-5 text-sm space-y-1">
            <p><strong>Jumuiya Development Foundation</strong></p>
            <p>Central, Kampala, Mutungo I, Zone 1A</p>
            <p>Email: jumuiya2@gmail.com</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
