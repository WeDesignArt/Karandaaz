// components/GoogleAnalytics.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '../../../lib/gtag'

// Google Analytics component to track page views
export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      pageview(pathname) // Track page view on initial load
    }
  }, [pathname])

  return null // This component doesn't render anything
}
