import SponsorsFooter from '../components/navigation/sponsors-footer'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { Counter } from '../components/core/counter'
import { ScrollNav } from '../components/navigation/scroll-nav'
import { DirectionalSection } from '../components/sections/directional-section'
import RelatedMediaSection from '../components/sections/related-media-section'
import { SubscriptionSection } from '../components/sections/subscription-section'
import { getResearchPageFields } from '../api/lib/research'
import SEOHead from '../components/seo/seoHead'

export async function generateMetadata({ params }: any) {
  const res = await getResearchPageFields(params.lang)
  const title = `Karandaaz Research: Insights on Financial Inclusion in Pakistan`
  const description = `Explore Karandaaz's comprehensive research, blogs, publications, and library to gain deep insights into financial inclusion in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: ['Karandaaz research', 'Financial inclusion Pakistan', 'Blogs', 'Publications', 'Library'],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/research`,
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

export default async function Research({ params }: any) {
  const researchRes = await getResearchPageFields(params.lang)
  const res = researchRes?.researchpage
  const countersSection = res?.countersSection
  const digitalSection = res?.digitalSection

  const isUrdu = params.lang === 'ur'

  return (
    <main className='research-page'>
      {/* <SEOHead seo={researchRes?.seo} /> */}
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>
      <div className='container section-py-sm border-top'>
        <div className='row'>
          <div className='offset-md-3 col-sm-12 col-md-3'>
            <Counter
              prefix={countersSection?.prefix1}
              value={countersSection?.number1}
              suffix={countersSection?.suffix1}
            />
          </div>
          <div className='col-sm-12 col-md-3  mt-4 mt-md-0'>
            <Counter
              prefix={countersSection?.prefix2}
              value={countersSection?.number2}
              suffix={countersSection?.suffix2}
            />
          </div>
        </div>
      </div>
      <ScrollNav items={digitalSection} />
      <div>
        <div>
          <section className='bg-grey sections-wrapper'>
            {Object.keys(digitalSection).map((key, index) => {
              return (
                <DirectionalSection
                  key={index}
                  title={digitalSection[key]?.title}
                  desc={digitalSection[key]?.description}
                  imageUrl={digitalSection[key]?.image?.node?.sourceUrl}
                  buttonLink={`/research/${digitalSection[key]?.nextPath}`}
                  rightToLeft={index % 2 == 0 ? true : false}
                  sectionID={`section${index + 1}`}
                  buttonText={digitalSection[key]?.ctatext}
                  isUrdu={isUrdu}
                />
              )
            })}
          </section>
        </div>
      </div>
      <RelatedMediaSection className='bg-white' heading={isUrdu ? 'مزید دریافت کریں' : 'More to explore'} />
      <div className='bg-blue00 section-py-md'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
