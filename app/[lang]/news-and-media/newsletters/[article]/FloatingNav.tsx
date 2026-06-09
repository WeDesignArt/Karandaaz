'use client'
import React, { useEffect, useState, useRef } from 'react'
import ShareButtons from '@/[lang]/components/core/share-buttons'

interface FloatingNavProps {
  floatingNav: string[]
  availableSections: Set<string>
  navLabels: Record<string, string>
  isUrdu?: boolean
}

const FloatingNav: React.FC<FloatingNavProps> = ({ floatingNav, availableSections, navLabels, isUrdu }) => {
  const [active, setActive] = useState<string>('')
  const [isFixed, setIsFixed] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const navInitialTop = useRef<number | null>(null)
  const sponsorTop = useRef<number | null>(null)
  const [subsections, setSubsections] = useState<Record<string, { id: string; label: string }[]>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionIds = floatingNav.filter((key) => availableSections.has(key))
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (sectionElements.length === 0) return

    const mainEl = document.getElementById('main-section')
    const sponsorEl = document.getElementById('last-section')

    if (!mainEl || !sponsorEl) return

    // Build subsections map from h4 headings inside each section
    const map: Record<string, { id: string; label: string }[]> = {}
    sectionIds.forEach((id) => {
      const container = document.getElementById(id)
      if (!container) return
      const headings = Array.from(container.querySelectorAll('h4[id]')) as HTMLHeadingElement[]
      if (headings.length > 0) {
        map[id] = headings.map((h) => ({ id: h.id, label: h.textContent || h.id }))
      }
    })
    setSubsections(map)

    // Recalculate sponsorTop when main-section resizes
    const observer = new ResizeObserver(() => {
      sponsorTop.current = sponsorEl.getBoundingClientRect().top + window.scrollY
      // You may want to re-trigger scroll logic here as well
      handleScroll()
    })

    observer.observe(mainEl)

    // Initial calculation
    sponsorTop.current = sponsorEl.getBoundingClientRect().top + window.scrollY

    const handleScroll = () => {
      const scrollY = window.scrollY

      if (navRef.current) {
        if (navInitialTop.current === null) {
          navInitialTop.current = navRef.current.getBoundingClientRect().top + scrollY
        }

        const navBarHeight = navRef.current.offsetHeight > 396 ? navRef.current.offsetHeight : 396
        if (sponsorTop.current !== null) {
          if (scrollY + 100 >= sponsorTop.current - navBarHeight) {
            // Switch to absolute below sponsor section
            setIsFixed(false)
            navRef.current.style.position = 'absolute'
            navRef.current.style.top = `${sponsorTop.current - navBarHeight}px`
          } else {
            // Keep sticky
            navRef.current.style.position = ''
            navRef.current.style.top = ''
            setIsFixed(scrollY > navInitialTop.current - 100)
          }
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
      observer.disconnect()
    }
  }, [floatingNav, availableSections])

  return (
    <div ref={navRef}>
      <nav className={`floating-nav ${isFixed ? ' floating-nav-fixed' : ''}`}>
        <style>{`
          @media (min-width: 992px) {
            .floating-nav-fixed {
              position: fixed;
              top: 100px;
              z-index: 100;
              max-width: 260px;
              padding: 24px 1rem;
              background: #fff;
              border-radius: 12px;
              box-shadow: 0 2px 16px rgba(0,0,0,0.08);
            }
          }
          .floating-nav a.active {
            color: var(--dfagreen, #009966);
            font-weight: bold;
          }
          .floating-nav ul {
            margin-bottom: 0;
          }
          .floating-nav ul.list-unstyled {
            min-height: 202px
          }
          .floating-nav .subsection-list {
            margin-top: 6px;
            margin-bottom: 12px;
            padding-left: 12px;
            border-left: 2px solid #eee;
            display: none;
          }
          .floating-nav .subsection-list li a {
            font-size: 0.9em;
            color: #6c757d;
          }
        `}</style>
        <h4>{isUrdu ? 'اس شمارے میں کیا ہے؟' : "What's in this issue?"}</h4>
        <ul className='list-unstyled'>
          {floatingNav.map((key) =>
            availableSections.has(key) ? (
              <li key={key} className='mb-2'>
                <a
                  href={`#${key}`}
                  className={`tx-grey50${active === key ? ' active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(key)
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 50 // 50px offset
                      window.scrollTo({ top: y, behavior: 'smooth' })
                      window.history.replaceState(null, '', `#${key}`)
                    }
                  }}
                >
                  {navLabels[key] || key}
                </a>
                {Array.isArray(subsections[key]) && subsections[key].length > 0 && (
                  <ul className='list-unstyled subsection-list'>
                    {subsections[key].map((sub) => (
                      <li key={sub.id} className='mb-1'>
                        <a
                          href={`#${sub.id}`}
                          className='tx-grey50'
                          onClick={(e) => {
                            e.preventDefault()
                            const el = document.getElementById(sub.id)
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 50
                              window.scrollTo({ top: y, behavior: 'smooth' })
                              window.history.replaceState(null, '', `#${sub.id}`)
                            }
                          }}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : null
          )}
        </ul>
        <hr className='bg-brgrey my-4'></hr>
        <ShareButtons isUrdu={isUrdu} />
      </nav>
    </div>
  )
}

export default FloatingNav
