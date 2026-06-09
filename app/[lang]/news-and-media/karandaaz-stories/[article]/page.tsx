import { notFound } from 'next/navigation'
import { getStoryBySlug } from '../../../api/lib/news-media'
import Image from 'next/image'
import React from 'react'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { SubscriptionSection } from '../../../components/sections/subscription-section'
import SponsorsFooter from '../../../components/navigation/sponsors-footer'
import RelatedMediaSection from '../../../components/sections/related-media-section'
import moment from 'moment'
export default async function Article({ params }: { params: { article: string; lang: any } }) {
  const res = await getStoryBySlug(params?.article)
  if (!res) {
    return notFound()
  }
  const isUrdu = params.lang === 'ur'

  return (
    <main className='article-page'>
      <section className='section-py-md'>
        <div className='container' dir='ltr'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <Breadcrumb lang={params.lang} />
              <h2 className='text-center'>{res?.title}</h2>
              <div className='text-center my-3'>{res?.date ? moment(res?.date).format('MMMM D YYYY') : ''}</div>
              <div className='mt-5 mb-4 mb-md-5'>
                {res?.stories?.videoLink ? (
                  <iframe src={res?.stories?.videoLink} width='100%' height='500px' title='Video' allowFullScreen />
                ) : (
                  <Image
                    src={res?.featuredImage?.node?.sourceUrl}
                    width={0}
                    height={0}
                    style={{ width: '100%', height: 'auto' }}
                    sizes='100vw'
                    alt='Article Image'
                  />
                )}
              </div>
            </div>
            <div className='offset-md-2 col-sm-12 col-md-8 content-block'>
              <div dangerouslySetInnerHTML={{ __html: res?.content }} />
            </div>
          </div>
        </div>
      </section>
      <RelatedMediaSection className='' heading={isUrdu ? 'متعلقہ میڈیا' : 'Related media'} isUrdu={isUrdu} />
      <div className='section-py-md'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
