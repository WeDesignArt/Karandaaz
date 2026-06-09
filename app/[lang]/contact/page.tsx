import { ImagesSwiper } from '../components/extra/swiper'
import { ContactForm } from '../components/forms/contact-form'
import { Breadcrumb } from '../components/navigation/breadcrumb'
import { SubscriptionSection } from '../components/sections/subscription-section'
import { GetUrlsArray } from '../../../utils/images'
import { CiLocationOn } from 'react-icons/ci'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { PiPhoneCallLight } from 'react-icons/pi'
import { getContactFeilds } from '../api/lib/contact'
import Image from 'next/image'
import { getFooter } from '../api/lib/lib'
import './page.css'
import ContactCardsComponent from '../components/core/cards/contact-cards'
import { capitalUrl, digitalUrl, innovationUrl, researchUrl } from '../../../utils/urls'

export function generateMetadata() {
  const title = `Contact Karandaaz Pakistan: Reach Out, Explore Initiatives`
  const description = `Contact Karandaaz Pakistan for inquiries or collaborations. Explore our investment, funding, innovation, digital financial services, and research work. Get in touch today!`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Contact Karandaaz Pakistan',
      'Karandaaz Pakistan contact information',
      'Get in touch with Karandaaz',
      'Contact email Karandaaz',
      'Karandaaz Pakistan office address',
      'Inquire Karandaaz initiatives',
      'Karandaaz investment opportunities',
      'Karandaaz funding programs',
      'Karandaaz Innovation Challenge Fund',
      'Karandaaz Women Ventures',
      'Karandaaz digital financial services',
      'Karandaaz research initiatives',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/news-and-media/karandaaz-stories`,
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

export default async function Contact({ params }: any) {
  const res = await getContactFeilds('contact', params.lang)
  const investmentCards = res?.investmentCards || {}
  const engagementCards = res?.engagementCards || {}

  const footerRes = await getFooter('our-partners', params.lang)
  const swiperImages = footerRes?.image?.edges

  const isUrdu = params.lang === 'ur'

  return (
    <main>
      <section className='section-py-md pb-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className='d-flex align-items-start breadcrumb'>
                <Breadcrumb lang={params.lang} />
              </div>
              <h2 className='tx-krnblue'>{res?.heading}</h2>
              <div className='contact-detail'>
                <ul>
                  <li>
                    <PiPhoneCallLight /> <a href='tel:+92 (51) 8449761'>{res?.phoneNumber}</a>
                  </li>
                  <li>
                    <HiOutlineEnvelope /> <a href='mailto: info@karandaaz.com.pk'>{res?.email}</a>
                  </li>
                  <li>
                    <CiLocationOn /> <div dangerouslySetInnerHTML={{ __html: res?.address }} />
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md pb-0'>
        <div className='container'>
          <div className='row'>
            <div className='mapbox'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13273.136729126814!2d73.0876271!3d33.7274669!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7fffc1909d%3A0x9b4fa6f98d8b861e!2sKarandaaz%20Pakistan!5e0!3m2!1sen!2s!4v1721277829533!5m2!1sen!2s'
                width='100%'
                height='548px'
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-3 mb-md-5'>{res?.cardsHeading}</h2>
            </div>
            <div className='col-md-12'>
              <h4 className='mb-md-4'>{res?.investmentCards?.subheading}</h4>
            </div>
            <ContactCardsComponent
              heading={investmentCards.cardOne?.heading}
              paragraph={investmentCards.cardOne?.paragraph}
              imageSrc={investmentCards.cardOne?.image.node.sourceUrl}
              nextPath={isUrdu ? `/${params.lang}/${capitalUrl}` : capitalUrl}
              isUrdu={isUrdu}
            />
            <ContactCardsComponent
              heading={investmentCards.cardTwo?.heading}
              paragraph={investmentCards.cardTwo?.paragraph}
              imageSrc={investmentCards.cardTwo?.image.node.sourceUrl}
              nextPath={isUrdu ? `/${params.lang}/${innovationUrl}` : innovationUrl}
              isUrdu={isUrdu}
            />
            <div className='mb-2 mb-md-5 mt-2 mt-md-4'>
              <hr className='br-bggrey'></hr>
            </div>
            <div className='col-md-12'>
              <h4 className='mb-md-4'>{res?.engagementCards?.subheading}</h4>
            </div>
            <ContactCardsComponent
              heading={engagementCards.cardOne?.heading}
              paragraph={engagementCards.cardOne.paragraph}
              imageSrc={engagementCards.cardOne.image.node.sourceUrl}
              nextPath={isUrdu ? `/${params.lang}/${digitalUrl}` : digitalUrl}
              isUrdu={isUrdu}
            />
            <ContactCardsComponent
              heading={engagementCards.cardTwo?.heading}
              paragraph={engagementCards.cardTwo.paragraph}
              imageSrc={engagementCards.cardTwo.image.node.sourceUrl}
              nextPath={isUrdu ? `/${params.lang}/${researchUrl}` : researchUrl}
              isUrdu={isUrdu}
            />
          </div>
        </div>
      </section>
      <div className='section-py-md bg-grey'>
        <SubscriptionSection lang={params.lang} />
      </div>
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

      <div className='modal fade' id='exampleModalToggle' aria-hidden='true' aria-labelledby='exampleModalToggleLabel'>
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content text-center'>
            <div className='modal-body p-3 p-md-5'>
              <div className='row'>
                <div className='col-sm-12 offset-md-2 col-md-8'>
                  <Image
                    src='https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/success.png'
                    className='mb-3 mb-md-5'
                    width={0}
                    height={0}
                    style={{ width: 'auto', height: 'auto' }}
                    sizes='100vw'
                    alt=''
                  />
                  <h4 className='mb-3'>Application submitted</h4>
                  <p>
                    We have received your application and our team will review it shortly. We appreciate your interest
                    in joining Karandaaz and will get back to you soon.
                  </p>
                  <a className='butn butn-solid' href='#'>
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
