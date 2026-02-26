'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Log "page_view" explicitly on route navigation
    if (analytics && pathname) {
      logEvent(analytics, 'page_view', {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null // Komponen ini tidak me-render apa pun di UI
}
