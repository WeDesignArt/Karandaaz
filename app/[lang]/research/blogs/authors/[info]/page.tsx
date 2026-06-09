'use client'
import { BlogCard } from '../../../../components/core/cards/blog-card'
import { Loader } from '../../../../components/states/loader'
import { Breadcrumb } from '../../../../components/navigation/breadcrumb'
import { researchBlogsUrl } from '../../../../../../utils/urls'
import React, { useEffect, useState } from 'react'
import { EmptyState } from '../../../../components/states/emptyState'
import Image from 'next/image'
import './page.css'
export default function AuthorInfo({ params }: { params: { info: string } }) {
  const [loading, setLoading] = useState(true)
  const [blogsRes, setBlogsRes] = useState([])
  const [authorRes, setAuthorRes] = useState<any>({})

  // Get blogs by author id
  useEffect(() => {
    let res: any
    async function fetchData() {
      try {
        setLoading(true)
        fetch(`https://krndevelop.wpenginepowered.com/wp-json/custom/v1/blogs?author=${params?.info}`)
          .then((res) => res.json())
          .then((data) => {
            setBlogsRes(data ? data : [])
            setLoading(false)
          })
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
      // Get user detailed info by userid
      try {
        setLoading(true)
        fetch(`https://krndevelop.wpenginepowered.com/wp-json/custom/v1/user-by-id?id=${params?.info}`)
          .then((res) => res.json())
          .then((data) => {
            setAuthorRes(data ? data : [])
            setLoading(false)
          })
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  console.log(authorRes);
  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center pb-4 mx-auto'>
              <Breadcrumb removeLast={true} lastItem={authorRes?.name} />
              {/* <h2 className='pb-2 pb-md-2'>Authors</h2> */}
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md bg-grey'>
      <div className='container'>
        <div className='row'>
          <div className='profile-card'>
            <div className='row mx-auto'>
              <div className='col-md-3 ps-0'>
                <Image
                  src={authorRes?.profile_picture}
                  className='profile'
                  width={0}
                  height={0}
                  style={{ width: '100%', height: '100%' }}
                  sizes='100vw'
                  alt=''
                />
              </div>
              <div className='col-md-9 py-md-5'>
                <h4>{authorRes?.name ? authorRes?.name : ''}</h4>
                <h6 className='tx-grey80'>{authorRes?.user_designation ? authorRes?.user_designation : ''}</h6>
                <p
                  dangerouslySetInnerHTML={{
                    __html: authorRes?.biographical_info ? authorRes?.biographical_info : '',
                  }}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
        </section>
        <section className='section-py-md author-relatedblog'>
          <div className='container'>
            <div className='row'>
            {/* Blogs by Author */}
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12'>
                    <h4 className='mb-0'>Blogs by {authorRes?.name}</h4>
                  </div>
                  <div className='row gy-4'>
                    {blogsRes.length != 0 ? (
                      blogsRes?.map((blog: any, index: number) => {
                        if (index < 3) {
                          return (
                            <div className='col-md-4'>
                              <BlogCard
                                imgLink={blog?.thumbnail}
                                title={blog?.title}
                                link={researchBlogsUrl + blog?.slug}
                                author={blog?.author_name}
                                date={blog?.date}
                              />
                            </div>
                          )
                        }
                      })
                    ) : (
                      <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}