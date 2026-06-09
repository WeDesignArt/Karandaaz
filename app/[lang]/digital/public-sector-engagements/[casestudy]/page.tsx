import { notFound } from 'next/navigation'
import { getADigitalPortfolio } from '../../../api/lib/digital'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import SponsorsFooter from '../../../components/navigation/sponsors-footer'
import { SubscriptionSection } from '../../../components/sections/subscription-section'
import Image from 'next/image'

export default async function CaseStudy({ params }: { params: { casestudy: string; lang: any } }) {
  const res = await getADigitalPortfolio(params?.casestudy)
  if (!res) {
    return notFound()
  }
  return (
    <main>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-3'> {res?.title}</h2>
              <Image
                src={res?.featuredImage?.node?.sourceUrl}
                className='br-r20 mb-3 mb-md-5'
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes='100vw'
                alt=''
              />
            </div>
            <div className='col-md-10 mx-auto' dir='ltr'>
              <div className='tx-grey80' dangerouslySetInnerHTML={{ __html: res?.content }} />
              <div className='text-center mt-2 mt-md-5'>
                <a className='butn butn-solid butn-large' href='#'>
                  Read Full Study
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
