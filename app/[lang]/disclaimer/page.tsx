import { getAdditionalPagesFields } from '../api/lib/additionalPages'
import { TopHeaderSection } from '../components/sections/top-header-section'
import './page.css'

export default async function Disclaimer({ params }: any) {
  const res = await getAdditionalPagesFields('home-disclaimer', params.lang)
  const information = res?.information
  const isUrdu = params.lang === 'ur'
  return (
    <>
      <section className='section-py-md'>
        <TopHeaderSection heading={isUrdu ? '<h2>ڈس کلیمر</h2>' : '<h2>Disclaimer</h2>'} lang={params.lang} />
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
