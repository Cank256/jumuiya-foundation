import { Metadata } from 'next';
import PageTemplate from '@/components/PageTemplate';
import HistoryTimeline from '@/components/HistoryTimeline';

export const metadata: Metadata = {
  title: 'Our History | Jumuiya Development Foundation',
  description: 'Trace the journey of Jumuiya Development Foundation from its roots in a South African leadership training in 2008 to its work across Uganda and beyond today.',
};

export default function HistoryPage() {
  return (
    <PageTemplate
      title="Our History"
      description="A journey rooted in lived experience, guided by community partnership, and driven by a commitment to ethical leadership."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our History' },
      ]}
    >
      {/* Origin story */}
      <div className="max-w-3xl space-y-6 text-gray-700 leading-relaxed mb-16">
        <p>
          Our story begins long before Jumuiya was founded. In 2008, our co-founder, <strong className="text-navy">Moisa Morrison Saidu</strong>, participated in a life-changing six-week leadership training with <em>Initiatives of Change International</em> in South Africa. Alongside young change agents from across the continent, Moisa traveled to schools, universities, and communities, sharing his lived experience of civil war and post-conflict recovery in Sierra Leone.
        </p>
        <p>
          During this journey, he facilitated dialogues and field sessions with students, teachers, prison administrators, political leaders, and community members. Together, they explored some of the most urgent challenges facing young people and societies — HIV/AIDS, drug abuse, teenage pregnancy, xenophobia, youth unemployment, and social exclusion. These conversations explored problems about responsibility, leadership, and the power of personal change.
        </p>
        <p>
          Out of this experience, <strong className="text-navy">Workshop for Africa (W4A)</strong> was born — a Pan-African movement grounded in ethical leadership, accountable citizenship, and community ownership. Moisa carried this vision back home to Sierra Leone, where W4A grew into a platform for co-creating solutions with communities and partners. Over time, it became a "showroom" for collaborative projects, where local voices guide planning, implementation, and learning.
        </p>
        <p>
          In 2020, building on this growing network and shared expertise, W4A expanded its work internationally by founding <strong className="text-navy">STEM Global Inc</strong> in the United States — a 501(c)(3) nonprofit created to support African immigrants in navigating and thriving in their new society. Through STEM education, workforce development, and leadership training, the initiative focuses on creating employment pathways while nurturing a culture of service and community transformation.
        </p>
        <p>
          Each of these chapters — from South Africa to Sierra Leone to the United States — has shaped who we are today. <strong className="text-navy">Jumuiya Development Foundation (JDF)</strong> was born from this journey. Rooted in lived experience, guided by community partnership, and driven by a commitment to ethical leadership, Jumuiya brings together lessons from across continents to support young people, families, and communities in Uganda and beyond.
        </p>
        <p>
          Led by scholar and community development practitioner <strong className="text-navy">Irene Oroma</strong>, JDF's promise to the Uganda community is to learn together, build together, and place communities at the heart of development.
        </p>
      </div>

      {/* Timeline */}
      <HistoryTimeline />
    </PageTemplate>
  );
}
