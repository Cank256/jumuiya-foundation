'use client';

import { motion } from 'framer-motion';
import { Flag, Globe, Users, Star, Award, Rocket } from 'lucide-react';

const MILESTONES = [
  {
    year: '2008',
    icon: <Flag className="w-5 h-5" />,
    title: 'The Beginning',
    description:
      'Co-founder Moisa Morrison Saidu participates in a six-week leadership training with Initiatives of Change International in South Africa. Alongside young change agents from across the continent, the foundations of a Pan-African movement take shape.',
    color: 'bg-primary',
  },
  {
    year: '2008',
    icon: <Globe className="w-5 h-5" />,
    title: 'Workshop for Africa (W4A) Founded',
    description:
      'W4A is born — a Pan-African movement grounded in ethical leadership, accountable citizenship, and community ownership. The initiative grows into a platform for co-creating solutions with communities in Sierra Leone and beyond.',
    color: 'bg-navy',
  },
  {
    year: '2008',
    icon: <Users className="w-5 h-5" />,
    title: 'Recognised by the AGDA',
    description:
      'W4A is formally recognised for its community-led approach to development. The organisation grows to over 100 volunteers committed to driving change across communities.',
    color: 'bg-gold',
  },
  {
    year: '2020',
    icon: <Star className="w-5 h-5" />,
    title: "Women's Rights & International Expansion",
    description:
      "Building on its growing network, W4A expands internationally, founding STEM Global Inc in the United States — a 501(c)(3) nonprofit supporting African immigrants through STEM education, workforce development, and leadership training. The foundation deepens its work on women's rights and gender empowerment.",
    color: 'bg-primary',
  },
  {
    year: '2023',
    icon: <Award className="w-5 h-5" />,
    title: 'Jumuiya Development Foundation Established in Uganda',
    description:
      "JDF is formally established in Uganda under the leadership of Irene Oroma, bringing together lessons from South Africa, Sierra Leone, and the United States. The foundation begins operating at the humanitarian-community-development nexus across Uganda.",
    color: 'bg-navy',
  },
  {
    year: '2025',
    icon: <Rocket className="w-5 h-5" />,
    title: 'Global Volunteer Network',
    description:
      "JDF becomes part of a global volunteer movement, expanding its reach and deepening its six core programme areas: Education, Psychosocial Support, WASH & Nutrition, Gender Empowerment, Community Enterprise, and Environmental Sustainability.",
    color: 'bg-gold',
  },
];

export default function HistoryTimeline() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-navy mb-12 text-center">Our Journey</h2>

      {/* Desktop timeline */}
      <div className="hidden md:block relative">
        {/* Centre line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

        <div className="space-y-12">
          {MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Card */}
                <div className={`w-[calc(50%-36px)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className={`text-sm font-bold text-primary mb-1 ${isLeft ? 'text-right' : 'text-left'}`}>{milestone.year}</div>
                    <h3 className="text-lg font-bold text-navy mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Centre dot */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${milestone.color} flex items-center justify-center text-white shadow-lg z-10 flex-shrink-0`}>
                  {milestone.icon}
                </div>

                {/* Empty half */}
                <div className="w-[calc(50%-36px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="md:hidden relative pl-10">
        {/* Left line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-10">
          {MILESTONES.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="relative"
            >
              {/* Dot */}
              <div className={`absolute -left-10 top-5 w-9 h-9 rounded-full ${milestone.color} flex items-center justify-center text-white shadow-md z-10`}>
                {milestone.icon}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="text-xs font-bold text-primary mb-1">{milestone.year}</div>
                <h3 className="text-base font-bold text-navy mb-2">{milestone.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[
          { label: 'Years of Impact', value: '15+' },
          { label: 'Countries Touched', value: '5+' },
          { label: 'Projects Completed', value: '100+' },
          { label: 'Lives Transformed', value: '50,000+' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center bg-navy rounded-2xl py-8 px-4"
          >
            <div className="text-3xl font-bold text-gold mb-2">{item.value}</div>
            <div className="text-gray-300 text-sm">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
