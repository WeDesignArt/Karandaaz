import { Breadcrumb } from '../components/navigation/breadcrumb'
import './page.css'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import { getProcurementPageFields } from '../api/lib/procurement'
import SponsorsFooter from '../components/navigation/sponsors-footer'
import {
  procurementBlacklistedFirms,
  procurementGeneralTermsConditionsUrl,
  procurementOpenUrl,
} from '../../../utils/urls'
import ValueCard from '../components/core/cards/value-card'
import OpenProcurementSection from '../components/sections/open-procurement-section'

export default async function Procurement({ params }: any) {
  const res = await getProcurementPageFields(params.lang)
  const isUrdu = params.lang === 'ur'
  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>{res?.procurementHeading}</h2>
            </div>
            <div className='col-md-9 text-center mx-auto'>
              <h4 className='tx-grey50'>{res?.procurementSubheading}</h4>
            </div>
            <div className='col-md-10 mx-auto text-center mt-2 mt-md-3'>
              <a
                href={isUrdu ? `/${params.lang}/${procurementOpenUrl}` : procurementOpenUrl}
                className='butn butn-solid'
              >
                {isUrdu ? 'معاہداتی مواقع دیکھیں' : 'View Contractual Opportunities'}
              </a>
            </div>
            <div className='col-md-8 mx-auto text-left mt-2 mt-md-3'>
              <div className='tx-grey70' dangerouslySetInnerHTML={{ __html: res?.procurementContent }} />
            </div>
          </div>
        </div>
      </section>

      <section className='section-py-md pt-5'>
        <div className='container'>
          {/* Values Cards Section */}
          <div className='row gy-4'>
            {res?.procurementCards?.map((card: any, index: string) => {
              const colClass = index == '3' || index == '4' ? 'col-md-6' : 'col-md-4'
              return (
                <div className={colClass}>
                  <ValueCard
                    key={index}
                    imageUrl={card.procurementCardImage.node.sourceUrl}
                    heading={card.procurementCardHeading}
                    subheading={card.procurementCardSubheading}
                    logoHeight='80px'
                  />
                </div>
              )
            })}
            <div className='offset-md-2 col-md-6'>
              <p className='text-left mt-3 mt-md-5'>
                {res?.procurementComplaintText}
                <br></br>
                <span className='tx-bold'>{res?.procurementComplaintEmail}</span>
              </p>
            </div>
          </div>
          <div className='row'>
            {isUrdu ? (
              <>
                <div className='offset-md-2 col-md-4'>
                  <a
                    className='butn butn-outline d-block text-center mx-0'
                    href={`/${params.lang}/${procurementGeneralTermsConditionsUrl}`}
                    dir='ltr'
                  >
                    <GoArrowLeft className='tx-large' />
                    عمومی شرائط و ضوابط
                  </a>
                </div>
                <div className='col-md-4'>
                  <a
                    className='butn butn-outline d-block text-center mx-0'
                    href={`/${params.lang}/${procurementBlacklistedFirms}`}
                    dir='ltr'
                  >
                    <GoArrowLeft className='tx-large' />
                    بلیک لسٹ کردہ کمپنیاں
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className='offset-md-2 col-md-4'>
                  <a className='butn butn-outline d-block text-center mx-0' href={procurementGeneralTermsConditionsUrl}>
                    General Terms & Conditions <GoArrowRight className='tx-large' />
                  </a>
                </div>
                <div className='col-md-4'>
                  <a className='butn butn-outline d-block text-center mx-0' href={procurementBlacklistedFirms}>
                    Blacklisted Firms <GoArrowRight className='tx-large' />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <OpenProcurementSection isUrdu={isUrdu} />
      <SponsorsFooter />
    </>
  )
}
