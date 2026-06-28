import PageTemplate from "@/components/PageTemplate";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Section Page",
};

export default function Page() {
  return (
    <PageTemplate 
      title="Section Content" 
      description="Learn more about our institution and what we offer."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Section" }
      ]}
    >
      <div className="prose max-w-none text-navy">
        <p>This is placeholder content which should be replaced by actual client content.</p>
      </div>
    </PageTemplate>
  );
}
