'use client';

import dynamic from 'next/dynamic';

const PlausibleAnalytics = dynamic(
  () => import('./plausible-analytics'),
  { ssr: false }
);

export default function AnalyticsWrapper() {
  return <PlausibleAnalytics />;
}
