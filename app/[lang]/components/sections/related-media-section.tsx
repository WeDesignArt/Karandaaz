import React from 'react'
import { BlogCard } from '../core/cards/blog-card'
import { researchBlogsUrl } from '../../../../utils/urls'
import { getBlogs } from '../../api/lib/research'

type RelatedMediaSectionProps = {
  className: string
  heading: string
  isUrdu?: boolean
}
export default async function RelatedMediaSection({ className, heading, isUrdu }: RelatedMediaSectionProps) {
  const blogsRes = await getBlogs(3)

  return (
    <section className={`section-py-md bg-grey related-media ${className}`} dir='ltr'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='mb-5 text-center'>{heading || 'Related media'}</h2>
          </div>
          {blogsRes?.map((blog: any) => {
            return (
              <div className='col-md-4'>
                <BlogCard
                  imgLink={blog?.featuredImage?.node?.sourceUrl}
                  title={blog?.title}
                  link={isUrdu ? `/ur/${researchBlogsUrl + blog?.slug}` : researchBlogsUrl + blog?.slug}
                  author={blog?.author?.node?.name}
                  date={blog?.date}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
