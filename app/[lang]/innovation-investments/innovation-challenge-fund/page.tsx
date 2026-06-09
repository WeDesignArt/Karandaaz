import Image from 'next/image'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import { ScrollNav } from '../../components/navigation/scroll-nav'
import { DirectionalSection } from '../../components/sections/directional-section'
import { ImagesSwiper } from '../../components/extra/swiper'
import { GetUrlsArray } from '../../../../utils/images'
import { getInnovationChallengePageFields } from '../../api/lib/innovation'
import { getFooter } from '../../api/lib/lib'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { contactUrl } from '../../../../utils/urls'
import './page.css'

export async function generateMetadata({ params }: any) {
  const res = await getInnovationChallengePageFields('innovation-challengefund', params.lang)
  const title = `Karandaaz Innovation and Challenge Funds`
  const description = `Explore Karandaaz Innovation Challenge Fund (ICF) initiatives aimed at addressing financial inclusion, SME barriers, and climate change through innovative grants. Learn more`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz Innovation',
      'Challenge Fund',
      'Innovation Challenge Fund',
      'Financial inclusion grants',
      'SME financing',
      'Climate change solutions',
      'Green projects funding',
      'Karandaaz ICF rounds',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/innovation-investments/innovation-challenge-fund`,
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

export default async function Innovationchallenge({ params }: any) {
  const res = await getInnovationChallengePageFields('innovation-challengefund', params.lang)
  const challengeSection = res?.sections
  const footerRes = await getFooter('our-partners', params.lang)
  const swiperImages = footerRes?.image?.edges

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md pb-0'>
        <TopHeaderSection lang={params.lang} />
      </section>

      <section className='section-py-md pb-0 subheader innovation-challenge'>
        <div className='container'>
          <div className='bg-blue00 section-py-md br-r20 mb-4'>
            <div className='row px-4 px-md-5'>
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
                <div dangerouslySetInnerHTML={{ __html: res?.card1?.heading }} />
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
                <p className='mb-0 mb-md-3'>{res?.card1?.description}</p>
                {isUrdu ? (
                  <a className='butn butn-solid mt-4' href={process.env.NEXT_PUBLIC_ICF_URL}>
                    فنڈ کے لیے درخواست دیں <GoArrowLeft className='tx-large' />
                  </a>
                ) : (
                  <a className='butn butn-solid mt-4' href={process.env.NEXT_PUBLIC_ICF_URL}>
                    Apply for Fund <GoArrowRight className='tx-large' />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='h-md-60 mb-4'>
                <Image
                  src={res?.image1?.node?.sourceUrl}
                  width={0}
                  height={0}
                  style={{ width: '100%', height: '100%' }}
                  className='br-20 object-fit-cover rounded-20'
                  sizes='100vw'
                  alt=''
                />
              </div>

              <div className='bg-blue40 br-r20 p-4 application-date-card'>
                <div className='row col-md-12 mx-0'>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <p className='tx-blue20 tx-medium tx-bold mb-0'>
                        {isUrdu ? 'درخواستیں کھل گئی ہیں' : 'Applications Open:'}
                      </p>
                      <p className='tx-white tx-medium tx-bold mb-0'>{res?.card2?.openDate}</p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='text-center py-2 py-md-4'>
                      <p className='tx-blue20 tx-medium tx-bold mb-0'>
                        {' '}
                        {isUrdu ? 'درخواستیں بند ہو جائیں گی' : 'Applications Close:'}
                      </p>
                      <p className='tx-white tx-medium tx-bold mb-0'>{res?.card2?.closedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 mt-4 mt-md-0'>
              <Image
                src={res?.image2?.node?.sourceUrl}
                width={0}
                height={0}
                style={{ width: '100%', height: '100%' }}
                className='br-r20'
                sizes='100vw'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      {/* Scrollable Section */}
      <ScrollNav items={challengeSection} />
      <div>
        <div>
          <section>
            <DirectionalSection
              key={1}
              title={challengeSection?.navitem1?.title}
              desc={challengeSection?.navitem1?.description}
              imageUrl={challengeSection?.navitem1?.image?.node?.sourceUrl}
              buttonLink={process.env.NEXT_PUBLIC_ICF_URL}
              buttonText={isUrdu ? `ICF کی ویب سائٹ پر جائیں` : `Go to ICF Website`}
              rightToLeft={false}
              arrowIcon={true}
              sectionID={`section${1}`}
              isUrdu={isUrdu}
            />
          </section>
          <section className='section-py-md pt-0' id={'section2'}>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <h2 className='mb-5 text-center'>{challengeSection?.navitem2?.title}</h2>
                  <div className='bg-blue00 p-3 p-md-5 br-r20'>
                    <div dangerouslySetInnerHTML={{ __html: challengeSection?.navitem2?.description }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Swiper */}
      <section className='section-py-md pt-0'>
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
