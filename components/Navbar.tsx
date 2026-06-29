'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

// X (Twitter) icon SVG
const XIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// TikTok icon SVG
const TikTokIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

// Facebook icon SVG
const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const NAVIGATION = {
  "About Us": { items: [
    { label: "Who We Are", href: "/about" },
    { label: "Our History", href: "/about/history" },
    { label: "Our Team", href: "/about/team" },
  ]},
  "What We Do": { items: [
    { label: "Education & Skills", href: "/what-we-do/education" },
    { label: "Psychosocial Support", href: "/what-we-do/psychosocial-support" },
    { label: "Gender Empowerment", href: "/what-we-do/gender-empowerment" },
    { label: "Sustainable Livelihoods", href: "/what-we-do/sustainable-livelihoods" },
    { label: "WASH & Nutrition", href: "/what-we-do/wash-nutrition" },
    { label: "Environmental Sustainability", href: "/what-we-do/environment" },
  ]},
  "Our Impact": { items: [
    { label: "Impact Stories", href: "/impact" },
    { label: "Annual Reports", href: "/impact#annual-reports" },
  ]},
  "Get Involved": { items: [
    { label: "Careers", href: "/jobs" },
    { label: "Tenders", href: "/tenders" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partner With Us", href: "/partner" },
  ]},
};

const TOP_LINKS = [
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 left-0 top-0 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {!isScrolled && (
        <div className="bg-navy text-paper py-2 px-6 lg:px-8 text-sm md:flex justify-between items-center hidden transition-transform">
          <div className="flex gap-4">
            <Link href="/news" className="hover:text-gold transition-colors">News</Link>
            <Link href="/events" className="hover:text-gold transition-colors">Events</Link>
            <Link href="/partner" className="hover:text-gold transition-colors">Partner With Us</Link>
          </div>
          <div className="flex items-center gap-4">
            <span>info@jumuiyafoundation.org</span>
            <span>+256 740 466701</span>
            <span className="w-px h-4 bg-white/20" />
            <a href="https://x.com/jumuiyaug" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-gold transition-colors"><XIcon /></a>
            <a href="https://www.tiktok.com/@jumuiyaug" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold transition-colors"><TikTokIcon /></a>
            <a href="https://facebook.com/share/17tY3dmSVK" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors"><FacebookIcon /></a>
          </div>
        </div>
      )}
      
      <div className={`px-6 lg:px-8 flex justify-between items-center transition-all ${isScrolled ? 'h-16 bg-paper' : 'h-20 bg-paper/90 backdrop-blur-sm'}`}>
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Jumuiya_Logo.png"
            alt="Jumuiya Development Foundation" 
            width={150} 
            height={60}
            className="h-[100px] w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 h-full">
          {Object.entries(NAVIGATION).map(([key, value]) => (
            <div 
              key={key} 
              className="relative h-full flex items-center group"
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 font-medium text-navy hover:text-primary transition-colors">
                {key} <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === key && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-lg p-6 min-w-[200px] animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col gap-3">
                    {value.items.map(item => (
                      <Link key={item.label} href={item.href} className="text-navy hover:text-primary whitespace-nowrap">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {TOP_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="font-medium text-navy hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          
          <button className="text-navy hover:text-primary"><Search className="w-5 h-5" /></button>
          <Link href="/partner" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm hover:shadow-md">
            Support Us
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button><Search className="w-5 h-5 text-navy" /></button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-paper shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="p-4 flex flex-col gap-2">
            {Object.entries(NAVIGATION).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 py-2">
                <button 
                  onClick={() => toggleMobileMenu(key)}
                  className="w-full flex justify-between items-center font-medium text-navy text-lg py-2"
                >
                  {key}
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="pl-4 py-2 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1">
                    {value.items.map(item => (
                      <Link key={item.label} href={item.href} className="text-gray-600 py-1" onClick={() => setMobileMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {TOP_LINKS.map(link => (
              <div key={link.href} className="border-b border-gray-200 py-2">
                <Link href={link.href} className="block font-medium text-navy text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              </div>
            ))}
            <Link href="/partner" onClick={() => setMobileMenuOpen(false)} className="mt-4 text-center bg-primary text-white py-3 rounded-lg font-medium">
              Support Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
