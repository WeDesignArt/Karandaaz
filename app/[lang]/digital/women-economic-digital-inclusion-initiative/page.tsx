import {
  getDigitalSubUrlField,
  getDigitalRelatedMedia,
  getWomenEconomicDigitalInclusionInitiative,
} from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import { BlogCard } from '@/[lang]/components/core/cards/blog-card'
import { ImagesSwiper } from '@/[lang]/components/extra/swiper'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { SubscriptionSection } from '@/[lang]/components/sections/subscription-section'
import { TopHeaderSection } from '@/[lang]/components/sections/top-header-section'
import { Counter } from '@/[lang]/components/core/counter'
import { GetUrlsArray } from '../../../../utils/images'
import { digitalPublicInfrastructureUrl } from '../../../../utils/urls'
import './page.css'

export default async function PublicSectorEngagements({ params }: any) {
  const res = await getDigitalSubUrlField('digital-womeneconomicdigitalinclusioninitiative', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const relatedPost = res?.relatedMedia?.relatedPosts
  const footerRes = await getFooter('digitalpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  const digitalSection = res?.directionalSection
  const res_page = await getWomenEconomicDigitalInclusionInitiative(
    'digital-womeneconomicdigitalinclusioninitiative',
    params.lang
  )
  const headingSection = res_page?.headingSection
  const subheadingSection = res_page?.subheadingSection
  const counterSection = res_page?.countersSection
  const taboneSection = res_page?.winnersSpotlight?.navItem1?.directionalSection
  const tabtwoSection = res_page?.winnersSpotlight?.navItem2?.directionalSection
  const tabthreeSection = res_page?.winnersSpotlight?.navItem3?.directionalSection

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        {' '}
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
      </section>
      <section className='counter-section'>
        <div className='container section-py-md border-top'>
          <div className='counter row justify-content-center'>
            {/* <div className='counter-grid'> */}
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={counterSection?.prefix1}
                value={counterSection?.number1}
                suffix={counterSection?.suffix1}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={counterSection?.prefix2}
                value={counterSection?.number2}
                suffix={counterSection?.suffix2}
              />
            </div>
            <div className='grid-item col-sm-12 col-md-4 p-4'>
              <Counter
                prefix={counterSection?.prefix3}
                value={counterSection?.number3}
                suffix={counterSection?.suffix3}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
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
          <section className='sections-wrapper bg-grey'>
            {Object.keys(digitalSection).map((key, index) => {
              return (
                <DirectionalSection
                  key={index}
                  title={digitalSection[key]?.title}
                  desc={digitalSection[key]?.description}
                  imageUrl={digitalSection[key]?.image?.node?.mediaItemUrl}
                  buttonLink={`${digitalPublicInfrastructureUrl}/${digitalSection[key]?.buttonLinkSlug}`}
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
      {/* <section className='section-py-md bg-grey'>
        <div className='container'>
          <div className='row'>
            <div className='offset-md-2 col-sm-12 col-md-8'>
              {headingSection ? (
                <div className='pb-3 text-center' dangerouslySetInnerHTML={{ __html: headingSection }} />
              ) : null}
              {subheadingSection ? (
                <div className='pb-3 text-center' dangerouslySetInnerHTML={{ __html: subheadingSection }} />
              ) : null}
            </div>
            <div className='row'>
              <div className='col-md-9 mx-auto'>
                <ul
                  className='nav nav-tabs d-flex align-items-center justify-content-center bg-white'
                  id='innerTab'
                  role='tablist'
                >
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link active'
                      id='inner-one-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#inner-one-tab-pane'
                      type='button'
                      role='tab'
                      aria-controls='inner-one-tab-pane'
                      aria-selected='true'
                    >
                      {res_page?.winnersSpotlight?.navItem1?.navlabel}
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='inner-two-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#inner-two-tab-pane'
                      type='button'
                      role='tab'
                      aria-controls='inner-two-tab-pane'
                      aria-selected='false'
                    >
                      {res_page?.winnersSpotlight?.navItem2?.navlabel}
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='inner-three-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#inner-three-tab-pane'
                      type='button'
                      role='tab'
                      aria-controls='inner-three-tab-pane'
                      aria-selected='false'
                    >
                      {res_page?.winnersSpotlight?.navItem3?.navlabel}
                    </button>
                  </li>
                </ul>
                <div className='tab-content' id='innerTab'>
                  <div
                    className='tab-pane fade show active'
                    id='inner-one-tab-pane'
                    role='tabpanel'
                    aria-labelledby='inner-one-tab'
                  >
                    {Object.keys(taboneSection).map((key, index) => {
                      return (
                        <DirectionalSection
                          key={index}
                          title={taboneSection[key]?.title}
                          desc={taboneSection[key]?.description}
                          imageUrl={taboneSection[key]?.image?.node?.mediaItemUrl}
                          buttonLink={`${digitalPublicInfrastructureUrl}/${taboneSection[key]?.buttonLinkSlug}`}
                          rightToLeft={index % 2 == 0 ? true : false}
                          sectionID={`section${index + 1}`}
                          buttonText={taboneSection[key]?.buttontitle}
                          isUrdu={isUrdu}
                        />
                      )
                    })}
                  </div>
                  <div
                    className='tab-pane fade'
                    id='inner-two-tab-pane'
                    role='tabpanel'
                    aria-labelledby='inner-two-tab'
                  >
                    {Object.keys(tabtwoSection).map((key, index) => {
                      return (
                        <DirectionalSection
                          key={index}
                          title={tabtwoSection[key]?.title}
                          desc={tabtwoSection[key]?.description}
                          imageUrl={tabtwoSection[key]?.image?.node?.mediaItemUrl}
                          buttonLink={`${digitalPublicInfrastructureUrl}/${tabtwoSection[key]?.buttonLinkSlug}`}
                          rightToLeft={index % 2 == 0 ? true : false}
                          sectionID={`section${index + 1}`}
                          buttonText={tabtwoSection[key]?.buttontitle}
                          isUrdu={isUrdu}
                        />
                      )
                    })}
                  </div>
                  <div
                    className='tab-pane fade'
                    id='inner-three-tab-pane'
                    role='tabpanel'
                    aria-labelledby='inner-three-tab'
                  >
                    {Object.keys(tabthreeSection).map((key, index) => {
                      return (
                        <DirectionalSection
                          key={index}
                          title={tabthreeSection[key]?.title}
                          desc={tabthreeSection[key]?.description}
                          imageUrl={tabthreeSection[key]?.image?.node?.mediaItemUrl}
                          buttonLink={`${digitalPublicInfrastructureUrl}/${tabthreeSection[key]?.buttonLinkSlug}`}
                          rightToLeft={index % 2 == 0 ? true : false}
                          sectionID={`section${index + 1}`}
                          buttonText={tabthreeSection[key]?.buttontitle}
                          isUrdu={isUrdu}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
