import { getDigitalSubUrlField, getDigitalRelatedMedia } from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import { ImagesSwiper } from '@/[lang]/components/extra/swiper'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { SubscriptionSection } from '@/[lang]/components/sections/subscription-section'
import { TopHeaderSection } from '@/[lang]/components/sections/top-header-section'
import { GetUrlsArray } from '../../../../../utils/images'
import { digitalPrivateSectorEngagementsUrl, digitalPrivateSectiorChalllange } from '../../../../../utils/urls'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'

export default async function PrivateSectorEngagements({ params }: any) {
  const res = await getDigitalSubUrlField('digital-privatesectorengagements-challengerounds', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const footerRes = await getFooter('challengerounds-partners', params.lang)
  const swiperImages = footerRes?.image?.edges
  const digitalSection = res?.directionalSection

  const isUrdu = params.lang === 'ur'

  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>

      {/* Portfolios */}
      {/* <PortfolioSection
          sectionType='digital'
          title='Our portfolio'
          path={digitalPrivateSectorEngagementsUrl}
          type='Private Sector Engagements'
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
                      ? `/${params.lang}${digitalPrivateSectiorChalllange}/${digitalSection[key]?.buttonLinkSlug}`
                      : `${digitalPrivateSectiorChalllange}/${digitalSection[key]?.buttonLinkSlug}`
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
              <h4 className='tx-blue20gy-4'>{isUrdu ? 'متعلقہ میڈیا' : 'Related media'}</h4>
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
