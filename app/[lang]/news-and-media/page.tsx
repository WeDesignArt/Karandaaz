import { BlogCard } from '../components/core/cards/blog-card'
import { NewsGroup } from '../components/core/cards/news-group'
import { GetUrlsArray } from '../../../utils/images'
import { NewsletterCard } from '../components/core/cards/newsletter-card'
import { ImagesMarquee } from '../components/extra/imagesMarquee'
import { MediaEnquiryForm } from '../components/forms/mediaenquiry-form'
import { getNewsAndMediaPageFields, getNewsletters, getPressReleases, getStories } from '../api/lib/news-media'
import { mediaUrl, newsmediaNewsletterUrl, newsmediaPressUrl, newsmediaStoriesUrl } from '../../../utils/urls'
import { Footer } from '../components/navigation/footer'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { getMedia } from '../api/lib/news-media'
import { MediaCard } from '../components/core/cards/media-card'

export function generateMetadata({ params }: any) {
  const title = `Karandaaz Media Center: Press Releases, Newsletters, Stories, and Media Enquiries`
  const description = `Explore Karandaaz's media centre for press releases, newsletters, inspiring stories, and media contact information related to financial inclusion in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz media centre',
      'Financial inclusion updates',
      'Karandaaz press releases',
      'Pakistan finance news',
      'Media relations Karandaaz',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/news-and-media`,
      siteName: 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@defaultsite',
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}
export default async function NewsMedia({ params }: any) {
  const res = await getNewsAndMediaPageFields()
  const newsRes = await getNewsletters(3, params.lang)
  const pressRes = await getPressReleases(3)
  const storiesRes = await getStories(3)
  const swiperImages = res?.marqueeimages?.edges
  const resMedia = await getMedia(1, 3)
  return (
    <main>
      <section className='section-py-md media-form-page'>
        <TopHeaderSection heading={res?.heading} lang={params.lang} />
        <div className='container'>
          <NewsGroup title='News & Press Releases' theme='light' link={newsmediaPressUrl}>
            <div className='row gy-4'>
              {pressRes?.map((press: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <BlogCard
                      imgLink={press?.featuredImage?.node?.sourceUrl}
                      title={press?.title}
                      link={newsmediaPressUrl + press?.slug}
                    />
                  </div>
                )
              })}
            </div>
          </NewsGroup>
          <NewsGroup title='Newsletters' theme='light' link={newsmediaNewsletterUrl}>
            <div className='row gy-5'>
              {newsRes?.map((newsletter: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <NewsletterCard
                      title={newsletter?.node?.title}
                      imgurl={'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/bulletin.png'}
                      link={newsletter?.node?.insightNewsletter?.uploadThePublication?.node?.mediaItemUrl ?? ''}
                    />
                  </div>
                )
              })}
            </div>
          </NewsGroup>
          <NewsGroup title='Karandaaz Stories' theme='light' link={newsmediaStoriesUrl}>
            <div className='row gy-5'>
              {storiesRes?.map((story: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <BlogCard
                      imgLink={story?.featuredImage?.node?.sourceUrl}
                      title={story?.title}
                      link={newsmediaStoriesUrl + story?.slug}
                    />
                  </div>
                )
              })}
            </div>
          </NewsGroup>
        </div>
      </section>

      <hr className='br-grey30'></hr>
      {/* <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='offset-md-1 col-md-10'>
              <h2 className='text-center mb-5'>{res?.formheading}</h2>
              <MediaEnquiryForm />
            </div>
          </div>
        </div>
      </section> */}
      <section className='section-py-md'>
        <h2 className='text-center'>Karandaaz in Photos</h2>
        <ImagesMarquee urls={GetUrlsArray(swiperImages)} />
      </section>
      <section className='section-py-md subheader'>
        <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='text-left mb-4'>All Media</h4>
              <a className='tx-grey100 p-0 m-0 d-flex mb-4' href={mediaUrl}>
                <p className='p-0 m-0 pe-1 subtitle-style-1 underline-hover text-nowrap'>View All</p>
              </a>
            </div>
          </div>
          <div className='row gy-4'>
            {resMedia?.nodes && resMedia?.nodes.length > 0 ? (
              resMedia?.nodes?.map((story: any, index: number) => {
                return (
                  <div className='col-12 col-md-4' key={index}>
                    <MediaCard
                      title={story?.title}
                      imgLink={story?.featuredImage?.node?.sourceUrl}
                      // link={newsmediamediaUrl + story?.slug}  // Make sure the link logic is correct here if needed
                    />
                  </div>
                )
              })
            ) : (
              <div className='col-12 text-center'>
                <p>No media stories found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
