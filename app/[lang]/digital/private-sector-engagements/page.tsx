'use client'
import { useState } from 'react'
import { usePrivateSectorContext } from './PrivateSectorProvider'
import { ImagesSwiper } from '../../components/extra/swiper'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import PortfolioSection from '../../components/sections/portfolio-section'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { GetUrlsArray } from '../../../../utils/images'
import { digitalPrivateSectorEngagementsUrl, digitalPublicInfrastructureUrl } from '../../../../utils/urls'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'
import { AdoptionForm } from '@/[lang]/components/forms/adoption-form'
import Modal from 'react-bootstrap/Modal'

interface DigitalSection {
  directionalSection: Record<string, any> // Adjust based on the actual structure
  seo: {
    ogSiteName?: string
    ogLocale?: string
    ogType?: string
    twitterCard?: string
    twitterSite?: string
    ogImage?: string
  }
  heading?: string
  subheading?: string
}
interface PrivateSectorData {
  res: DigitalSection
  swiperImages: any
  footerRes: any
  resRelatedmedia: any
}

export default function PrivateSectorEngagements({ params }: any) {
  const { res, swiperImages, footerRes, resRelatedmedia }: PrivateSectorData = usePrivateSectorContext()
  const digitalSection = res?.directionalSection
  const isUrdu = params.lang === 'ur'
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
                      ? `/${params.lang}/${digitalPrivateSectorEngagementsUrl}/${digitalSection[key]?.buttonLinkSlug}`
                      : `${digitalPrivateSectorEngagementsUrl}/${digitalSection[key]?.buttonLinkSlug}`
                  }
                  rightToLeft={index % 2 == 0 ? true : false}
                  sectionID={`section${index + 1}`}
                  buttonText={digitalSection[key]?.buttontitle}
                  onclick={digitalSection[key]?.buttontitle ? undefined : handleShow}
                  isUrdu={isUrdu}
                />
              )
            })}
          </section>
        </div>
      </div>
      
      <Modal show={show} onHide={handleClose} size='xl' centered>
        <button type='button' className='btn-close' onClick={handleClose}></button>
        <div className='d-md-flex modal-wrapper'>
          <div className='modal-body'>
            <h3 className='text-center mb-5'>Apply Now</h3>
            <AdoptionForm />
          </div>
        </div>
      </Modal>

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
