import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageTemplateProps {
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
  children: React.ReactNode;
}

export default function PageTemplate({ title, description, breadcrumbs, children }: PageTemplateProps) {
  return (
    <div className="pt-24 lg:pt-32 pb-16 min-h-[70vh]">
      <div className="bg-navy text-white py-12 md:py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4" />}
              </div>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{title}</h1>
          {description && <p className="text-lg text-gray-300 max-w-3xl">{description}</p>}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        {children}
      </div>
    </div>
  );
}