'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy text-paper p-4 md:p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
      <div className="text-sm md:text-base max-w-4xl">
        We use cookies to improve your experience and track website usage. By clicking "Accept", you agree to our use of cookies according to our <Link href="/privacy" className="text-gold underline hover:text-white transition-colors">Privacy Policy</Link>.
      </div>
      <div className="flex gap-4 shrink-0">
        <button
          onClick={handleDecline}
          className="px-4 py-2 border border-paper rounded-lg hover:bg-paper hover:text-navy transition-colors text-sm font-medium"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium"
        >
          Accept
        </button>
      </div>
    </div>
  );
}