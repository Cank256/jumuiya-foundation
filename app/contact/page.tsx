import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Jumuiya Development Foundation',
  description: 'Get in touch with Jumuiya Development Foundation. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <PageTemplate
      title="Contact Us"
      description="Have a question or want to get involved? Reach out and we will get back to you."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Contact Us' },
      ]}
    >
      <div className="space-y-16">

        {/* Contact cards + form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy">Get In Touch</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you want to partner with us, volunteer, make a donation, or simply learn more about our work, we would love to hear from you.
            </p>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Address</div>
                  <div className="text-gray-600 text-sm mt-1">Central, Kampala, Mutungo I, Zone 1A</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Phone</div>
                  <div className="text-gray-600 text-sm mt-1">+256 740 466701</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Email</div>
                  <div className="text-gray-600 text-sm mt-1">jumuiya2@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Office Hours</div>
                  <div className="text-gray-600 text-sm mt-1">Monday – Friday: 8:00 AM – 5:00 PM EAT</div>
                </div>
              </div>
            </div>

            {/* Areas of work callout */}
            <div className="mt-8 bg-navy/5 rounded-2xl p-6 border border-navy/10">
              <h3 className="font-semibold text-navy mb-3">How can we help?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> General enquiries</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> Partnership &amp; collaboration</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> Volunteering opportunities</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> Donations &amp; funding</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> Media &amp; press requests</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-navy mb-6">Send Us a Message</h2>
            <form className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-navy mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy placeholder-gray-400"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-navy mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy placeholder-gray-400"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="organisation" className="block text-sm font-medium text-navy mb-2">
                  Organisation <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy placeholder-gray-400"
                  placeholder="Your organisation"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy bg-white"
                >
                  <option value="">Select a subject…</option>
                  <option value="general">General Enquiry</option>
                  <option value="partnership">Partnership &amp; Collaboration</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donation &amp; Funding</option>
                  <option value="media">Media &amp; Press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-navy placeholder-gray-400 resize-none"
                  placeholder="Tell us how we can help…"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="rounded-3xl overflow-hidden bg-gray-100 h-72 flex items-center justify-center border border-gray-200">
          <div className="text-center text-gray-400">
            <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Map – Kampala, Uganda</p>
            <p className="text-sm mt-1">An embedded Google Map will display here</p>
          </div>
        </div>

      </div>
    </PageTemplate>
  );
}
