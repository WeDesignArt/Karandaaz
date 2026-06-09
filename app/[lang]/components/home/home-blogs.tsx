'use client'
import React, { useState, useEffect } from 'react'
import { PressCard } from '../core/cards/press-card'
import { NewsGroup } from '../core/cards/news-group'
import { BlogCard } from '../core/cards/blog-card'
import { getPressReleases, getStories } from '../../api/lib/news-media'
import { newsmediaPressUrl, newsmediaStoriesUrl, researchBlogsUrl } from '../../../../utils/urls'
import { getBlogs } from '../../api/lib/research'
import useMediaQuery from '../../../../hooks/useMediaQuery'

export default function HomeBlogs({ data, lang }: any) {
  const isUrdu = lang === 'ur'
  const media = useMediaQuery()
  const isMobile = media ? media.width < 768 : false
  const isIpad = media ? media.width < 1024 : false

  const [blogsRes, setBlogsRes] = useState<any[]>([])
  const [pressRes, setPressRes] = useState<any[]>([])
  const [storiesRes, setStoriesRes] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const blogs = await getBlogs(isMobile ? 1 : isIpad ? 2 : 4)
      const press = await getPressReleases(isMobile ? 1 : isIpad ? 2 : 3)
      const stories = await getStories(isMobile ? 1 : isIpad ? 2 : 4)

      setBlogsRes(blogs)
      setPressRes(press)
      setStoriesRes(stories)
    }

    fetchData()
  }, [isMobile])
  return (
    <div className='bg-krnblue section-py-md'>
      <div className='container'>
        <h2 className='tx-blue00 text-center'>{data?.title}</h2>

        <NewsGroup
          title={isUrdu ? 'خبریں اور پریس ریلیز' : 'News & Press Releases'}
          link={newsmediaPressUrl}
          isUrdu={isUrdu}
        >
          <div className='row card-group' dir='ltr'>
            {pressRes?.map((press: any, index: number) => {
              return (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-4'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  <PressCard
                    imgLink={press?.featuredImage?.node?.sourceUrl}
                    title={press?.title}
                    link={newsmediaPressUrl + press?.slug}
                  />
                </div>
              )
            })}
          </div>
        </NewsGroup>

        <NewsGroup title={isUrdu ? 'کارانداز کہانیاں' : 'Karandaaz Stories'} link={newsmediaStoriesUrl} isUrdu={isUrdu}>
          <div className='row gy-4' dir='ltr'>
            {storiesRes?.map((story: any, index: number) => {
              return (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-3'
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
                    link={newsmediaStoriesUrl + story?.slug}
                  />
                </div>
              )
            })}
          </div>
        </NewsGroup>
        <NewsGroup title={isUrdu ? 'بلاگز' : 'Blogs'} link={researchBlogsUrl} isUrdu={isUrdu}>
          <div className='row gy-4' dir='ltr'>
            {blogsRes?.map((blog: any, index: number) => {
              return (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-3'
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
                    imgLink={blog?.featuredImage?.node?.sourceUrl}
                    title={blog?.title}
                    link={researchBlogsUrl + blog?.slug}
                    author={blog?.author?.node?.name}
                    date={blog?.date}
                  />
                </div>
              )
            })}
          </div>
        </NewsGroup>
      </div>
    </div>
  )
}
