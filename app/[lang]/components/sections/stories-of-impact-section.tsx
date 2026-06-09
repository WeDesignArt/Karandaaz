import React from 'react'
import { BlogCard } from '../core/cards/blog-card'
import { newsmediaStoriesUrl } from '../../../../utils/urls'
import { getStories } from '../../api/lib/news-media'

export default async function StoriesSection({ isUrdu }: any) {
  const storiesRes = await getStories(3)

  return (
    <section className='section-py-md bg-krnblue stories-of-imapct'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='mb-4 tx-grey00'>{isUrdu ? 'اثرات کی کہانیاں' : 'Stories of Impact'}</h4>
          </div>
          {storiesRes?.map((story: any) => {
            return (
              <div
                className='col-md-4'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='1000'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              >
                <BlogCard
                  imgLink={story?.featuredImage?.node?.sourceUrl}
                  title={story?.title}
                  link={isUrdu ? `/ur/${newsmediaStoriesUrl + story?.slug}` : newsmediaStoriesUrl + story?.slug}
                  section='stories-of-impact'
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
