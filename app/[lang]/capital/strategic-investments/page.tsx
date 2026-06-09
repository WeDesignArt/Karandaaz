import { getStrategicInvestment } from '../../api/lib/capital'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import { capitalStrategicInvestmentUrl, contactUrl } from '../../../../utils/urls'
import PortfolioSection from '../../components/sections/portfolio-section'
import StoriesSection from '../../components/sections/stories-of-impact-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getStrategicInvestment('capital-strategicinvestment', params.lang)
  const title = `Karandaaz Portfolio: Driving Financial Inclusion and Economic Growth`
  const description = `Explore Karandaaz's portfolio initiatives and learn how these entities are bridging financial gaps, supporting micro & MSMEs, and catalysing infrastructure development in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz portfolio',
      'Parwaaz Financial Services Ltd.',
      'PFSL loans Pakistan',
      'PMIC microfinance investment',
      'InfraZamin Pakistan credit enhancement',
      'Infrastructure financing Pakistan',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/capital/strategic-investments`,
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

export default async function StrategicInvestment({ params }: any) {
  const res = await getStrategicInvestment('capital-strategicinvestment', params.lang)
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
        path={isUrdu ? `/${params.lang}/${capitalStrategicInvestmentUrl}` : capitalStrategicInvestmentUrl}
        type='Strategic Investments'
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
