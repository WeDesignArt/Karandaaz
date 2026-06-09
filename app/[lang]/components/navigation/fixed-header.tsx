'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import './fixed-header.css'
// @ts-ignore
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles
import { useParams, usePathname } from 'next/navigation'
import imageSrc from '../../images/navbar-logo.svg'
import { i18n } from '../../../../i18n.config'

export const FixedHeader = () => {
  const pathname = usePathname()
  useEffect(() => {
    const handleRouteChange = () => {
      const navbarCollapse = document.getElementById('navbartoggler')
      if (navbarCollapse && !navbarCollapse.classList.contains('collapsed')) {
        // Manually remove 'show' class to close the navbar
        navbarCollapse.classList.add('collapsed')
      }
    }
    if (pathname) {
      handleRouteChange()
      window.scrollTo(0, 0)
    }
  }, [pathname])
  const params = useParams()
  const lang = params.lang || 'en' // Default to 'en' if lang is undefined
  const alternateLocale = lang === 'en' ? 'ur' : 'en'
  const isUrdu = lang === 'ur'

  const redirectedPathName = (locale: any) => {
    if (!pathname) return '/'

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathname
      return `/${locale}${pathname}`
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathname.split('/')
        const isHome = segments.length === 2
        if (isHome) return '/'

        segments.splice(1, 1)
        return segments.join('/')
      }

      const segments = pathname.split('/')
      segments[1] = locale
      return segments.join('/')
    }
  }

  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <>
      <div className='navbar-mobile-placeholder'></div>
      <nav className='navbar mobile-fixed'>
        <div className='container-fluid py-md-2 px-4'>
          <Link href={isUrdu ? `/${lang}/search` : '/search'}>
            <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.4166 25.375C6.82492 25.375 1.45825 20.0083 1.45825 13.4166C1.45825 6.82498 6.82492 1.45831 13.4166 1.45831C20.0083 1.45831 25.3749 6.82498 25.3749 13.4166C25.3749 20.0083 20.0083 25.375 13.4166 25.375ZM13.4166 3.20831C7.78159 3.20831 3.20825 7.79331 3.20825 13.4166C3.20825 19.04 7.78159 23.625 13.4166 23.625C19.0516 23.625 23.6249 19.04 23.6249 13.4166C23.6249 7.79331 19.0516 3.20831 13.4166 3.20831Z'
                fill='#08628B'
              />
              <path
                d='M25.6666 26.5417C25.4449 26.5417 25.2233 26.46 25.0483 26.285L22.7149 23.9517C22.3766 23.6133 22.3766 23.0533 22.7149 22.715C23.0533 22.3767 23.6133 22.3767 23.9516 22.715L26.2849 25.0483C26.6233 25.3867 26.6233 25.9467 26.2849 26.285C26.1099 26.46 25.8883 26.5417 25.6666 26.5417Z'
                fill='#08628B'
              />
            </svg>
          </Link>
          <a href={isUrdu ? `/${lang}` : '/'}>
            <Image src={imageSrc} width={0} height={0} sizes='100vw' alt='Karandaaz Logo' className='KRN-logo' />
          </a>

          {/* <div className='dropdown language-dropdown'>
          <a
            className={`dropdown-toggle tx-krnblue`}
            href='#'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            ENG <IoIosArrowDown />
          </a>
          <ul className='dropdown-menu dropdown-menu-end'>
            <li>
              <Link className='dropdown-item tx-krnblue' href='/'>
                URDU
              </Link>
            </li>
          </ul>
        </div> */}

          <div className='dropdown language-dropdown'>
            <a
              className='dropdown-toggle tx-krnblue'
              href='#'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {lang === 'en' ? 'English' : 'اردو'} <IoIosArrowDown />
            </a>
            <ul className='dropdown-menu dropdown-menu-end'>
              <li>
                <Link className='dropdown-item tx-krnblue' href={redirectedPathName(alternateLocale)}>
                  {lang === 'en' ? 'اردو' : 'English'}
                </Link>
              </li>
            </ul>
          </div>
          <button
            id='navbartoggler'
            className='navbar-toggler collapsed d-lg-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
      </nav>
    </>
  )
}
