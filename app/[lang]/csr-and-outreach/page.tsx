
import React from 'react'
import './page.css'
import { GetUrlsArray } from '../../../utils/images'
import { ImagesMarquee } from '../components/extra/imagesMarquee'
import SponsorsFooter from '../components/navigation/sponsors-footer'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { csrAndOutreachUrl } from '../../../utils/urls'
import { DirectionalSection } from '../components/sections/directional-section'
import { GetInTouchSection } from '../components/sections/get-in-touch-section'
import { getCsrPageFields } from '../api/lib/csr'

export function generateMetadata() {
  const title = `CSR & Outreach | Karandaaz`
  const description = `Explore Karandaaz CSR and outreach initiatives driving financial inclusion and economic empowerment across Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/csr-and-outreach`,
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

export default async function CsrAndOutreach({ params }: any) {
  const res = await getCsrPageFields(params.lang)
  const swiperImages = res?.marqueeimages?.edges
  const alumSection = res?.alumsection
  const isUrdu = params.lang === 'ur'

  const information = res?.faqs || []
  const directionalSection = res?.directionalSection

  return (
    <>
      <section className='section-py-md'>
        <TopHeaderSection heading={res?.headersection?.heading} lang={params.lang} />
        <div className='container'>
          <h1 className='text-center'>CSR &amp; Outreach</h1>
        </div>
        <ImagesMarquee urls={GetUrlsArray(swiperImages)} />
      </section>

      <section className='section-py-md krn-alum'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h2 className='text-center'>{alumSection?.title}</h2>
              <p className='mt-3 text-center'>{alumSection?.description}</p>
            </div>
          </div>
        </div>
      </section>

      

      {directionalSection && (
        <div>
          <div>
            <section className='bg-grey sections-wrapper'>
              {Object.keys(directionalSection).map((key, index) => {
                return (
                  <DirectionalSection
                    key={index}
                    title={directionalSection[key]?.title}
                    desc={directionalSection[key]?.description}
                    imageUrl={directionalSection[key]?.image?.node?.mediaItemUrl}
                    buttonLink={
                      isUrdu
                        ? `/${params.lang}${csrAndOutreachUrl}/${directionalSection[key]?.buttonLinkSlug}`
                        : `${csrAndOutreachUrl}/${directionalSection[key]?.buttonLinkSlug}`
                    }
                    rightToLeft={index % 2 == 0 ? true : false}
                    sectionID={`section${index + 1}`}
                    buttonText={directionalSection[key]?.buttontitle}
                    isUrdu={isUrdu}
                  />
                )
              })}
            </section>
          </div>
        </div>
      )}

      <section className='section-py-md'>
        <div className='container'>
         <h1 className='text-center mb-4'> FAQ's</h1>
          <div className='accordion' id='accordionExample'>
            {information.map((item: any, index: number) => (
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
                    {item.heading}
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
            <div className='d-flex justify-content-center mt-5'>
            <a href="https://www.karandaaz.com.pk/faqs"  className='butn butn-solid'> View more</a>
            </div>
          </div>
        </div>
      </section>

      <div className='section-py-md bg-grey'>
        <GetInTouchSection lang={params.lang} />
      </div>

      <SponsorsFooter />
    </>
  )
}
