import { getDigitalResearchPageFields, getDigitalRelatedMedia } from '../../api/lib/digital'
import { getFooter } from '../../api/lib/lib'
import { ImagesSwiper } from '../../components/extra/swiper'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { DirectionalSection } from '../../components/sections/directional-section'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { GetUrlsArray } from '../../../../utils/images'
import { digitalResearchDiscoveryUrl, researchPublicationsUrl } from '../../../../utils/urls'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'

export async function generateMetadata({ params }: any) {
  const res = await getDigitalResearchPageFields('digital', params.lang)
  const title = `Research and Data Analytics`
  const description = `Explore Karandaaz's research initiatives in digital financial services (DFS) through studies, reports, and collaborations. Join us in advancing DFS adoption among women.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Digital financial services research',
      'DFS studies',
      'Financial inclusion research',
      'Karandaaz research initiatives',
      "Women's financial empowerment",
      'DFS adoption studies',
      'Customer segmentation in DFS',
      'Retail payments research',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/digital/research-and-data-analysis`,
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
export default async function ResearchDataAnalysis({ params }: any) {
  const res = await getDigitalResearchPageFields('digital', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const initiativesSection = res?.cardSection?.initiative
  const footerRes = await getFooter('our-partners', params.lang)
  const swiperImages = footerRes?.image?.edges

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>
      <div>
        <div>
          <section className='bg-grey sections-wrapper'>
            {initiativesSection.map((section: any, index: any) => {
              let link = section?.buttonlink?.node?.mediaItemUrl
              link = section?.heading == 'Karandaaz discovery challenge' ? digitalResearchDiscoveryUrl : ''
              return (
                <DirectionalSection
                  key={index}
                  title={section?.heading}
                  desc={section?.description}
                  imageUrl={section?.image?.node?.sourceUrl}
                  buttonLink={link ? link : researchPublicationsUrl}
                  rightToLeft={index % 2 == 0 ? true : false}
                  sectionID={`section${index + 1}`}
                  buttonText={section?.buttonText}
                  isUrdu={isUrdu}
                />
              )
            })}
          </section>
        </div>
      </div>
      {/* Swiper */}
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
