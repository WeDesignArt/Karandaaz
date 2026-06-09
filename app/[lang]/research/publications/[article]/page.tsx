'use client'
import { getPublicationsBySlug } from '../../../api/lib/research'
import ShareButtons from '../../../components/core/share-buttons'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import Image from 'next/image'
import React from 'react'
import { event } from '../../../../../lib/gtag'

export default async function Article({ params }: { params: { article: string; lang: any } }) {
  const res = await getPublicationsBySlug(params?.article)
  const isUrdu = params.lang === 'ur'
  const handleButtonClick = () => {
    event({
      action: 'publication_download',
      category: 'Download Button click',
      label: 'Download Publication PDF',
      value: res?.title,
    })
  }
  return (
    <div>
      <section className='section-py-md' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <Breadcrumb lang={params.lang} />
              <h2 className='text-center mb-5'>{res?.title}</h2>
            </div>
            <div className='col-sm-12 col-md-8'>
              {res?.publicationsoptions?.subheading && <h5>{res?.publicationsoptions?.subheading}</h5>}
              <div dangerouslySetInnerHTML={{ __html: res?.content }} />
              <a
                className='butn butn-solid ms-0 text-center'
                href={res?.publicationsoptions?.reportfile?.node?.mediaItemUrl}
                target='_blank'
                onClick={handleButtonClick}
              >
                {isUrdu ? 'پی ڈی ایف ڈاؤن لوڈ کریں' : 'Download PDF'}
              </a>
            </div>
            <aside className='offset-md-1 col-sm-12 col-md-3 mt-4 mt-md-0'>
              <Image
                src={res?.featuredImage?.node?.sourceUrl}
                className='card-img-top'
                width={0}
                height={0}
                style={{ width: '188px', height: 'auto' }}
                sizes='100vw'
                alt=''
              />
              <hr className='bg-brgrey my-4'></hr>
              <ShareButtons />
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
