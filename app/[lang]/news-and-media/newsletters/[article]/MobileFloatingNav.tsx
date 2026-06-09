'use client'
import React, { useState, useEffect, useRef } from 'react'
import './MobileFloatingNav.css'

interface MobileFloatingNavProps {
  floatingNav: string[]
  availableSections: Set<string>
  navLabels: Record<string, string>
  isUrdu?: boolean
}

const MobileFloatingNav: React.FC<MobileFloatingNavProps> = ({ floatingNav, availableSections, navLabels }) => {
  const [active, setActive] = useState<string>('')
  const [isFixed, setIsFixed] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Mobile-friendly label mapping
  const getMobileLabel = (key: string, originalLabel: string) => {
    const mobileLabels: Record<string, string> = {
      'Karandaaz Events': 'Karandaaz Events',
      'Karandaaz Blogs': 'Karandaaz Blogs',
      'Karandaaz Publications': 'Karandaaz Publications',
      'Know Our Partners': 'Our Partners',
      'News Flash': 'News Flash',
    }

    return mobileLabels[originalLabel] || mobileLabels[key] || originalLabel
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionIds = floatingNav.filter((key) => availableSections.has(key))
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (sectionElements.length === 0) return

    const handleScroll = () => {
      const scrollY = window.scrollY

      // Fixed positioning logic
      if (navRef.current) {
        const navTop = navRef.current.offsetTop
        if (scrollY > navTop) {
          setIsFixed(true)
        } else {
          setIsFixed(false)
        }
      }

      // Active section logic
      let current: string = sectionIds[0]
      for (let i = 0; i < sectionElements.length; i++) {
        const rect = sectionElements[i].getBoundingClientRect()
        if (rect.top <= 120) {
          current = sectionIds[i]
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on load

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [floatingNav, availableSections])

  const handleNavClick = (key: string) => {
    const el = document.getElementById(key)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 50 // 50px offset
      window.scrollTo({ top: y, behavior: 'smooth' })
      window.history.replaceState(null, '', `#${key}`)
    }
  }

  return (
    <div ref={navRef}>
      <nav className={`mobile-floating-nav d-md-none ${isFixed ? 'mobile-floating-nav-fixed' : ''}`}>
        <div className='mobile-floating-nav-container'>
          {floatingNav.map((key) =>
            availableSections.has(key) ? (
              <button
                key={key}
                className={`mobile-floating-nav-item ${active === key ? 'active' : ''}`}
                onClick={() => handleNavClick(key)}
              >
                {getMobileLabel(key, navLabels[key] || key)}
              </button>
            ) : null
          )}
        </div>
      </nav>
    </div>
  )
}

export default MobileFloatingNav
