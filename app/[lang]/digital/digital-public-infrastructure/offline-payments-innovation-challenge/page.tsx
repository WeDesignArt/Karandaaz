import {
  getDigitalSubUrlField,
  getDigitalRelatedMedia,
  getChallangeRoundSubUrlField,
  getRaastRelatedMedia,
} from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { SubscriptionSection } from '@/[lang]/components/sections/subscription-section'
import { TopHeaderSection } from '@/[lang]/components/sections/top-header-section'
import { OfflinePaymentsInnovationChallengeForm } from '@/[lang]/components/forms/offline-payments-innovation-challenge-form'
import Image from 'next/image'
import { BlogCard } from '@/[lang]/components/core/cards/blog-card'
import WhoCanApplyCard from '@/[lang]/components/core/cards/who-can-apply-card'
import Keydates from '@/[lang]/components/sections/keydates'
import { GoArrowRight } from 'react-icons/go'
import './page.css'

export default async function OfflinePaymentsInnovationChallenge({ params }: any) {
  const res = await getDigitalSubUrlField('offline-payments-innovation-challenge', params.lang)
  const resSubfields = await getChallangeRoundSubUrlField('offline-payments-innovation-challenge', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const resFaqs = resSubfields.faqsSection
  const footerRes = await getFooter('digitalpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  const digitalSection = res?.directionalSection
  const thematicAreas = resSubfields?.thematicAreas
  const isUrdu = params.lang === 'ur'

  return (
    <main className='opicpage'>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={res?.heading || (isUrdu ? 'آف لائن پیمنٹس انوویشن چیلنج' : 'Offline Payments Innovation Challenge')}
          subheading={res?.subheading || ''}
          btntitle={isUrdu ? 'درخواست دیں' : 'Apply Now'}
          btnUrl={'#offlinePaymentsForm'}
          lang={params.lang}
          btnstyle={'butn-solid'}
          secondaryButton={true}
          proposalTemplate='https://krndevelop.wpenginepowered.com/wp-content/uploads/2025/08/TERMS-OF-REFERENCE-Offline-Payments.pdf'
          proposalTemplateText='View Terms of Reference'
        />
        {res?.information && <div className='mt-4 text-center' dangerouslySetInnerHTML={{ __html: res.information }} />}
      </section>
      <section className='section-py-md pt-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {resSubfields?.pageBanner?.desktopBanner?.node?.mediaItemUrl && (
                <Image
                  src={resSubfields?.pageBanner?.desktopBanner?.node?.mediaItemUrl}
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes='100vw'
                  alt=''
                  className='d-none d-md-block br-r12'
                />
              )}
              {resSubfields?.pageBanner?.mobileBanner?.node?.mediaItemUrl && (
                <Image
                  src={resSubfields?.pageBanner?.mobileBanner?.node?.mediaItemUrl}
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes='100vw'
                  alt=''
                  className='d-md-none br-r12'
                />
              )}
            </div>

            {resSubfields?.pageBanner?.videoBanner && (
              <div
                className='text-center'
                dangerouslySetInnerHTML={{ __html: resSubfields?.pageBanner?.videoBanner }}
              ></div>
            )}
          </div>
        </div>
      </section>
      <section className='section-py-md pt-0 thematicareas'>
        <div className='container'>
          <div className='row g-4'>
            <div className='col-md-12'>
              <h2 className='text-center mb-5'>{thematicAreas?.heading}</h2>
            </div>
            {thematicAreas?.cardSection?.map((card: any, index: number) => {
              return (
                <WhoCanApplyCard
                  key={index}
                  imageSrc={card?.cardImage?.node?.mediaItemUrl}
                  altText={'propsperity'}
                  title={card?.cardHeading}
                  description={card?.cardSubheading}
                />
              )
            })}
          </div>
        </div>
      </section>
      <section className='section-py-md pt-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='bg-blue00 p-3 p-md-5 br-r20'>
                <div dangerouslySetInnerHTML={{ __html: resSubfields?.contentCardSection?.boxSection }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md pt-0 video-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9 text-center mx-auto'>
              <h2 className='mb-2 mb-md-3'>{resSubfields?.videoSection?.heading}</h2>
              <div
                className='mb-3 mb-md-5'
                dangerouslySetInnerHTML={{ __html: resSubfields?.videoSection?.description }}
              ></div>
            </div>
            <div className='col-md-12'>
              <div
                className='text-center'
                dangerouslySetInnerHTML={{ __html: resSubfields?.videoSection?.videoEditor }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <Keydates
        data={resSubfields?.kayDatesSection}
        cardSection={resSubfields?.contentCardSection}
        DownloadProposalTemplate={false}
        TermsOfRefference='https://krndevelop.wpenginepowered.com/wp-content/uploads/2025/08/TERMS-OF-REFERENCE-Offline-Payments.pdf'
      />
      {/* <div className='text-center section-py-md pt-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <a className='butn butn-solid' href={resSubfields?.contentCardSection?.buttonLink}>
                {resSubfields?.contentCardSection?.buttonTitle} <GoArrowRight className='tx-large' />
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <section className='section-py-md bg-grey'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-3 mb-md-5'>{resFaqs?.heading}</h2>
              {/* <div dangerouslySetInnerHTML={{ __html: thematicAreas?.subHeading }} /> */}
              <div className='accordion' id='accordionExample'>
                {resFaqs?.faqs?.map((item: any, index: number) => (
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
      <section className='section-py-md' id='section3'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h2 id='offlinePaymentsForm' className='mb-5 text-center'>
                {'Apply Now'}
              </h2>
              <OfflinePaymentsInnovationChallengeForm lang={params.lang} />
            </div>
          </div>
        </div>
      </section>
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
