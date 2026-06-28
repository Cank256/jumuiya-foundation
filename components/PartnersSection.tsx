'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const PARTNERS = [
  { name: 'Partner 1', logo: '/images/jdf/partners-logo-01.png' },
  { name: 'Partner 2', logo: '/images/jdf/partners-logo-02.png' },
  { name: 'Partner 3', logo: '/images/jdf/partners-logo-03.png' },
  { name: 'Partner 4', logo: '/images/jdf/partners-logo-04.png' },
  { name: 'Partner 5', logo: '/images/jdf/partners-logo-05.png' },
  { name: 'Partner 6', logo: '/images/jdf/partners-logo-06.png' },
];

export default function PartnersSection() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-navy mb-4">Our Partners</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We build strategic alliances and collaborate with organisations that share our commitment to community transformation and sustainable development.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
        {PARTNERS.map((partner, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="flex items-center justify-center p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div className="relative w-full h-14 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 12vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/partner"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-medium transition-colors shadow-sm hover:shadow-md"
        >
          Become a Partner
        </Link>
      </div>
    </section>
  );
}
