import { notFound } from 'next/navigation'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { SubscriptionSection } from '../../../components/sections/subscription-section'
import RelatedMediaSection from '../../../components/sections/related-media-section'
import ShareButtons from '../../../components/core/share-buttons'
import SponsorsFooter from '../../../components/navigation/sponsors-footer'
import { getBlogsBySlug } from '../../../api/lib/research'
// TODO Hunain to style blockquotes
export default async function Article({ params }: { params: { article: string; lang: any } }) {
  const res = await getBlogsBySlug(params?.article)
  if (!res) {
    return notFound()
  }
  const blogpost = res?.blogpost
  const author = res?.author
  const isUrdu = params.lang === 'ur'

  return (
    <main className='blog-page' dir='ltr'>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <Breadcrumb lang={params.lang} />
              <h2 className='text-center'>{res?.title}</h2>
              <p className='body1 text-center my-4'>
                {res?.date ? moment(res?.date).format('MMMM D YYYY') : ''} <span className='px-3'>|</span>{' '}
                <span className='mx-2'> {author?.node.name}</span>
              </p>
              <Image
                src={res?.featuredImage?.node?.sourceUrl}
                className='mb-5 object-fit-cover'
                width={0}
                height={0}
                style={{ width: '100%', height: '560px' }}
                sizes='100vw'
                alt=''
              />
            </div>
            <div className='col-sm-12 col-md-7 content-block'>
              <div dangerouslySetInnerHTML={{ __html: res?.content }} />
            </div>
            <aside className='offset-md-1 col-sm-12 col-md-4 sticky-top'>
              <h5 className='mb-3'>Summary</h5>
              <p>{blogpost?.summary}</p>
              <hr className='bg-brgrey'></hr>
              <ShareButtons />
            </aside>
          </div>
          <div className='row'>
            {/* Citations */}
            {blogpost?.citations?.allCitations ? (
              <div className='citations'>
                <h4>References/Citations</h4>
                <div dangerouslySetInnerHTML={{ __html: blogpost?.citations?.allCitations }} />
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section className='section-py-md magazine-section container'>
        {/* Magazine Article */}
        {blogpost?.magazinefeature?.map((article: any) => {
          return (
            <div className='d-flex'>
              {/* <Image src='https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/success.png' width={200} height={100} alt='' /> */}
              <div className='magazine-content'>
                <h4>{article?.article?.heading}</h4>
                <p>{article?.article?.description}</p>
                <button className='butn-outline'>Explore the Issue</button>
              </div>
            </div>
          )
        })}
      </section>

      <RelatedMediaSection className='' heading={isUrdu ? 'متعلقہ میڈیا' : 'Related media'} isUrdu={isUrdu} />
      <div className='section-py-md'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </main>
  )
}
