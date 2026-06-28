'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Use a loading skeleton for critical UI layout
const LoadingCard = () => (
  <div className="bg-gray-200 animate-pulse rounded-2xl h-64 lg:h-80 w-full"></div>
);

// We define our features outside so we can render skeletons correctly
const featuresLayout = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2'
];

// Dynamically import the Heavy Bento Grid to avoid blocking render
const DynamicBentoGrid = dynamic(() => import('./BentoGrid'), {
  ssr: true,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
      {featuresLayout.map((colSpan, idx) => (
         <div key={idx} className={`${colSpan}`}>
           <LoadingCard />
         </div>
      ))}
    </div>
  )
});

export default function OptimizedBentoGrid() {
  return (
    <Suspense fallback={
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
         <div className="md:col-span-2"><LoadingCard /></div>
         <div className="md:col-span-1"><LoadingCard /></div>
         <div className="md:col-span-1"><LoadingCard /></div>
         <div className="md:col-span-2"><LoadingCard /></div>
       </div>
    }>
      <DynamicBentoGrid />
    </Suspense>
  );
}
