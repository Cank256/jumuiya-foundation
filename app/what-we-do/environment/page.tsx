import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Sun, TreePine, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Environmental Sustainability & Climate Education | Jumuiya Development Foundation',
  description: 'JDF promotes community resilience to climate change through conservation, sustainable agriculture, and environmental education.',
};

export default function EnvironmentPage() {
  return (
    <PageTemplate
      title="Environmental Sustainability & Climate Education"
      description="Promote community resilience to climate change through conservation of natural resources, sustainable agriculture, and environmental education."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What We Do', href: '/what-we-do' }, { label: 'Environment' }]}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy">Our Approach</h2>
            <div className="w-14 h-1 bg-gold" />
            <p>Climate change is one of the greatest threats facing communities in Uganda today. JDF works to equip communities with the knowledge, skills, and resources to adapt to and mitigate the impacts of climate change — while protecting the natural environment on which they depend.</p>
            <p>We promote sustainable land and resource management, community-based climate education, and nature-based solutions that enhance food security and ecological resilience in equal measure.</p>
          </div>
          <div className="relative h-72 rounded-3xl overflow-hidden bg-gray-100">
            <Image src="/images/jdf/what-we-do-06.jpg" alt="Environmental sustainability" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Leaf className="w-5 h-5" />, title: 'Conservation', desc: 'Protecting and restoring land, water, fauna, and flora through community-led stewardship.' },
            { icon: <Sun className="w-5 h-5" />, title: 'Climate Education', desc: 'Equipping communities with knowledge to understand and respond to climate change.' },
            { icon: <TreePine className="w-5 h-5" />, title: 'Sustainable Agriculture', desc: 'Promoting agro-ecological farming practices that protect soil and food security.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">{item.icon}</div>
              <div className="font-bold text-navy mb-2">{item.title}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="font-bold text-navy text-xl mb-5">Key Activities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Community tree planting and reforestation', 'Climate change awareness workshops', 'Sustainable agriculture and agroforestry training', 'Wetland and water source protection initiatives', 'Renewable energy awareness campaigns', 'Youth environmental clubs in schools'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/what-we-do" className="inline-flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors"><ArrowRight className="w-4 h-4 rotate-180" /> All Programmes</Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors">Get Involved <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </PageTemplate>
  );
}
