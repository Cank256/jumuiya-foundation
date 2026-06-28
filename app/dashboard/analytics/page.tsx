'use client';

import { useState, useEffect } from 'react';
import PageTemplate from '@/components/PageTemplate';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ events: 0, errors: 0 });

  useEffect(() => {
    // This is where we'd fetch the JSON logs securely
    const interval = setInterval(() => {
      // simulate refresh
      console.log('Refreshing dashboard...');
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTemplate
      title="Analytics Dashboard"
      description="Real-time site analytics and error monitoring."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard" }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-navy mb-2">Total Events</h3>
          <p className="text-4xl font-bold text-primary">{stats.events}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-navy mb-2">Total Errors</h3>
          <p className="text-4xl font-bold text-red-600">{stats.errors}</p>
        </div>
      </div>
      <p className="mt-8 text-gray-500 text-sm">Note: Implement authentication before production deployment.</p>
    </PageTemplate>
  );
}