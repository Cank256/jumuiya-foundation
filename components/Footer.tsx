import Link from 'next/link';
import Image from 'next/image';

// X (Twitter) icon
const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// TikTok icon
const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

// Facebook icon
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const SOCIAL = [
  { icon: <XIcon />, href: 'https://x.com/jumuiyaug', label: 'X' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@jumuiyaug', label: 'TikTok' },
  { icon: <FacebookIcon />, href: 'https://facebook.com/share/17tY3dmSVK', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-paper pt-16 pb-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="mb-2">
            <Image
              src="/images/Jumuiya_Logo.png"
              alt="Jumuiya Development Foundation"
              width={160}
              height={54}
              className="object-contain h-[100px] w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">Jumuiya Development Foundation operates at the humanitarian-community-development nexus, empowering communities for lasting transformation.</p>
          <div className="flex gap-3 mt-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-gold transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-white mb-2 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-gold">Quick Links</h3>
          <Link href="/about" className="text-gray-300 hover:text-gold transition-colors text-sm">About Us</Link>
          <Link href="/what-we-do" className="text-gray-300 hover:text-gold transition-colors text-sm">What We Do</Link>
          <Link href="/impact" className="text-gray-300 hover:text-gold transition-colors text-sm">Our Impact</Link>
          <Link href="/impact#annual-reports" className="text-gray-300 hover:text-gold transition-colors text-sm">Annual Reports</Link>
          <Link href="/news" className="text-gray-300 hover:text-gold transition-colors text-sm">News</Link>
          <Link href="/events" className="text-gray-300 hover:text-gold transition-colors text-sm">Events</Link>
          <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors text-sm">Contact Us</Link>
        </div>

        {/* Get Involved */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-white mb-2 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-gold">Get Involved</h3>
          <Link href="/jobs" className="text-gray-300 hover:text-gold transition-colors text-sm">Careers</Link>
          <Link href="/tenders" className="text-gray-300 hover:text-gold transition-colors text-sm">Tenders</Link>
          <Link href="/donate" className="text-gray-300 hover:text-gold transition-colors text-sm">Donate / Support</Link>
          <Link href="/volunteer" className="text-gray-300 hover:text-gold transition-colors text-sm">Volunteer With Us</Link>
          <Link href="/partner" className="text-gray-300 hover:text-gold transition-colors text-sm">Become a Partner</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-white mb-2 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-gold">Contact Us</h3>
          <p className="text-gray-300 text-sm">Central, Kampala, Mutungo I, Zone 1A</p>
          <p className="text-gray-300 text-sm mt-1">📞 +256 740 466701</p>
          <p className="text-gray-300 text-sm">✉️ info@jumuiyafoundation.org</p>
          <p className="text-gray-300 text-sm">✉️ jumuiya2@gmail.com</p>
          <Link href="/contact" className="mt-3 inline-block bg-primary hover:bg-gold text-white text-xs font-medium px-4 py-2 rounded-full transition-colors w-fit">
            Send a Message
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Jumuiya Development Foundation. All rights reserved.</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Use</Link>
          <Link href="/accessibility" className="hover:text-gold transition-colors">Accessibility</Link>
          <Link href="/report-abuse" className="hover:text-gold transition-colors">Report Abuse</Link>
        </div>
      </div>
    </footer>
  );
}
