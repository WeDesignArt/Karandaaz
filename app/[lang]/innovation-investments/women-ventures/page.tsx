import { ImagesSwiper } from '../../components/extra/swiper'
import { GetUrlsArray } from '../../../../utils/images'
import { DirectionalSection } from '../../components/sections/directional-section'
import { getFooter } from '../../api/lib/lib'
import { getInnovationWomenVentures } from '../../api/lib/innovation'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { contactUrl } from '../../../../utils/urls'

export async function generateMetadata({ params }: any) {
  const res = await getInnovationWomenVentures(params.lang)
  const title = `Karandaaz Women Ventures: Empowering Women Entrepreneurs in Pakistan`
  const description = `Discover Karandaaz Women Ventures (WV), a program empowering women-led businesses in Pakistan through growth capital and business development support. Learn how to apply`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Women Ventures',
      'Women Entrepreneurship Challenge',
      'WV Pakistan',
      'Women-led businesses',
      'Growth capital for women',
      'Business development support',
      'Women entrepreneurs Pakistan',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/innovation-investments/women-ventures`,
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

export default async function WomenVentures({ params }: any) {
  const res = await getInnovationWomenVentures(params.lang)
  const footerRes = await getFooter('financialpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto text-center'>
              <a className='butn butn-solid' href='https://wv.karandaaz.com.pk/'>
                {isUrdu ? 'ابھی درخواست دیں' : 'Apply Now'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-grey'>
        <DirectionalSection
          key={1}
          title={res?.card?.title}
          desc={res?.card?.description}
          imageUrl={res?.card?.image?.node?.sourceUrl}
          rightToLeft={true}
          isUrdu={isUrdu}
        />
      </section>

      {/* Swiper */}
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-5'>{footerRes?.title}</h2>
              <ImagesSwiper urls={GetUrlsArray(swiperImages)} />
            </div>
          </div>
        </div>
      </section>
      <SponsorsFooter />
    </main>
  )
}
