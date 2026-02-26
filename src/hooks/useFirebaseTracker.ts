'use client';

import { useCallback } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export const useFirebaseTracker = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackEvent = useCallback((eventName: string, eventParams?: Record<string, any>) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  }, []);

  const trackButtonClick = useCallback((buttonName: string) => {
    trackEvent('button_click', { button_name: buttonName });
  }, [trackEvent]);

  return { trackEvent, trackButtonClick };
};
