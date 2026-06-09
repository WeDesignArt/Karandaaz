import { SubscriptionSection } from '../../components/sections/subscription-section'
import { getWholesaleInvestment } from '../../api/lib/capital'
import { capitalWholesaleInvestmentUrl, contactUrl } from '../../../../utils/urls'
import PortfolioSection from '../../components/sections/portfolio-section'
import StoriesSection from '../../components/sections/stories-of-impact-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getWholesaleInvestment('capital-wholesaleinvestment', params.lang)
  const title = `Karandaaz Capital: Enhancing Access to Finance for Small Businesses`
  const description = `Explore Karandaaz's initiatives in Pakistan, enhancing finance access for small businesses via innovative solutions. We offer SMEs medium-term loans and risk participation facilities.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Capital',
      'Access to finance Pakistan',
      'Small business financing',
      'Medium-term loans',
      'Risk participation facilities',
      'JSK Feeds financing',
      'JS Bank risk participation',
      'ORIX Leasing small business financing',
      'Bank Alfalah SME credit programmes',
      'Meezan Bank Islamic finance',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/capital/wholesale-investments`,
      siteName: res?.seo?.ogSiteName || 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: res?.seo?.ogLocale || 'en_US',
      type: res?.seo?.ogType || 'website',
    },
    twitter: {
      card: res?.seo?.twitterCard || 'summary_large_image',
      site: res?.seo?.twitterSite || '@defaultsite',
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image:
        res?.seo?.ogImage || 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function WholesaleInvestments({ params }: any) {
  const res = await getWholesaleInvestment('capital-wholesaleinvestment', params.lang)
  const investmentSection = res?.investmentSection

  const isUrdu = params.lang === 'ur'

  return (
    <main className='capital-page-wrapper'>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
        <div className='container' dir='ltr'>
          <div className='row'>
            <div className='col-md-8 mx-auto text-center mt-2 mt-md-3'>
              {isUrdu ? (
                <>
                  <a className='butn butn-outline' href={`/${params.lang}/${contactUrl}`}>
                    ہمارے ساتھ سرمایہ کاری کریں
                  </a>
                  {/* <a className='butn butn-solid' href='#section3'>
                    سرمایہ کاری کے لئے درخواست دیں
                  </a> */}
                </>
              ) : (
                <>
                  {/* <a className='butn butn-solid' href='#section3'>
                    Apply for Investment
                  </a> */}
                  <a className='butn butn-outline' href={contactUrl}>
                    Invest with us
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolios */}
      <PortfolioSection
        sectionType='capital'
        title={investmentSection?.portfolioNavItem?.title}
        path={isUrdu ? `/${params.lang}${capitalWholesaleInvestmentUrl}` : capitalWholesaleInvestmentUrl}
        type='Wholesale Investments'
        isUrdu={isUrdu}
        lang={params.lang}
      />
      <StoriesSection isUrdu={isUrdu} />
      <div className='bg-blue00 section-py-md'>
        <SubscriptionSection lang={params.lang} />
      </div>
    </main>
  )
}
