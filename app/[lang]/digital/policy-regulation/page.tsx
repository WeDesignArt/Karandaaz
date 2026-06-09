import { getDigitalPolicyRegulation, getDigitalRelatedMedia } from '../../api/lib/digital'
import { getFooter } from '../../api/lib/lib'
import { ImagesSwiper } from '../../components/extra/swiper'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { DirectionalSection } from '../../components/sections/directional-section'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { GetUrlsArray } from '../../../../utils/images'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'

export async function generateMetadata({ params }: any) {
  const res = await getDigitalPolicyRegulation('digital-policyandregulation', params.lang)
  const title = `Policy and Regulation in Digital Financial Inclusion`
  const description = `Explore Karandaaz's efforts in identifying regulatory gaps and barriers to digital financial inclusion. Learn how we contribute to shaping digital banking regulations in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Digital financial inclusion policy',
      'Regulatory frameworks',
      'Digital banking regulations',
      'Karandaaz policy initiatives',
      'State Bank of Pakistan collaboration',
      'Financial inclusion strategy',
      'NFIS committees',
      'Digital bank licensing',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/digital/policy-regulation`,
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

export default async function PolicyRegulation({ params }: any) {
  const res = await getDigitalPolicyRegulation('digital-policyandregulation', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const footerRes = await getFooter('digitalpartners2')
  const swiperImages = footerRes?.image?.edges

  const isUrdu = params.lang === 'ur'

  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
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
      {/* <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-5'>{footerRes?.title}</h2>
              <ImagesSwiper urls={GetUrlsArray(swiperImages)} />
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className='section-py-md relatedmedia bg-blue00'>
        <div className='container'>
          <div className='row gy-4'>
            <div className='col-md-12'>
              <h4 className='tx-blue20'>{isUrdu ? 'متعلقہ میڈیا' : 'Related media'}</h4>
            </div>
            {resRelatedmedia?.relatedMedia?.relatedPosts?.map((post: any, index: number) => {
              return (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-3'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  <BlogCard imgLink={post?.thumbnail?.node?.mediaItemUrl} title={post?.title} link={post?.link} />
                </div>
              )
            })}
          </div>
        </div>
      </section> */}
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
