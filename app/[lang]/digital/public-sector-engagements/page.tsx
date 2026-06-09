import { getDigitalSubUrlField, getDigitalRelatedMedia } from '../../api/lib/digital'
import { getFooter } from '../../api/lib/lib'
import { ImagesSwiper } from '../../components/extra/swiper'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import PortfolioSection from '../../components/sections/portfolio-section'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { GetUrlsArray } from '../../../../utils/images'
import { digitalPublicInfrastructureUrl, digitalPublicSectorEngagementsUrl } from '../../../../utils/urls'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'

export async function generateMetadata({ params }: any) {
  const res = await getDigitalSubUrlField('digital-publicsectorengagements', params.lang)
  const title = `Karandaaz Digital: Leading the Digital Transformation of Pakistan’s Public Sector`
  const description = `Discover how Karandaaz transforms Pakistan’s public sector through innovative digital solutions. Learn about our initiatives that promote financial inclusion in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Digital',
      'Public sector digitalisation',
      'Secured Transactions Registry',
      'National Bank of Pakistan',
      'Financial inclusion Pakistan',
      'Digital payments',
      'BISP financial literacy',
      'PMN digital services platform',
      'Kissan E-Credit Scheme',
      'Money order digitisation',
      'Pakistan digital transformation',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/digital/public-sector-engagements`,
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

export default async function PublicSectorEngagements({ params }: any) {
  const res = await getDigitalSubUrlField('digital-publicsectorengagements', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const footerRes = await getFooter('digitalpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  const digitalSection = res?.directionalSection
  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        {' '}
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>

      {/* Portfolios */}
      {/* <PortfolioSection
        sectionType='digital'
        title='Our portfolio'
        path={digitalPublicSectorEngagementsUrl}
        type='Public Sector Engagements'
      /> */}
      {/* Swiper */}
      <div>
        <div>
          <section className='bg-grey sections-wrapper'>
            {Object.keys(digitalSection).map((key, index) => {
              return (
                <DirectionalSection
                  key={index}
                  title={digitalSection[key]?.title}
                  desc={digitalSection[key]?.description}
                  imageUrl={digitalSection[key]?.image?.node?.mediaItemUrl}
                  buttonLink={
                    isUrdu
                      ? `/${params.lang}/${digitalPublicInfrastructureUrl}/${digitalSection[key]?.buttonLinkSlug}`
                      : `${digitalPublicInfrastructureUrl}/${digitalSection[key]?.buttonLinkSlug}`
                  }
                  rightToLeft={index % 2 == 0 ? true : false}
                  sectionID={`section${index + 1}`}
                  buttonText={digitalSection[key]?.buttontitle}
                  isUrdu={isUrdu}
                />
              )
            })}
          </section>
        </div>
      </div>
      {/*
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
      */}
      {/*
      <section className='section-py-md relatedmedia bg-blue00'>
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
      </section>
      */}
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
