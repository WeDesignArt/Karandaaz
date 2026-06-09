import { Breadcrumb } from '../../components/navigation/breadcrumb'
import './page.css'

export default async function BlackListedFirms({ params }: any) {
  const isUrdu = params.lang === 'ur'
  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>{isUrdu ? 'بلیک لسٹ کردہ کمپنیاں' : 'Blacklisted Firms'}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-sm'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <div className='blacklistirm pb-2 pb-md-3'>
                <a href='#' className='h6 tx-krnblue'>
                  Stoughton Associates (UK)
                </a>
              </div>
              <hr className='br-bggrey'></hr>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
