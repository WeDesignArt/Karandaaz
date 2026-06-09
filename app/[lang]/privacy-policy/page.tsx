import { Breadcrumb } from '../components/navigation/breadcrumb'
import './page.css'
import { getAdditionalPagesFields } from '../api/lib/additionalPages'
import { TopHeaderSection } from '../components/sections/top-header-section'

export default async function PrivacyPolicy({ params }: any) {
  const res = await getAdditionalPagesFields('home-privacypolicy', params.lang)
  const information = res?.information
  const isUrdu = params.lang === 'ur'

  return (
    <>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={isUrdu ? '<h2>پرائیویسی پالیسی</h2>' : '<h2>Privacy Policy</h2>'}
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
