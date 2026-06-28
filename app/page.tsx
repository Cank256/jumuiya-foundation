import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import PartnersSection from "@/components/PartnersSection";
import ImpactStats from "@/components/ImpactStats";
import StructuredData from "@/components/StructuredData";
import { default as dynamicImport } from "next/dynamic";

const OptimizedBentoGrid = dynamicImport(() => import('@/components/OptimizedBentoGrid'), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NonGovernmentalOrganization",
    "name": "Jumuiya Development Foundation",
    "url": "https://jumuiyafoundation.org",
    "logo": "https://jumuiyafoundation.org/logo.png",
    "description": "Jumuiya Development Foundation operates at the humanitarian-community-development nexus, working with communities, organizations and individuals to co-create ideas and implement impactful projects and initiatives for community transformation."
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <Hero />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-20 space-y-20">
        
        {/* Who We Are */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-navy mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded by community development professionals, Jumuiya Development Foundation (JDF) is an indigenous for-impact non-profit organization. We operate at the humanitarian-community-development nexus, working with communities, organizations and individuals to co-create ideas and implement impactful projects and initiatives for community transformation.
          </p>
        </section>

        <ImpactStats />
        <OptimizedBentoGrid />
        <NewsSection />
        <EventsSection />
        <PartnersSection />
      </div>
    </>
  );
}
