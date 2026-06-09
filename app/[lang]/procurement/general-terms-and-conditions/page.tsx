import './page.css'
import { getProcurementGeneralTermsAndConditionFeilds } from '../../api/lib/procurement'
import { TopHeaderSection } from '../../components/sections/top-header-section'

export default async function GeneralTermsAndConditions({ params }: any) {
  const isUrdu = params.lang === 'ur'
  const res = await getProcurementGeneralTermsAndConditionFeilds('procurement-generalterms', params.lang)
  const information = res?.information
  return (
    <>
      <section className='section-py-sm'>
        <TopHeaderSection
          heading={isUrdu ? '<h2>عمومی شرائط و ضوابط</h2>' : '<h2>General Terms & Conditions </h2>'}
          lang={params.lang}
        />
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <div className='terms-conditions'>
                {information.map((info: any, index: string) => (
                  <div key={index}>
                    {info.heading && <h5>{info.heading}</h5>}
                    <div dangerouslySetInnerHTML={{ __html: info.content }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
