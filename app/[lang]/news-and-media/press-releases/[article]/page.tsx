import { notFound } from 'next/navigation'
import { getPressReleaseBySlug } from '../../../api/lib/news-media'
import Image from 'next/image'
import React from 'react'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { SubscriptionSection } from '../../../components/sections/subscription-section'
import moment from 'moment'
import './page.css'
import { homepageUrl } from '../../../../../utils/urls'
export default async function Article({ params }: { params: { article: string; lang: any } }) {
  const res = await getPressReleaseBySlug(params?.article)
  if (!res) {
    return notFound()
  }
  return (
    <div>
      <section className='section-py-md press-release'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <Breadcrumb />
              <h2 className='text-center'>{res?.title}</h2>
              <p className='body1 text-center my-4'>
                {res?.date ? moment(res?.date).format('MMMM D YYYY') : ''} <span className='px-3'> | </span>
                <a href={homepageUrl}>
                  <Image
                    src='https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/08/krnlogoauthor.png'
                    width={100}
                    height={100}
                    alt='Karandaaz Logo'
                    className='author-logo'
                  />
                </a>
                {'      '}
                {res?.author?.node?.name}
              </p>
              <Image
                src={res?.featuredImage?.node?.sourceUrl}
                className='mb-2 mb-md-5'
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes='100vw'
                alt=''
              />
            </div>
            <div className='offset-md-2 col-sm-12 col-md-8'>
              <div dangerouslySetInnerHTML={{ __html: res?.content }} />
            </div>
          </div>
        </div>
      </section>
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
    </div>
  )
}
