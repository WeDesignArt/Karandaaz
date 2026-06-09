import Image from 'next/image'
import { GoArrowUpRight } from 'react-icons/go'
import { GetUrlsArray } from '../../../utils/images'
import { getAboutPageFields } from '../api/lib/about'
import { ImagesMarquee } from '../components/extra/imagesMarquee'
import SponsorsFooter from '../components/navigation/sponsors-footer'
import { SubscriptionSection } from '../components/sections/subscription-section'
import { TopHeaderSection } from '../components/sections/top-header-section'
import './page.css'

export async function generateMetadata() {
  const aboutRes = await getAboutPageFields() // Fetch SEO data dynamically from Yoast

  return {
    title: aboutRes?.seo?.title || 'Default Title',
    description: aboutRes?.seo?.metaDesc || 'Default Description',
    keywords: [
      'Karandaaz Pakistan',
      'Inclusive growth',
      'Innovation in finance',
      'EAGR program',
      'SEED program',
      'FCDO partnerships',
      'Financial inclusion solutions',
      'Technology-enabled finance',
    ],
    openGraph: {
      title: aboutRes?.seo?.title || 'Default OG Title',
      description: aboutRes?.seo?.metaDesc || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/about-karandaaz`,
      siteName: aboutRes?.seo?.ogSiteName || 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: aboutRes?.seo?.ogLocale || 'en_US',
      type: aboutRes?.seo?.ogType || 'website',
    },
    twitter: {
      card: aboutRes?.seo?.twitterCard || 'summary_large_image',
      site: aboutRes?.seo?.twitterSite || '@defaultsite',
      title: aboutRes?.seo?.title || 'Default Twitter Title',
      description: aboutRes?.seo?.metaDesc || 'Default Twitter Description',
      image:
        aboutRes?.seo?.ogImage ||
        'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function About({ params }: any) {
  const aboutRes = await getAboutPageFields(params.lang)
  const res = aboutRes?.aboutmainpage
  const marqueeImages = res?.imagesmarquee?.edges
  const isUrdu = params.lang === 'ur'
  // console.log(aboutRes?.seo?.fullHead);
  return (
    <>
      {/* <SEOHead seoData={seoData} /> */}
      <main>
        <section className='section-py-md'>
          <TopHeaderSection heading={res?.heading} lang={params.lang} />
          <ImagesMarquee urls={GetUrlsArray(marqueeImages)} />
        </section>
        <section className='section-py-md bg-grey'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <p className='tx-krnlue mb-3 text-center tx-krnblue'>{res?.whosection?.sectionHeading}</p>
                <h2 className='mb-5 text-center'>{res?.whosection?.subHeading}</h2>
              </div>
              <div
                className='col-md-6'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='500'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              >
                <div
                  className={`${isUrdu ? 'ps-md-5' : 'pe-md-5'} pt-md-4`}
                  dangerouslySetInnerHTML={{ __html: res?.whosection?.description }}
                />
              </div>
              <div
                className='col-md-6'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='1000'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              >
                <Image
                  src={res?.whosection?.image?.node?.sourceUrl}
                  className='mb-2 mb-md-4 br-r20'
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes='100vw'
                  alt=''
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className='section-py-md ourvision'
          style={{
            backgroundImage: `url(http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/ourvisionbg.png)`,
            width: '100%',
            height: '100%',
          }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='ourvision-box'>
                  <div className='d-md-none'>
                    <Image
                      src={res?.whosection?.visioncard?.image?.node?.sourceUrl}
                      className='br-r20'
                      width={0}
                      height={0}
                      style={{ width: '130px', height: '116px' }}
                      sizes='100vw'
                      alt=''
                    />
                  </div>
                  <p className='tx-white mb-4'>{res?.whosection?.visioncard?.heading}</p>
                  <h4 className='tx-white'>{res?.whosection?.visioncard?.subheading}</h4>
                  <div
                    className='text-end d-none d-md-block'
                    data-aos='fade-up'
                    data-aos-offset='200'
                    data-aos-delay='50'
                    data-aos-duration='500'
                    data-aos-easing='ease-in-out'
                    data-aos-mirror='true'
                    data-aos-once='true'
                    data-aos-anchor-placement='top-bottom'
                  >
                    <Image
                      src={res?.whosection?.visioncard?.image?.node?.sourceUrl}
                      className='br-r20'
                      width={0}
                      height={0}
                      style={{ width: '130px', height: '116px' }}
                      sizes='100vw'
                      alt=''
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-8 mt-4 mt-md-0'>
                <div
                  className='ourmission-box'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  <div className='text-md-end'>
                    <Image
                      src={res?.whosection?.missionCard?.image?.node?.sourceUrl}
                      className='br-r20'
                      width={0}
                      height={0}
                      style={{ width: '124px', height: '117px' }}
                      sizes='100vw'
                      alt=''
                    />
                  </div>
                  <p className='mb-4 tx-krnblue'>{res?.whosection?.missionCard?.heading}</p>
                  <h4 className=''>{res?.whosection?.missionCard?.subheading}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='tabs section-py-sm pt-0 pb-0'>
          <div className='tabslist'>
            <div className='tab-content' id='myTabContent'>
              <div className='tab-pane fade show active' id='one-tab-pane' role='tabpanel' aria-labelledby='one-tab'>
                <section className='section-py-md what-we-do'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <p className='text-center tx-krnblue'>{res?.whatsection?.sectionHeading}</p>
                        <div
                          className='mb-5 text-center'
                          dangerouslySetInnerHTML={{ __html: res?.whatsection?.subheading }}
                        />
                      </div>

                      {res?.whatsection?.cards?.map((card: any) => {
                        return (
                          <div
                            className='col-md-6'
                            data-aos='fade-up'
                            data-aos-offset='200'
                            data-aos-delay='50'
                            data-aos-duration='1000'
                            data-aos-easing='ease-in-out'
                            data-aos-mirror='true'
                            data-aos-once='true'
                            data-aos-anchor-placement='top-bottom'
                          >
                            <div className='vertical-box'>
                              <a href={isUrdu ? `/${params.lang}/${card?.navigateto}` : `/${card?.navigateto}`}>
                                <Image
                                  src={card?.backgroundImage?.node?.sourceUrl}
                                  className='br-r20'
                                  width={0}
                                  height={0}
                                  style={{ width: '100%' }}
                                  sizes='100vw'
                                  alt='cardsimage'
                                />
                                <div className={card?.theme == 'dark' ? 'tx-white arrow-box' : 'tx-krnblue arrow-box'}>
                                  <GoArrowUpRight />
                                </div>
                                <div className='content-box'>
                                  <Image
                                    src={card?.headerImage?.node?.sourceUrl}
                                    className=''
                                    width={0}
                                    height={0}
                                    style={{ width: '25%', height: '100%' }}
                                    sizes='100vw'
                                    alt=''
                                  />
                                  <p className={`mb-0 ${card?.theme == 'dark' ? 'tx-white' : 'tx-grey100'}`}>
                                    {card?.description}
                                  </p>
                                </div>
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>
                {/* <section className='section-py-md bg-blue00'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-sm-12 offset-md-2 col-md-8'>
                        <p className='tx-krnlue mb-3 text-center tx-krnblue'>
                          {res?.focusareasSection?.sectionHeading}
                        </p>
                        <div
                          className='mb-5 text-center'
                          dangerouslySetInnerHTML={{ __html: res?.focusareasSection?.subheading }}
                        />
                      </div>
                      {res?.focusareasSection?.cards?.map((card: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className='col-sm-12 col-md-4 fa-card-wrapper'
                            data-aos='fade-up'
                            data-aos-offset='200'
                            data-aos-delay='50'
                            data-aos-duration='1000'
                            data-aos-easing='ease-in-out'
                            data-aos-mirror='true'
                            data-aos-once='true'
                            data-aos-anchor-placement='top-bottom'
                          >
                            <div className='fa-card'>
                              <Image
                                src={card?.image?.node?.sourceUrl}
                                className='mb-4'
                                width={0}
                                height={0}
                                style={{ width: '100%', height: '256px' }}
                                sizes='100vw'
                                alt=''
                              />
                              <h5>{card?.title}</h5>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section> */}
                <section className='section-py-md bg-blue00'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <p className='tx-krnlue mb-3 text-center tx-krnblue'>{res?.strategyReport?.sectionHeading}</p>
                        <h2 className='mb-5 text-center'>{res?.strategyReport?.subHeading}</h2>
                      </div>
                      <div
                        className='col-md-6'
                        data-aos='fade-up'
                        data-aos-offset='200'
                        data-aos-delay='50'
                        data-aos-duration='500'
                        data-aos-easing='ease-in-out'
                        data-aos-mirror='true'
                        data-aos-once='true'
                        data-aos-anchor-placement='top-bottom'
                      >
                        <div
                          className={`${isUrdu ? 'ps-md-5' : 'pe-md-5'} pt-md-4`}
                          dangerouslySetInnerHTML={{ __html: res?.strategyReport?.description }}
                        />
                        <a
                          className='butn butn-solid butn-large ms-0 mt-3 text-center'
                          href={res?.strategyReport?.report?.node?.mediaItemUrl}
                          target='_blank'
                        >
                          {isUrdu ? 'حکمت عملی' : 'Explore the Strategy'}
                        </a>
                      </div>
                      <div
                        className='col-md-6'
                        data-aos='fade-up'
                        data-aos-offset='200'
                        data-aos-delay='50'
                        data-aos-duration='1000'
                        data-aos-easing='ease-in-out'
                        data-aos-mirror='true'
                        data-aos-once='true'
                        data-aos-anchor-placement='top-bottom'
                      >
                        <Image
                          src={res?.strategyReport?.image?.node?.sourceUrl}
                          className='mb-2 mb-md-4 br-r20'
                          width={0}
                          height={0}
                          style={{ width: '100%', height: 'auto' }}
                          sizes='100vw'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className='section-py-md' dir='ltr'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-sm-12 offset-md-1 col-md-10'>
                        <h3 className='mb-5 text-center'>{res?.lastSection?.heading}</h3>
                        <div className='d-flex justify-content-center'>
                          <iframe
                            width='854'
                            height='480'
                            src='https://www.youtube.com/embed/vh7EPLut9oA'
                            allowFullScreen
                            title='Embedded Video'
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div className='section-py-md bg-blue00'>
                  <SubscriptionSection lang={params.lang} />
                </div>
                <SponsorsFooter />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
