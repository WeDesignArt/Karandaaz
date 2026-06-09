import { getDigitalRelatedMedia } from '../api/lib/digital'
import { getFooter } from '../api/lib/lib'
import { Counter } from '../components/core/counter'
import { GetUrlsArray } from '../../../utils/images'
import { ImagesSwiper } from '../components/extra/swiper'
import { DirectionalSection } from '../components/sections/directional-section'
import { ScrollNav } from '../components/navigation/scroll-nav'
import { getDigitalPageFields } from '../api/lib/digital'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'
import { SubscriptionSection } from '../components/sections/subscription-section'
export async function generateMetadata({ params }: any) {
  const res = await getDigitalPageFields('digital-3', params.lang)
  const title = `Karandaaz Digital: Leading the Digital Finance Revolution`
  const description = ` Discover how Karandaaz is pioneering digital finance in Pakistan through innovative collaborations across the financial services sector. Learn about our initiatives.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Digital',
      'Digital finance Pakistan',
      'Financial inclusion initiatives',
      'Digital financial startups',
      'Policy reforms digital economy',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/digital`,
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

export default async function Digital({ params }: any) {
  const res = await getDigitalPageFields('digital-3', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const countersSection = res?.countersSection
  const digitalSection = res?.digitalSection
  const footerRes = await getFooter('our-partners', params.lang)
  const swiperImages = footerRes?.image?.edges

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      {/* Counters */}
      <section className='section-py-md counter'>
        <TopHeaderSection
          heading={res?.heading}
          subheading={res?.subheading}
          btntitle={res?.btntitle}
          lang={params.lang}
        />
      </section>
      <section className='counter-section'>
        <div className='container section-py-md border-top'>
          <div className='counter row justify-content-center'>
            {/* <div className='counter-grid'> */}
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={countersSection?.prefix1}
                value={countersSection?.number1}
                suffix={countersSection?.suffix1}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={countersSection?.prefix2}
                value={countersSection?.number2}
                suffix={countersSection?.suffix2}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={countersSection?.prefix3}
                value={countersSection?.number3}
                suffix={countersSection?.suffix3}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={countersSection?.prefix4}
                value={countersSection?.number4}
                suffix={countersSection?.suffix4}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={countersSection?.prefix5}
                value={countersSection?.number5}
                suffix={countersSection?.suffix5}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
      </section>
      {/* Scrollable Section */}
      <h2 className='text-center pb-3 pb-md-5'>{res?.title}</h2>
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
                  buttonLink={
                    isUrdu
                      ? `/${params.lang}/digital/${digitalSection[key]?.nextPath}`
                      : `/digital/${digitalSection[key]?.nextPath}`
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
    </main>
  )
}
