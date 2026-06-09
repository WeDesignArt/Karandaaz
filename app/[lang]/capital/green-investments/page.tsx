import { getGreenInvestment } from '../../api/lib/capital'
import { GreenInvestmentForm } from '@/[lang]/components/forms/greeninvestment-form'
import { capitalGreenInvestmentUrl, contactUrl } from '../../../../utils/urls'
import PortfolioSection from '../../components/sections/portfolio-section'
import StoriesSection from '../../components/sections/stories-of-impact-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getGreenInvestment('capital-greeninvestment', params.lang)
  const title = `Karandaaz Green Investments: Driving Sustainable Growth in Pakistan`
  const description = `Karandaaz promotes climate-friendly businesses in Pakistan, supporting renewable energy, energy efficiency, green buildings, clean transportation, and waste management projects.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz green investments',
      'Climate-friendly businesses in Pakistan',
      'Renewable energy projects',
      'Energy efficiency solutions',
      'SEED program Pakistan',
    ],
    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/capital/green-investments`,
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

export default async function GreenInvestment({ params }: any) {
  const res = await getGreenInvestment('capital-greeninvestment', params.lang)
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
                  <a className='butn butn-solid' href='#section3'>
                    سرمایہ کاری کے لئے درخواست دیں
                  </a>
                </>
              ) : (
                <>
                  <a className='butn butn-solid' href='#section3'>
                    Apply for Investment
                  </a>
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
        path={isUrdu ? `/${params.lang}/${capitalGreenInvestmentUrl}` : capitalGreenInvestmentUrl}
        type='Green Investments'
        isUrdu={isUrdu}
        lang={params.lang}
      />
      <StoriesSection isUrdu={isUrdu} />
      {/* Form */}
      <section className='section-py-md pb-0' id='section3'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h2 className='mb-5 text-center'>{investmentSection?.greenApplicationNavItem?.title}</h2>
              <GreenInvestmentForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
