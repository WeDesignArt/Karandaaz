'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { NavDropdown } from './nav-dropdown'
import { OutlinedButton } from '../core/button'
import './nav-header.css'
import {
  aboutUrl,
  boardVisionariesUrl,
  capitalDirectInvestmentUrl,
  capitalGreenInvestmentUrl,
  capitalStrategicInvestmentUrl,
  capitalWholesaleInvestmentUrl,
  careersUrl,
  contactUrl,
  digitalPolicyUrl,
  digitalPrivateSectorEngagementsUrl,
  digitalPublicInfrastructureUrl,
  digitalPublicSectorEngagementsUrl,
  digitalResearchUrl,
  digitalsocialProtectionInterventionsUrl,
  digitalWomenEconomicDigitalInclusionInitiativeUrl,
  innovationChallengeFundUrl,
  innovationWomenVenturesUrl,
  newsmediaMediaUrl,
  newsmediaNewsletterUrl,
  newsmediaPressUrl,
  newsmediaStoriesUrl,
  newsmediaUrl,
  peopleAtKarandaazUrl,
  portalUrl,
  procurementUrl,
  researchBlogsUrl,
  researchPublicationsUrl,
  researchChallengeRoundsUrl,
  csrAndOutreachUrl,
} from '../../../../utils/urls'
import { i18n } from '../../../../i18n.config'

