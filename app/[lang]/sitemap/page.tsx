import { Breadcrumb } from '../components/navigation/breadcrumb'
import {
  aboutUrl,
  annualReportsUrl,
  antiFraudCorruptionPolicyUrl,
  audtiorLegalUrl,
  boardVisionariesUrl,
  capitalDirectInvestmentUrl,
  capitalGreenInvestmentUrl,
  capitalStrategicInvestmentUrl,
  capitalUrl,
  capitalWholesaleInvestmentUrl,
  careersAvailablePositions,
  careersUrl,
  complianceUrl,
  contactUrl,
  digitalPolicyUrl,
  digitalPrivateSectorEngagementsUrl,
  digitalPublicInfrastructureUrl,
  digitalPublicSectorEngagementsUrl,
  digitalResearchUrl,
  digitalUrl,
  disclaimerUrl,
  FAQsUrl,
  homepageUrl,
  innovationChallengeFundUrl,
  innovationUrl,
  innovationWomenVenturesUrl,
  newsmediaMediaUrl,
  newsmediaNewsletterUrl,
  newsmediaPressUrl,
  newsmediaStoriesUrl,
  newsmediaUrl,
  peopleAtKarandaazUrl,
  portalLoginUrl,
  portalSignUpUrl,
  portalUrl,
  privacyPolicyUrl,
  procurementBlacklistedFirms,
  procurementGeneralTermsConditionsUrl,
  procurementUrl,
  researchBlogsUrl,
  researchPublicationsUrl,
  researchUrl,
  sitemapUrl,
  statusNtnUrl,
} from '../../../utils/urls'
import Link from 'next/link'
import React from 'react'
import './page.css'
import { getDictionary } from '../../../lib/dictionary'
export default async function Sitemap({ params }: any) {
  const { sitemap } = await getDictionary(params.lang)

  const isUrdu = params.lang === 'ur'

  const {
    karandaaz,
    compliance,
    corporateLinks,
    about,
    newsAndMedia,
    careers,
    procurement,
    dataPortal,
    capital,
    digital,
    research,
    innovation,
  } = sitemap

  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-0 pb-md-0'>Sitemap</h2>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='offset-md-2 col-md-3'>
              <Link href={''} className='sitemap-heading block'>
                {karandaaz.heading}
              </Link>
              <Link href={homepageUrl} className='sitemap-link block'>
                {karandaaz.homepage}
              </Link>
              <Link href={capitalUrl} className='sitemap-link block'>
                {karandaaz.capital}
              </Link>
              <Link href={digitalUrl} className='sitemap-link block'>
                {karandaaz.digital}
              </Link>
              <Link href={innovationUrl} className='sitemap-link block'>
                {karandaaz.innovation}
              </Link>
              <Link href={researchUrl} className='sitemap-link block'>
                {karandaaz.research}
              </Link>
              <Link href={newsmediaUrl} className='sitemap-link block'>
                {karandaaz.newsAndMedia}
              </Link>
              <Link href={aboutUrl} className='sitemap-link block'>
                {karandaaz.about}
              </Link>
              <Link href={careersUrl} className='sitemap-link block'>
                {karandaaz.careers}
              </Link>
              <Link href={procurementUrl} className='sitemap-link block'>
                {karandaaz.procurement}
              </Link>
              <Link href={contactUrl} className='sitemap-link block'>
                {karandaaz.contact}
              </Link>
              <Link href={FAQsUrl} className='sitemap-link block'>
                {karandaaz.faq}
              </Link>
              <Link href={complianceUrl} className='sitemap-heading block'>
                {compliance.heading}
              </Link>
              <Link href={statusNtnUrl} className='sitemap-link block'>
                {compliance.statusNTN}
              </Link>
              <Link href={audtiorLegalUrl} className='sitemap-link block'>
                {compliance.auditorLegalAdvisor}
              </Link>
              <Link href={digitalUrl} className='sitemap-link block'>
                {compliance.secp}
              </Link>
              <Link href={''} className='sitemap-heading block'>
                {corporateLinks.heading}
              </Link>
              <Link href={antiFraudCorruptionPolicyUrl} className='sitemap-link block'>
                {corporateLinks.antiFraud}
              </Link>
              <Link href={''} className='sitemap-link block'>
                {corporateLinks.codeOfConduct}
              </Link>
              <Link href={annualReportsUrl} className='sitemap-link block'>
                {corporateLinks.annualReports}
              </Link>
              <Link href={''} className='sitemap-link block'>
                {corporateLinks.npoCertification}
              </Link>
              <Link href={''} className='sitemap-link block'>
                {corporateLinks.safeGuardingPolicy}
              </Link>
              <Link href={privacyPolicyUrl} className='sitemap-link block'>
                {corporateLinks.privacyPolicy}
              </Link>
              <Link href={disclaimerUrl} className='sitemap-link block'>
                {corporateLinks.disclaimer}
              </Link>
              <Link href={sitemapUrl} className='sitemap-link block'>
                {corporateLinks.siteMap}
              </Link>
            </div>
            <div className='col-md-3'>
              <Link href={aboutUrl} className='sitemap-heading block'>
                {about.heading}
              </Link>
              <Link href={boardVisionariesUrl} className='sitemap-link block'>
                {about.boardAndCommittees}
              </Link>
              <Link href={peopleAtKarandaazUrl} className='sitemap-link block'>
                {about.ourPeople}
              </Link>
              <Link href='' className='sitemap-link block'>
                {about.workWithUs}
              </Link>
              <Link href={newsmediaUrl} className='sitemap-heading block'>
                {newsAndMedia.title}
              </Link>
              <Link href={newsmediaPressUrl} className='sitemap-link block'>
                {newsAndMedia.newsAndPressReleases}
              </Link>
              <Link href={newsmediaNewsletterUrl} className='sitemap-link block'>
                {newsAndMedia.newsletters}
              </Link>
              <Link href={newsmediaStoriesUrl} className='sitemap-link block'>
                {newsAndMedia.karandaazStories}
              </Link>
              <Link href={newsmediaMediaUrl} className='sitemap-link block'>
                {newsAndMedia.mediaEnquiries}
              </Link>
              <Link href={careersUrl} className='sitemap-heading block'>
                {careers.heading}
              </Link>
              <Link href={careersAvailablePositions} className='sitemap-link block'>
                {careers.availablePositions}
              </Link>
              <Link href={procurementUrl} className='sitemap-heading block'>
                {procurement.heading}
              </Link>
              <Link href={procurementUrl} className='sitemap-link block'>
                {procurement.contractualOppurtunities}
              </Link>
              <Link href={procurementGeneralTermsConditionsUrl} className='sitemap-link block'>
                {procurement.generalTermsConditions}
              </Link>
              <Link href={procurementBlacklistedFirms} className='sitemap-link block'>
                {procurement.blacklistedFirms}
              </Link>
              <Link href={procurementUrl} className='sitemap-link block'>
                {procurement.archives}
              </Link>
              <Link href={portalUrl} className='sitemap-heading block'>
                {dataPortal.heading}
              </Link>
              <Link href={portalUrl} className='sitemap-link block'>
                {dataPortal.browsableCategories}
              </Link>
              <Link href={portalSignUpUrl} className='sitemap-link block'>
                {dataPortal.signUp}
              </Link>
              <Link href={portalLoginUrl} className='sitemap-link block'>
                {dataPortal.login}
              </Link>
              <Link href={portalUrl} className='sitemap-link block'>
                {dataPortal.signUp}
              </Link>
            </div>
            <div className='col-md-3'>
              <Link href={capitalUrl} className='sitemap-heading block'>
                {capital.heading}
              </Link>
              <Link href={capitalDirectInvestmentUrl} className='sitemap-link block'>
                {capital.directInvestments}
              </Link>
              <Link href={capitalWholesaleInvestmentUrl} className='sitemap-link block'>
                {capital.wholesaleInvestments}
              </Link>
              <Link href={capitalStrategicInvestmentUrl} className='sitemap-link block'>
                {capital.strategicInvestments}
              </Link>
              <Link href={capitalGreenInvestmentUrl} className='sitemap-link block'>
                {capital.greenInvestments}
              </Link>
              <Link href={digitalUrl} className='sitemap-heading block'>
                {digital.heading}
              </Link>
              <Link href={digitalPublicInfrastructureUrl} className='sitemap-link block'>
                {digital.digitalPublicInfrastructure}
              </Link>
              <Link href={digitalPublicSectorEngagementsUrl} className='sitemap-link block'>
                {digital.publicSectorEngagements}
              </Link>
              <Link href={digitalPrivateSectorEngagementsUrl} className='sitemap-link block'>
                {digital.privateSectorEngagements}
              </Link>
              <Link href={digitalResearchUrl} className='sitemap-link block'>
                {digital.researchAndDataAnalytics}
              </Link>
              <Link href={digitalPolicyUrl} className='sitemap-link block'>
                {digital.policyAndRegulation}
              </Link>
              <Link href={researchUrl} className='sitemap-heading block'>
                {research.heading}
              </Link>
              <Link href={researchBlogsUrl} className='sitemap-link block'>
                {research.blogs}
              </Link>
              <Link href={researchPublicationsUrl} className='sitemap-link block'>
                {research.publications}
              </Link>
              <Link href={innovationUrl} className='sitemap-heading block'>
                {innovation.heading}
              </Link>
              <Link href={innovationChallengeFundUrl} className='sitemap-link block'>
                {innovation.innovationChallengeFund}
              </Link>
              <Link href={innovationWomenVenturesUrl} className='sitemap-link block'>
                {innovation.womenVentures}
              </Link>
              <Link href={innovationUrl} className='sitemap-link block'>
                {innovation.greenfin}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
