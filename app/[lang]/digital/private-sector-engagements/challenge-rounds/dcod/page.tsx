import { getDigitalSubUrlField, getDigitalRelatedMedia, getChallangeRoundSubUrlField } from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import { ImagesSwiper } from '@/[lang]/components/extra/swiper'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { SubscriptionSection } from '@/[lang]/components/sections/subscription-section'
import { TopHeaderSection } from '@/[lang]/components/sections/top-header-section'
import { GetUrlsArray } from '../../../../../../utils/images'
import { GoArrowRight } from 'react-icons/go'
import Image from 'next/image'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'
import './page.css'
import { digitalPrivateSectorEngagementsUrl, digitalPublicInfrastructureUrl } from '../../../../../../utils/urls'

export default async function PrivateSectorEngagements({ params }: any) {
  const res = await getDigitalSubUrlField('digital-privatesectorengagements-challengerounds-dcod', params.lang)
  const resSubfields = await getChallangeRoundSubUrlField(
    'digital-privatesectorengagements-challengerounds-dcod',
    params.lang
  )
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const resFaqs = resSubfields.faqsSection
  const footerRes = await getFooter('digitalpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  const digitalSection = res?.directionalSection

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={res?.heading}
          subheading={res?.subheading}
          btntitle={res?.btntitle}
          lang={params.lang}
          btnstyle={'butn-solid'}
        />
      </section>
      <section className='section-py-md bg-grey'>
        <div className='container'>
          <div className='row'>
            <div className='offset-md-3 col-md-6'>
              <div className='text-center'>
                <h2 className='mb-3'>{resSubfields?.contentBoxSection?.heading}</h2>
                <p>{resSubfields?.contentBoxSection?.subHeading}</p>
              </div>
            </div>
          </div>
          <div className='fancyBoxes'>
            {resSubfields?.contentBoxSection.contentBox.map((item: any, index: number) => (
              <div className='box text-center'>
                <div className='row'>
                  <div className='col-md-9' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='bg-blue00 p-3 p-md-5 br-r20'>
                <div dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.boxSection }}></div>
                <div className='text-center'>
                  <a className='butn butn-solid mt-3' href={resSubfields?.contentCardSection?.buttonLink}>
                    {resSubfields?.contentCardSection?.buttonTitle} <GoArrowRight className='tx-large' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='bg-blue30 br-r20 p-4 application-date-card mb-4'>
                <div className='row col-md-12 mx-0'>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <div
                        dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.card1?.leftPart }}
                      ></div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <div
                        dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.card1?.rightPart }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-blue40 br-r20 p-4 application-date-card'>
                <div className='row col-md-12 mx-0'>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <div
                        dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.card2?.leftPart }}
                      ></div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <div
                        dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.card2?.rightPart }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 mt-4 mt-md-0'>
              <Image
                src={resSubfields?.contentCardSection?.image?.node?.mediaItemUrl}
                width={0}
                height={0}
                style={{ width: '100%', height: '100%' }}
                sizes='100vw'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-3 mb-md-5'>{resSubfields?.videoSection?.heading}</h2>
            </div>
            <div className='col-md-12'>
              <div dangerouslySetInnerHTML={{ __html: resSubfields?.videoSection?.videoEditor }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-py-md bg-grey'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-3 mb-md-5'>{resFaqs.heading}</h2>
              <div className='accordion' id='accordionExample'>
                {resFaqs.faqs.map((item: any, index: number) => (
                  <div className='accordion-item' key={index}>
                    <h2 className='accordion-header' id={`heading${index}`}>
                      <button
                        className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={`collapse${index}`}
                      >
                        {item.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent='#accordionExample'
                    >
                      <div className='accordion-body' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolios */}
      {/* <PortfolioSection
          sectionType='digital'
          title='Our portfolio'
          path={digitalPrivateSectorEngagementsUrl}
          type='Private Sector Engagements'
        /> */}
      {/* Swiper */}
      {/* <div>
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
                      ? `/${params.lang}/${digitalPrivateSectorEngagementsUrl}/${digitalSection[key]?.buttonLinkSlug}`
                      : `${digitalPrivateSectorEngagementsUrl}/${digitalSection[key]?.buttonLinkSlug}`
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
      </div> */}
      {resSubfields.contentBoxSection.Heading}
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
