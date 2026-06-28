import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility | Jumuiya Development Foundation',
  description: 'Our commitment to making the Jumuiya Development Foundation website accessible to everyone.',
};

export default function AccessibilityPage() {
  return (
    <PageTemplate
      title="Accessibility Statement"
      description="Jumuiya Development Foundation is committed to making this website accessible to all users, regardless of ability or technology."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
    >
      <div className="max-w-3xl space-y-10 text-gray-700 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Our Commitment</h2>
          <p>Jumuiya Development Foundation is committed to ensuring that our website is accessible to everyone — including people with visual, auditory, motor, or cognitive disabilities. We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA as a standard for our digital content.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Current Accessibility Features</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Semantic HTML structure with proper heading hierarchy</li>
            <li>Alt text provided for all meaningful images</li>
            <li>Keyboard navigable interface</li>
            <li>Sufficient colour contrast ratios throughout the site</li>
            <li>Descriptive link text and button labels</li>
            <li>Responsive design that works across devices and screen sizes</li>
            <li>Form fields with associated labels</li>
            <li>Skip navigation functionality for keyboard users</li>
            <li>No content that flashes more than three times per second</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Known Limitations</h2>
          <p>While we aim for full accessibility compliance, some older content and third-party embedded components may not fully meet WCAG 2.1 AA standards. We are actively working to identify and address these issues. If you encounter a barrier, please let us know (see below).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Browser & Assistive Technology Compatibility</h2>
          <p>This website is designed to be compatible with modern browsers and common assistive technologies including:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Keyboard-only navigation</li>
            <li>Browser zoom up to 200% without loss of content</li>
            <li>High contrast and dark modes</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">How to Request Content in an Accessible Format</h2>
          <p>If you need any information or content from our website in an alternative format — such as large print, easy read, audio, or another language — please contact us and we will do our best to accommodate your request within 10 working days.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Feedback & Contact</h2>
          <p>We welcome feedback on the accessibility of our website. If you experience any barriers or would like to report an accessibility issue, please contact us:</p>
          <div className="bg-navy/5 rounded-xl p-5 text-sm space-y-1">
            <p><strong>Email:</strong> info@jumuiyafoundation.org</p>
            <p><strong>Phone:</strong> +256 700 000 000</p>
            <p><strong>Subject line:</strong> Accessibility Feedback</p>
          </div>
          <p>We aim to respond to all accessibility enquiries within 5 business days.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Ongoing Improvements</h2>
          <p>This accessibility statement was last reviewed in June 2026. We regularly review our website and accessibility features, and we are committed to continuous improvement. Our development team conducts periodic accessibility audits using both automated tools and manual testing with assistive technologies.</p>
        </section>

        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
          <p className="text-sm text-gray-600">
            For urgent accessibility assistance or to report a critical issue, please{' '}
            <Link href="/contact" className="text-primary font-medium hover:text-gold transition-colors">contact us directly</Link>.
          </p>
        </div>

      </div>
    </PageTemplate>
  );
}
