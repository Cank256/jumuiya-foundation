import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const SOCIAL = [
  { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/jumuiyafoundation', label: 'Facebook' },
  { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com/jumuiyadev', label: 'X / Twitter' },
  { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/jumuiyafoundation', label: 'Instagram' },
  { icon: <Youtube className="w-4 h-4" />, href: 'https://youtube.com/@jumuiyafoundation', label: 'YouTube' },
  { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/company/jumuiya-development-foundation', label: 'LinkedIn' },
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
              className="object-contain h-10 w-auto brightness-0 invert"
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
          <Link href="/donate" className="text-gray-300 hover:text-gold transition-colors text-sm">Donate / Support</Link>
          <Link href="/volunteer" className="text-gray-300 hover:text-gold transition-colors text-sm">Volunteer With Us</Link>
          <Link href="/partner" className="text-gray-300 hover:text-gold transition-colors text-sm">Become a Partner</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-white mb-2 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-gold">Contact Us</h3>
          <p className="text-gray-300 text-sm">Kampala, Uganda, East Africa</p>
          <p className="text-gray-300 text-sm mt-1">📞 +256 700 000 000</p>
          <p className="text-gray-300 text-sm">✉️ info@jumuiyafoundation.org</p>
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
