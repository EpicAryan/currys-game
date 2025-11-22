'use client';

import { useEffect } from 'react';
import { init as plausible } from '@plausible-analytics/tracker';

export function PlausibleProvider() {
  useEffect(() => {
    plausible({
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'localhost',
    });
  }, []);

  return null;
}
