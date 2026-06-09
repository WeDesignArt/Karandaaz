import { getDigitalSubUrlField } from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import { ImagesSwiper } from '@/[lang]/components/extra/swiper'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { DirectionalSection } from '@/[lang]/components/sections/directional-section'
import { SubscriptionSection } from '@/[lang]/components/sections/subscription-section'
import { TopHeaderSection } from '@/[lang]/components/sections/top-header-section'
import { GetUrlsArray } from '../../../../../../utils/images'
import { digitalPublicInfrastructureUrl } from '../../../../../../utils/urls'

export default async function PublicInfrastructure({ params }: any) {
  const res = await getDigitalSubUrlField('digital-publicinfrastructure-pakistandigitalstack', params.lang)
  const footerRes = await getFooter('digitalpartners1', params.lang)
  const digitalSection = res?.directionalSection
  const swiperImages = footerRes?.image?.edges
  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={res?.heading}
          subheading={res?.subheading}
          btntitle={res?.btntitle}
          lang={params.lang}
        />
      </section>

      {/* Portfolios */}
      {/* <PortfolioSection
        sectionType='digital'
        title='Our portfolio'
        path={digitalPublicInfrastructureUrl}
        type='Digital Public Infrastructure'
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
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
