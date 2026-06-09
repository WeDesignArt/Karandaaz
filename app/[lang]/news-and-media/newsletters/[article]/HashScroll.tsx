'use client'

import { useEffect, useRef } from 'react'

function scrollToHash(offset = 50): boolean {
  if (typeof window === 'undefined') return false
  const rawHash = window.location.hash
  if (!rawHash) return false
  const hash = decodeURIComponent(rawHash.replace('#', ''))
  if (!hash) return false
  const el = document.getElementById(hash)
  if (!el) return false
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
  return true
}

export default function HashScroll() {
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Mark as done if user scrolls manually
    const onUserScroll = () => {
      hasScrolledRef.current = true
    }
    window.addEventListener('scroll', onUserScroll, { passive: true })

    // Initial attempts after hydration with retries to handle late content
    const timeouts: number[] = []
    const attempts = [0, 100, 250, 500, 1000]
    attempts.forEach((ms) => {
      const t = window.setTimeout(() => {
        if (!hasScrolledRef.current) {
          const didScroll = scrollToHash(50)
          if (didScroll) hasScrolledRef.current = true
        }
      }, ms)
      timeouts.push(t)
    })

    // Re-run when images load inside main-section (only if not already done)
    const container = document.getElementById('main-section') || document
    const imageHandler = () => {
      if (!hasScrolledRef.current) {
        const didScroll = scrollToHash(50)
        if (didScroll) hasScrolledRef.current = true
      }
    }
    const images = Array.from(container.querySelectorAll('img')) as HTMLImageElement[]
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', imageHandler, { once: true })
      }
    })

    // Observe layout changes in main-section and try limited times (only if not already done)
    const main = document.getElementById('main-section')
    let resizeAttempts = 0
    const ro = main
      ? new ResizeObserver(() => {
          if (!hasScrolledRef.current && resizeAttempts < 5) {
            resizeAttempts += 1
            const didScroll = scrollToHash(50)
            if (didScroll) hasScrolledRef.current = true
          }
        })
      : null
    if (main && ro) ro.observe(main)

    return () => {
      window.removeEventListener('scroll', onUserScroll)
      timeouts.forEach((t) => window.clearTimeout(t))
      images.forEach((img) => img.removeEventListener('load', imageHandler))
      if (ro && main) ro.unobserve(main)
    }
  }, [])

  return null
}
