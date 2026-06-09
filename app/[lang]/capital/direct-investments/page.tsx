import { DirectInvestmentForm } from '../../components/forms/directinvestment-form'
import { ScrollNav } from '../../components/navigation/scroll-nav'
import RelatedMediaSection from '../../components/sections/related-media-section'
import './page.css'
import { capitalDirectInvestmentInvestWithUs, capitalDirectInvestmentUrl } from '../../../../utils/urls'
import { getCapitalDirectInvestment } from '../../api/lib/capital'
import PortfolioSection from '../../components/sections/portfolio-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getCapitalDirectInvestment(params.lang)
  const title = `Karandaaz Direct Investments: Fueling Growth and Employment in Pakistan`
  const description = `Discover Karandaaz's investments in Pakistani SMEs. These companies, supported by Karandaaz, aim to expand operations, create jobs, and boost economic development.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz direct investments',
      'SME financing Pakistan',
      'Growth capital investments',
      'Job creation investments',
      'Karandaaz portfolio companies',
      'BF Biosciences investment',
      'Renacon Pharma investment',
      'Al-Haj FAW Motors financing',
      'COVID-19 assistance Excel Labs',
      'Wahdat Farms investment',
      'Secure Logistics Group investment',
      'NRSP APC investment',
      'HAC Agri investment',
      'Excel Labs expansion',
      'Techlogix International investment',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/capital/direct-investments`,
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

export default async function DirectInvestment({ params }: any) {
  const res = await getCapitalDirectInvestment(params.lang)
  const investmentSection = res?.investmentSection
  const isUrdu = params.lang === 'ur'
  return (
    <main className='direct-investment-page-wrapper capital-page-wrapper'>
      <section className='section-py-md pb-0'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>
      <div className='container' dir='ltr'>
        <div className='row'>
          <div className='col-md-8 mx-auto text-center mt-2 mt-md-3'>
            {isUrdu ? (
              <>
                {/* <a className='butn butn-outline' href={`/${params.lang}/${capitalDirectInvestmentInvestWithUs}`}>
                  ہمارے ساتھ سرمایہ کاری کریں
                </a> */}
                <a className='butn butn-solid' href='#section3'>
                  سرمایہ کاری کے لئے درخواست دیں
                </a>
              </>
            ) : (
              <>
                <a className='butn butn-solid' href='#section3'>
                  Apply for Investment
                </a>
                {/* <a className='butn butn-outline' href={capitalDirectInvestmentInvestWithUs}>
                  Invest with us
                </a> */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Section */}
      <ScrollNav items={investmentSection} />
      {/* Investment Criteria Section */}
      <section className='section-py-md' id='section1'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h2 className='mb-2 mb-md-5'>{investmentSection?.navitem1?.title}</h2>
            </div>
          </div>
          {investmentSection?.navitem1?.section.map((item: any) => {
            return (
              <div
                className='row'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='1000'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              >
                <div className='col-md-2 col-sm-12'>
                  <div className='data-title'>
                    <p>{item?.subheading}</p>
                  </div>
                </div>
                <div className='col-md-10 col-sm-12'>
                  <div className='data-info'>
                    <p>{item?.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {/* Portfolios */}
      <PortfolioSection
        sectionType='capital'
        sectionID='section2'
        title={investmentSection?.navitem2?.title}
        path={isUrdu ? `/${params.lang}/${capitalDirectInvestmentUrl}` : capitalDirectInvestmentUrl}
        type='Direct Investments'
        isUrdu={isUrdu}
        lang={params.lang}
      />
      <RelatedMediaSection className='' heading={isUrdu ? 'متعلقہ میڈیا' : 'Related media'} />
      {/* Form */}
      <section className='section-py-md pb-0' id='section3' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h2 className='mb-5 text-center'>{investmentSection?.navitem3?.title}</h2>
              <DirectInvestmentForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
