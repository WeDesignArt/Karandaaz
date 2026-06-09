import { Counter } from '../components/core/counter'
import { EntityBox } from '../components/core/entityBox'
import { ScrollNav } from '../components/navigation/scroll-nav'
import { DirectionalSection } from '../components/sections/directional-section'
import { getCapitalPageFields } from '../api/lib/capital'
import { TopHeaderSection } from '../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getCapitalPageFields('capital', params.lang)
  const title = `Karandaaz Capital: Investing in Businesses for Growth and Employment`
  const description = ` Discover how Karandaaz Capital facilitates MSMEs' access to growth capital in Pakistan, supporting employment generation and financial returns. Explore our investment portfolio.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Capital',
      'MSME financing in Pakistan',
      'Growth capital investments',
      'Employment generation',
      'Financial returns',
      'Direct investments',
      'Wholesale partnerships',
      'Strategic investments',
      'Green investments',
      'Sustainable finance',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/capital`,
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

export default async function Capital({ params }: any) {
  const res = await getCapitalPageFields('capital', params.lang)
  const countersSection = res?.countersSection
  const investmentSection = res?.investmentSection
  const entities = res?.entities

  const isUrdu = params.lang === 'ur'

  return (
    <main>
      {/* Counters */}
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>

      <div className='container section-py-sm counters border-top'>
        <div className='row'>
          <div className='offset-md-2 col-sm-12 col-md-4'>
            <Counter
              prefix={countersSection?.prefix1}
              value={countersSection?.number1}
              suffix={countersSection?.suffix1}
            />
          </div>
          <div className='offset-md-1 col-sm-12 col-md-4 mt-4 mt-md-0'>
            <Counter
              prefix={countersSection?.prefix2}
              value={countersSection?.number2}
              suffix={countersSection?.suffix2}
            />
          </div>
          <div className='offset-md-2 col-sm-12 col-md-4 my-3 my-md-4 theme-yellow'>
            <Counter
              prefix={countersSection?.prefix3}
              value={countersSection?.number3}
              suffix={countersSection?.suffix3}
            />
          </div>
          <div className='offset-md-1 col-sm-12 col-md-4 my-3 my-md-4 theme-yellow'>
            <Counter
              prefix={countersSection?.prefix4}
              value={countersSection?.number4}
              suffix={countersSection?.suffix4}
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='text-center'>
            <div className='mt-5 text-center' dangerouslySetInnerHTML={{ __html: countersSection?.description }}/>
          </div>
        </div>
      </div>

      {/* Scrollable Section */}
      <ScrollNav items={investmentSection} />
      <div>
        <div>
          <section className='bg-grey sections-wrapper'>
            {Object.keys(investmentSection).map((key, index) => {
              return (
                <DirectionalSection
                  key={index}
                  title={investmentSection[key]?.title}
                  desc={investmentSection[key]?.description}
                  imageUrl={investmentSection[key]?.image?.node?.sourceUrl}
                  buttonLink={
                    isUrdu
                      ? `/${params.lang}/capital/${investmentSection[key]?.nextPagePath}`
                      : `/capital/${investmentSection[key]?.nextPagePath}`
                  }
                  rightToLeft={index % 2 == 0 ? true : false}
                  sectionID={`section${index + 1}`}
                  buttonText={isUrdu ? 'مزید جانیں' : 'Learn more'}
                  isUrdu={isUrdu}
                />
              )
            })}
          </section>
        </div>
      </div>
      {/* Entities */}
      <section className='section-py-md pb-0'>
        <div className='container'>
          <div className='row'>
            <div className='pb-3 pb-md-5'>
              <h2 className='text-center'>{entities?.sectionTitle}</h2>
            </div>
            {Object.keys(entities?.cards).map((key, index) => {
              const cardName = `card${index + 1}`
              return (
                <div className='col-sm-12 col-md-4'>
                  <EntityBox key={index} data={entities?.cards[cardName]} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
