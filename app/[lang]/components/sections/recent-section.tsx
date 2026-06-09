'use-client'
import React, { useEffect, useState } from 'react'
import './recent-section.css'
import { BlogCard } from '../core/cards/blog-card'
import { Loader } from '../states/loader'
import { getPressReleases, getStories } from '../../api/lib/news-media'
import { newsmediaPressUrl, newsmediaStoriesUrl, researchBlogsUrl } from '../../../../utils/urls'
import { getBlogs } from '../../api/lib/research'
import { EmptyState } from '../states/emptyState'

type SectionProps = {
  sectionType: 'blogs' | 'press-releases' | 'stories'
  sectionHeading: string
  lang: any
}
// Recent Section for Blogs, Press, Stories - ie top 3 form either of these
export const RecentSection = ({ sectionType, sectionHeading, lang }: SectionProps) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [rootUrl, setRootUrl] = useState('')
  const isUrdu = lang === 'ur'

  useEffect(() => {
    async function fetchData() {
      try {
        if (sectionType == 'blogs') {
          setLoading(true)
          const res = await getBlogs(3)
          setRootUrl(researchBlogsUrl)
          setData(res)
          setLoading(false)
        } else if (sectionType == 'press-releases') {
          setLoading(true)
          const res = await getPressReleases(3)
          setRootUrl(newsmediaPressUrl)
          setData(res)
          setLoading(false)
        } else if (sectionType == 'stories') {
          setLoading(true)
          const res = await getStories(3)
          setRootUrl(newsmediaStoriesUrl)
          setData(res)
          setLoading(false)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='section-py-md pt-0 recent'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className=' pb-2 pb-md-4'>{sectionHeading}</h4>
          </div>
        </div>
        <div className='row gy-4'>
          {data.length != 0 ? (
            data?.map((blog: any) => {
              return (
                <div className='col-12 col-md-6'>
                  <BlogCard
                    title={blog?.title}
                    imgLink={blog?.featuredImage?.node?.sourceUrl}
                    link={isUrdu ? `/${lang}${rootUrl + blog?.slug}` : rootUrl + blog?.slug}
                    author={blog?.author?.node?.name}
                    date={blog?.date}
                    excerpt={blog?.excerpt}
                  />
                </div>
              )
            })
          ) : (
            <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
          )}
        </div>
      </div>
    </section>
  )
}
