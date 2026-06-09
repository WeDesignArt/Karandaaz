import Image from 'next/image'
import './page.css'
import { GetUrlsArray } from '../../../utils/images'
import { ImagesMarquee } from '../components/extra/imagesMarquee'
import SponsorsFooter from '../components/navigation/sponsors-footer'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { careersAvailablePositions } from '../../../utils/urls'
import ValueCard from '../components/core/cards/value-card'
import { getCareersPageFields } from '../api/lib/careers'

export function generateMetadata() {
  const title = `Join Karandaaz: Drive Shared Prosperity with Us`
  const description = `Discover career opportunities at Karandaaz, where our values of innovation, collaboration, accountability, respect, & equity drive our mission of financial inclusion & economic empowerment.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz careers',
      'Financial inclusion jobs Pakistan',
      'Economic empowerment opportunities',
      'Innovation culture',
      'Collaborative work environment',
      'Accountability in employment',
      'Respect in workplace',
      'Equity and diversity',
      'Karandaaz benefits',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/careers`,
      siteName: 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@defaultsite',
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function Careers({ params }: any) {
  const res = await getCareersPageFields(params.lang)
  const swiperImages = res?.marqueeimages?.edges
  const valuesSection = res?.valuessection
  const benefitsSection = res?.benefitssection
  const alumSection = res?.alumsection
  const rolesSection = res?.rolessection?.cards
  const isUrdu = params.lang === 'ur'

  return (
    <>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={res?.headersection?.heading}
          subheading={res?.headersection?.subheading}
          lang={params.lang}
        />
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto text-center'>
              <a
                className='butn butn-solid'
                href={isUrdu ? `/${params.lang}${careersAvailablePositions}` : careersAvailablePositions}
              >
                {res?.headersection?.buttontext}
              </a>
            </div>
          </div>
        </div>
        <ImagesMarquee urls={GetUrlsArray(swiperImages)} />
      </section>
      <section className='section-py-sm'>
        <div className='container'>
          <div className='bg-blue00 br-r20 mb-4'>
            <div className='row p-4 p-md-5'>
              <div className='col-md-4'>
                <h2 className='tx-krnblue pb-2 pb-md-2'>{valuesSection?.valuestopcard?.heading}</h2>
              </div>
              <div className='col-md-8'>
                <div className='mb-3' dangerouslySetInnerHTML={{ __html: valuesSection?.valuestopcard?.description }} />

                {/* <a
                  className='butn butn-solid mx-0 mb-0'
                  href='https://krndevelop.wpenginepowered.com/wp-content/uploads/2017/02/Code-of-Conduct-and-Ethics.pdf'
                  target='_blank'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='700'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  {valuesSection?.valuestopcard?.buttontext}
                </a> */}
              </div>
            </div>
          </div>
          {/* Values Cards Section */}
          <div className='row gy-4'>
            {valuesSection?.valuessubsection?.map((card: any, index: number) => {
              // Convert the index to a number
              const colClass = index < 2 ? 'col-md-6' : 'col-md-4' // 0 and 1 will be col-md-6, 2 and beyond will be col-md-4

              return (
                <div
                  key={index} // Move the key here for correct usage
                  className={colClass}
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  <ValueCard
                    imageUrl={card.image?.node?.sourceUrl}
                    heading={card?.heading}
                    subheading={card?.description}
                    logoHeight='80px'
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* <section className='section-py-sm'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <Image
                src={valuesSection?.valuesendcard?.image?.node?.sourceUrl}
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes='100vw'
                alt=''
              />
            </div>
            <div className='col-md-5 mt-4 mt-md-0'>
              <div className='bg-blue00 br-r20 p-4 p-md-5 h-100'>
                <h4 className='tx-grey40'>Karandaaz is</h4>
                <div
                  className='tx-krnblue pb-2 pb-md-2'
                  dangerouslySetInnerHTML={{ __html: valuesSection?.valuesendcard?.heading }}
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='800'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                />

                <p
                  className='mb-0 mb-md-3'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  {valuesSection?.valuesendcard?.description}
                </p>
                <a
                  className='butn butn-solid mx-0'
                  href={isUrdu ? `/${params.lang}/${careersAvailablePositions}` : careersAvailablePositions}
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1200'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  {valuesSection?.valuesendcard?.buttontext}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section
        className='section-py-md benefitssec'
        style={{
          // backgroundImage: `url(http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/benefitsbg.png)`,
          width: '100%',
          height: '100%',
        }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='tx-white mb-2 mb-md-4'>{benefitsSection?.heading}</h2>
              <div
                className='tx-white mb-2 mb-md-4'
                dangerouslySetInnerHTML={{ __html: benefitsSection?.description }}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <h6 className='tx-medium tx-white mt-3 mb-3 mt-md-5 mb-md-4'>
                {benefitsSection?.financialbullets?.header}
              </h6>
              <ul className='benefitslist'>
                {benefitsSection?.financialbullets?.bullets.map((bullet: any, index: string) => {
                  return (
                    <li
                      key={index}
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
                        src={bullet?.bulletimage?.node?.sourceUrl}
                        width={0}
                        height={0}
                        style={{ width: '36px', height: '36px' }}
                        sizes='100vw'
                        alt=''
                      />
                      {bullet?.bullettext}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='offset-md-1 col-md-7'>
              <h6 className='tx-medium tx-white mt-3 mb-3 mt-md-5 mb-md-4'>
                {benefitsSection?.nonfinancialbullets?.header}
              </h6>
              <ul className='benefitslist'>
                {benefitsSection?.nonfinancialbullets?.bullets.map((bullet: any, index: string) => {
                  return (
                    <li
                      data-aos='fade-up'
                      data-aos-offset='200'
                      data-aos-delay='50'
                      data-aos-duration='1200'
                      data-aos-easing='ease-in-out'
                      data-aos-mirror='true'
                      data-aos-once='true'
                      data-aos-anchor-placement='top-bottom'
                    >
                      <Image
                        src={bullet?.bulletimage?.node?.sourceUrl}
                        width={0}
                        height={0}
                        style={{ width: '36px', height: '36px' }}
                        sizes='100vw'
                        alt=''
                      />
                      {bullet?.bullettext}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md krn-alum'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h2 className='text-center'>{alumSection?.title}</h2>
              <p className='mt-3 text-center'>{alumSection?.description}</p>
            </div>
          </div>
          <div className='row mt-4 gy-4'>
            {alumSection?.cards?.map((alum: any, index: string) => {
              const orderClass = index == '1' ? 'order-md-1' : ''
              const bgClass = index == '1' ? 'bg-blue00' : 'bg-yellow00'
              return (
                <>
                  <div className={`col-sm-12 col-md-4 ${orderClass}`} key={index}>
                    <Image
                      src={alum?.image?.node?.sourceUrl}
                      width={0}
                      height={0}
                      style={{ width: '100%', height: '100%' }}
                      sizes='100vw'
                      alt=''
                      className='object-fit-cover'
                      data-aos='fade-in'
                      data-aos-offset='200'
                      data-aos-delay='50'
                      data-aos-duration='1000'
                      data-aos-easing='ease-in-out'
                      data-aos-mirror='true'
                      data-aos-once='true'
                      data-aos-anchor-placement='top-bottom'
                    />
                  </div>
                  <div className='col-sm-12 col-md-8'>
                    <div className={`${bgClass} p-4 br-r20 h-100`}>
                      <div
                        className='mb-2 mb-md-4 tx-grey100'
                        dangerouslySetInnerHTML={{ __html: alum?.description }}
                      />
                      <h6 className='tx-medium'> {alum?.name}</h6>
                      <div className='tx-grey60' dangerouslySetInnerHTML={{ __html: alum?.designation }} />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className='row section-py-md pb-0 gy-4'>
            {rolesSection?.map((role: any, index: string) => {
              return (
                <div className='col-md-6' key={index}>
                  <div className='career-fancybox h-100 bg-grey p-4 br-r20'>
                    <Image
                      src={role?.image?.node?.sourceUrl}
                      className='mb-4'
                      width={0}
                      height={0}
                      style={{ width: '75px', height: 'auto' }}
                      sizes='100vw'
                      alt=''
                      data-aos='fade-in'
                      data-aos-offset='200'
                      data-aos-delay='50'
                      data-aos-duration='1000'
                      data-aos-easing='ease-in-out'
                      data-aos-mirror='true'
                      data-aos-once='true'
                      data-aos-anchor-placement='top-bottom'
                    />
                    <h5 className='tx-grey100'>{role?.heading}</h5>
                    <p className='tx-grey70 fs-6'>{role?.description}</p>
                  </div>
                </div>
              )
            })}

            <div className='col-md-6'>
              <div className='bg-blue00 p-4 br-r20'>
                <h4 className='tx-krnblue pb-2 pb-md-2'>{res?.joinuscard?.heading}</h4>
                <p className='mb-0'>{res?.joinuscard?.description}</p>
                <a
                  className='butn butn-solid mx-0 mt-3 text-center'
                  href={isUrdu ? `/${params.lang}/${careersAvailablePositions}` : careersAvailablePositions}
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  {res?.joinuscard?.buttontext}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SponsorsFooter />
    </>
  )
}

{
  /* <div className={`${colClass}`} key={index}>
<div className='career-fancybox bg-grey p-2 p-md-4 br-r20 my-2 my-md-3'>
  <Image
    src={card?.image?.node?.sourceUrl}
    className='mb-2 mb-md-4'
    width={0}
    height={0}
    style={{ width: '242px', height: '178px' }}
    sizes='100vw'
    alt=''
  />
  <h5 className='tx-grey100'>{card?.heading}</h5>
  <p className='tx-grey70'>{card?.description}</p>
</div>
</div> */
}
