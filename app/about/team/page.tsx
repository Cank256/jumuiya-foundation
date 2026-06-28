import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team | Jumuiya Development Foundation',
  description: 'Meet the dedicated team behind Jumuiya Development Foundation — experienced community development professionals committed to transforming lives.',
};

const EXECUTIVE_TEAM = [
  {
    name: 'Moisa Morrison Saidu',
    role: 'Co-Founder & Senior International Development Leader',
    image: '/images/jdf/moisa.jpg',
    bio: 'Moisa Saidu is Co-Founder of the Jumuiya Foundation and a senior international development leader with over 18 years of experience designing and delivering high-impact programs across Africa, Asia, Europe, and the United States. His journey began in 2008 at an Initiatives of Change leadership training in South Africa, which inspired him to found Workshop for Africa (W4A) — a Pan-African movement grounded in ethical leadership and community ownership. Moisa brings a deep understanding of post-conflict recovery, youth empowerment, and cross-continental partnership building to everything JDF does.',
    expertise: ['International Development', 'Ethical Leadership', 'Post-Conflict Recovery', 'Youth Empowerment'],
  },
  {
    name: 'Irene Oroma',
    role: 'Co-Founder & Executive Director',
    image: '/images/jdf/irene.jpg',
    bio: 'Irene Oroma is Co-Founder and Executive Director of Jumuiya Development Foundation. She is a scholar, education specialist, and language (TESOL) expert with over 20 years of experience working across Sub-Saharan Africa. Irene leads JDF\'s Uganda operations and holds a deep commitment to community-centred development. Her leadership ensures that communities remain at the heart of every project — learning together, building together, and shaping their own futures.',
    expertise: ['Education & TESOL', 'Community Development', 'Programme Management', 'Gender & Rights'],
  },
];

const CORE_VALUES = [
  { title: 'Ethical Leadership', description: 'We model the values we promote — integrity, accountability, and transparent governance.' },
  { title: 'Accountable Citizenship', description: 'We believe every person has a role to play in shaping their community and society.' },
  { title: 'Rights-Based Development', description: 'We uphold the dignity, rights, and agency of every individual we work with.' },
  { title: 'Collaboration', description: 'We build genuine partnerships grounded in mutual respect and shared goals.' },
  { title: 'Inclusivity', description: 'We prioritise the voices and needs of women, youth, and marginalised groups.' },
  { title: 'Innovation', description: 'We embrace creativity and remain open to new tools and ideas from communities and partners.' },
];

export default function TeamPage() {
  return (
    <PageTemplate
      title="Our Team"
      description="Meet the passionate people driving Jumuiya Development Foundation's mission across Uganda and beyond."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our Team' },
      ]}
    >
      <div className="space-y-20">

        {/* Executive Team */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Executive Team</h2>
          <div className="w-16 h-1 bg-gold mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {EXECUTIVE_TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo */}
                  <div className="relative w-full sm:w-52 h-60 sm:h-auto bg-gray-100 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 208px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mt-1 mb-4">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">{member.bio}</p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        aria-label={`Email ${member.name}`}
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        aria-label={`LinkedIn profile of ${member.name}`}
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expertise tags */}
                <div className="px-6 pb-6 flex flex-wrap gap-2">
                  {member.expertise.map((tag) => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full bio sections */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-navy mb-2">Leadership Profiles</h2>
          <div className="w-16 h-1 bg-gold mb-10" />

          {EXECUTIVE_TEAM.map((member, idx) => (
            <div key={member.name} className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-start ${idx % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
              <div className={`${idx % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className={`md:col-span-2 space-y-4 ${idx % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <div>
                  <h3 className="text-2xl font-bold text-navy">{member.name}</h3>
                  <p className="text-primary font-medium mt-1">{member.role}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {member.expertise.map((tag) => (
                    <span key={tag} className="text-sm bg-navy/5 text-navy px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Core values */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-3">Our Core Values</h2>
          <div className="w-16 h-1 bg-gold mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-4 text-lg">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="bg-navy rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Join Our Team</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            If you would like to work for an organisation making a real impact in communities, we would love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/jobs" className="bg-gold hover:bg-amber-500 text-navy font-semibold px-7 py-3 rounded-full transition-colors">
              View Vacancies
            </a>
            <a href="/contact" className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-full transition-colors">
              Get in Touch
            </a>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}
