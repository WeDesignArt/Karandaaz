import { ImagesSwiper } from '../components/extra/swiper'
import { GetUrlsArray } from '../../../utils/images'
import { ScrollNav } from '../components/navigation/scroll-nav'
import { DirectionalSection } from '../components/sections/directional-section'
import { getFooter } from '../api/lib/lib'
import { getInnovationPageFields } from '../api/lib/innovation'
import { TopHeaderSection } from '../components/sections/top-header-section'

export async function generateMetadata({ params }: any) {
  const res = await getInnovationPageFields('innovation', params.lang)
  const title = `Karandaaz Innovation: Transforming the Financial Ecosystem`
  const description = `Discover Karandaaz's initiatives driving transformative change in finance. Explore the Innovation Challenge Fund, Women Ventures, and GreenFin Innovations.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Innovation',
      'Financial ecosystem transformation',
      'Innovation Challenge Fund',
      'Women Ventures Pakistan',
      'GreenFin Innovations',
      'Climate change solutions',
      'Women entrepreneurship',
      'SME finance',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/innovation-investments`,
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

export default async function Innovation({ params }: any) {
  const res = await getInnovationPageFields('innovation', params.lang)
  const fundsSection = res?.fundsSection
  const footerRes = await getFooter('financial-partners', params.lang)
  const swiperImages = footerRes?.image?.edges
  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md pb-0'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>

      {/* Scrollable Section */}
      <ScrollNav items={fundsSection} />
      <div>
        <div>
          <section className='bg-grey sections-wrapper'>
            {Object.keys(fundsSection).map((navItemKey, index) => {
              const { _, sections } = fundsSection[navItemKey]

              return Object.keys(sections).map((sectionKey) => {
                const section = sections[sectionKey]

                return (
                  <DirectionalSection
                    key={index}
                    title={section?.title}
                    desc={section?.description}
                    imageUrl={section?.image?.node?.sourceUrl}
                    buttonLink={
                      section?.nextPath === 'greenfin-innovation'
                        ? process.env.NEXT_PUBLIC_GFI_URL
                        : isUrdu
                        ? `/${params.lang}/innovation-investments/${section?.nextPath}`
                        : `/innovation-investments/${section?.nextPath}`
                    }
                    rightToLeft={index % 2 == 0 ? true : false}
                    sectionID={`section${index + 1}`}
                    buttonText={isUrdu ? 'مزید جانیں' : 'Learn more'}
                    isUrdu={isUrdu}
                  />
                )
              })
            })}
          </section>
        </div>
      </div>
      {/* Swiper */}
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-5'>{res?.footerHeading}</h2>
              <ImagesSwiper urls={GetUrlsArray(swiperImages)} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
