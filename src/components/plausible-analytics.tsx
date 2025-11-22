'use client';

import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';

export default function PlausibleAnalytics() {
  useEffect(() => {
    init({
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!,
      captureOnLocalhost: process.env.NODE_ENV === 'development',
    });
  }, []);

  return null;
}