export const NavHeader = ({ trans, lang }: any) => {
  const pathname = usePathname()
  const alternateLocale = lang === 'en' ? 'ur' : 'en'
  const [isFixed, setIsFixed] = useState(false)

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
  // This will close the navbar on route change
  useEffect(() => {
    const handleRouteChange = () => {
      const navbarCollapse = document.getElementById('navbarTogglerDemo02')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Manually remove 'show' class to close the navbar
        navbarCollapse.classList.remove('show')
      }
    }
    if (pathname) {
      handleRouteChange()
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) {
        const navbarHeight = navbar.offsetHeight + 30
        setIsFixed(window.scrollY > navbarHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isActive = (href: String) => pathname === href
  const isUrdu = lang === 'ur'

  const alignmentClass = isUrdu ? 'text-end' : 'text-start'
  const navAlignmentClass = isUrdu ? 'ms-auto' : 'me-auto'
  const flexDirectionClass = isUrdu ? 'flex-row-reverse' : ''

  return (
    <>
      {isFixed && <div className='navbar-placeholder'></div>}
      <nav
        id='navbar'
        className={`navbar navbar-dropdown navbar-expand-lg tx-grey00 p-0 ${
          isFixed ? 'navbar-fixed' : ''
        } ${flexDirectionClass}`}
      >
        <div className='container-fluid py-0 pt-lg-2'>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
            <ul className={`navbar-nav left ${navAlignmentClass}`}>
              <li className='p-3 pb-4 d-none d-lg-block'>
                <Link
                  className={isActive('/') ? 'active tx-grey00' : 'tx-grey00'}
                  aria-current='page'
                  href={isUrdu ? `/${lang}` : '/'}
                >
                  {trans.home}
                </Link>
              </li>
              <li className='p-lg-3 pb-lg-4 dropdown dropdown-mega position-static'>
                <NavDropdown
                  title={trans.aboutUs.title}
                  desc={trans.aboutUs.desc}
                  header1={{
                    title: '',
                    values: [
                      { value: trans.aboutUs.aboutKarandaaz, link: isUrdu ? `/${lang}${aboutUrl}` : aboutUrl },
                      {
                        value: trans.aboutUs.boardAndCommittees,
                        link: isUrdu ? `/${lang}${boardVisionariesUrl}` : boardVisionariesUrl,
                      },
                      {
                        value: trans.aboutUs.ourPeople,
                        link: isUrdu ? `/${lang}${peopleAtKarandaazUrl}` : peopleAtKarandaazUrl,
                      },
                    ],
                  }}
                  lang={lang}
                />
              </li>
              <li className='p-lg-3 pb-lg-4 dropdown dropdown-mega position-static '>
                <NavDropdown
                  title={trans.whatWedo.title}
                  desc={trans.whatWedo.desc}
                  header1={{
                    title: trans.whatWedo.capital.title,
                    heading: 'Capital',
                    values: [
                      {
                        value: trans.whatWedo.capital.directInvestments,
                        link: isUrdu ? `/${lang}${capitalDirectInvestmentUrl}` : capitalDirectInvestmentUrl,
                      },
                      {
                        value: trans.whatWedo.capital.wholesaleInvestments,
                        link: isUrdu ? `/${lang}${capitalWholesaleInvestmentUrl}` : capitalWholesaleInvestmentUrl,
                      },
                      {
                        value: trans.whatWedo.capital.strategicInvestments,
                        link: isUrdu ? `/${lang}${capitalStrategicInvestmentUrl}` : capitalStrategicInvestmentUrl,
                      },
                      {
                        value: trans.whatWedo.capital.greenInvestments,
                        link: isUrdu ? `/${lang}${capitalGreenInvestmentUrl}` : capitalGreenInvestmentUrl,
                      },
                    ],
                  }}
                  header2={{
                    title: trans.whatWedo.digital.title,
                    heading: 'Digital',
                    values: [
                      {
                        value: trans.whatWedo.digital.digitalPublicInfrastructure,
                        link: isUrdu ? `/${lang}${digitalPublicInfrastructureUrl}` : digitalPublicInfrastructureUrl,
                      },
                      {
                        value: trans.whatWedo.digital.publicSectorEngagements,
                        link: isUrdu
                          ? `/${lang}${digitalPublicSectorEngagementsUrl}`
                          : digitalPublicSectorEngagementsUrl,
                      },
                      {
                        value: trans.whatWedo.digital.privateSectorEngagements,
                        link: isUrdu
                          ? `/${lang}${digitalPrivateSectorEngagementsUrl}`
                          : digitalPrivateSectorEngagementsUrl,
                      },
                      {
                        value: trans.whatWedo.digital.researchAndDataAnalytics,
                        link: isUrdu ? `/${lang}${digitalResearchUrl}` : digitalResearchUrl,
                      },
                      {
                        value: trans.whatWedo.digital.policyAndRegulation,
                        link: isUrdu ? `/${lang}${digitalPolicyUrl}` : digitalPolicyUrl,
                      },
                      {
                        value: trans.whatWedo.digital.socialProtectionInterventions,
                        link: isUrdu
                          ? `/${lang}${digitalsocialProtectionInterventionsUrl}`
                          : digitalsocialProtectionInterventionsUrl,
                      },
                      {
                        value: trans.whatWedo.digital.WomenEconomicDigitalInclusionInitiative,
                        link: isUrdu
                          ? `/${lang}${digitalWomenEconomicDigitalInclusionInitiativeUrl}`
                          : digitalWomenEconomicDigitalInclusionInitiativeUrl,
                      },
                    ],
                  }}
                  header3={{
                    title: trans.whatWedo.innovation.title,
                    heading: 'innovation-investments',
                    values: [
                      {
                        value: trans.whatWedo.innovation.innovationChallengeFund,
                        link: isUrdu ? `/${lang}${innovationChallengeFundUrl}` : innovationChallengeFundUrl,
                      },
                      {
                        value: trans.whatWedo.innovation.womenVentures,
                        link: isUrdu ? `/${lang}${innovationWomenVenturesUrl}` : innovationWomenVenturesUrl,
                      },
                      {
                        value: trans.whatWedo.innovation.greenfinInnovations,
                        link: process.env.NEXT_PUBLIC_GFI_URL,
                      },
                    ],
                  }}
                  header4={{
                    title: trans.whatWedo.research.title,
                    heading: 'Research',
                    values: [
                      {
                        value: trans.whatWedo.research.blogs,
                        link: isUrdu ? `/${lang}${researchBlogsUrl}` : researchBlogsUrl,
                      },
                      {
                        value: trans.whatWedo.research.publications,
                        link: isUrdu ? `/${lang}${researchPublicationsUrl}` : researchPublicationsUrl,
                      },
                      {
                        value: trans.whatWedo.research.challengeRounds,
                        link: isUrdu ? `/${lang}${researchChallengeRoundsUrl}` : researchChallengeRoundsUrl,
                      },
                    ],
                  }}
                  lang={lang}
                />
              </li>
              <li className='p-lg-3 pb-lg-4 dropdown dropdown-mega position-static '>
                <NavDropdown
                  title={trans.newsAndMedia.title}
                  desc={trans.newsAndMedia.desc}
                  header1={{
                    title: '',
                    values: [
                      {
                        value: trans.newsAndMedia.newsAndPressReleases,
                        link: isUrdu ? `/${lang}${newsmediaPressUrl}` : newsmediaPressUrl,
                      },
                      {
                        value: trans.newsAndMedia.newsletters,
                        link: isUrdu ? `/${lang}${newsmediaNewsletterUrl}` : newsmediaNewsletterUrl,
                      },
                      {
                        value: trans.newsAndMedia.karandaazStories,
                        link: isUrdu ? `/${lang}${newsmediaStoriesUrl}` : newsmediaStoriesUrl,
                      },
                      // {
                      //   value: trans.newsAndMedia.mediaEnquiries,
                      //   link: isUrdu ? `/${lang}${newsmediaUrl}` + '#mediaform' : newsmediaUrl + '#mediaform',
                      // },
                    ],
                  }}
                  lang={lang}
                />
              </li>
            </ul>

            <ul className='navbar-nav tx-grey00 static-nav-links'>
              <li className='p-lg-3 pb-lg-4'>
                <Link
                  className={`underline-lg-hover ${isActive('/careers') ? 'active tx-grey00' : ''}`}
                  href={isUrdu ? `/${lang}${careersUrl}` : careersUrl}
                >
                  {trans.careers}
                </Link>
              </li>
              <li className='p-lg-3 pb-lg-4'>
                <Link
                  className={`underline-lg-hover ${isActive('/csr-and-outreach') ? 'active tx-grey00' : ''}`}
                  href={isUrdu ? `/${lang}${csrAndOutreachUrl}` : csrAndOutreachUrl}
                >
                  CSR &amp; Outreach
                </Link>
              </li>
              <li className='p-lg-3 pb-lg-4'>
                <Link
                  className={`underline-lg-hover ${isActive('/procurement') ? 'active tx-grey00' : ''}`}
                  href={isUrdu ? `/${lang}${procurementUrl}` : procurementUrl}
                >
                  {trans.procurement}
                </Link>
              </li>
              <li className='p-lg-3 pb-lg-4'>
                <Link
                  className={`underline-lg-hover ${isActive('/contact') ? 'active tx-grey00' : ''}`}
                  href={isUrdu ? `/${lang}${contactUrl}` : contactUrl}
                >
                  {trans.contact}
                </Link>
              </li>
              <li className='p-lg-3 pb-lg-4'>
                <OutlinedButton text={trans.dataPortal} link={portalUrl} />
              </li>
              <li>
                <div className='row d-md-none'>
                  <div className='col-6'>
                    <p className='tx-krnblue'>{isUrdu ? 'زبان' : 'Language'}</p>
                  </div>
                  <div className='col-6'>
                    <div className='dropdown'>
                      <a
                        className={`dropdown-toggle`}
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        {lang === 'en' ? 'Eng' : 'اردو'}
                        <IoIosArrowDown />
                      </a>
                      <ul className='dropdown-menu drawer-menu dropdown-menu-end'>
                        <li>
                          <Link className='dropdown-item tx-krnblue' href={redirectedPathName(alternateLocale)}>
                            {lang === 'en' ? 'اردو' : 'English'}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
