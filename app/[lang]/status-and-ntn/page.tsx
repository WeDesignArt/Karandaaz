import './page.css'
import { getAdditionalPagesFields } from '../api/lib/additionalPages'
import { TopHeaderSection } from '../components/sections/top-header-section'

export default async function StatusAndNTN({ params }: any) {
  const res = await getAdditionalPagesFields('home-statusandntn')
  const information = res?.information
  return (
    <>
      <section className='section-py-sm'>
        <TopHeaderSection heading=' <h2>Status and NTN</h2>' lang={params.lang} />
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
