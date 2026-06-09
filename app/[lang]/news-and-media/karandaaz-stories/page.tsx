'use client'
import { getStoryByPage } from '../../api/lib/news-media'
import { BlogCard } from '../../components/core/cards/blog-card'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { Loader } from '../../components/states/loader'
import { generateYearOptions } from '../../../../utils/string'
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { RecentSection } from '../../components/sections/recent-section'
import { newsmediaStoriesUrl } from '../../../../utils/urls'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { EmptyState } from '../../components/states/emptyState'
import { itemRender } from '../../../../utils/pagination'

export default function Stories({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [stories, setStories] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState(0) // gets all data when year = 0
  const [searchText, setSearchText] = useState('') // gets all data when search is empty
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)

  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

  // Gets stories acc to curent page
  // Sets loading + total states
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getStoryByPage(offset, pageSize, year, searchText)
        setLoading(false)
        setStories(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, buttonTimestamp])

  const updateOffset = (page: number) => {
    setOffset(0 + (page - 1) * pageSize)
  }

  useEffect(() => {
    if (offset == 0) {
      setPage(1)
    }
  }, [offset])

  const onYearChange = (event: any) => {
    setYear(Number(event.target.value))
    setOffset(0)
  }

  const setSearchTextField = (e: any) => {
    setSearchText(e.target.value)
  }
  const setButtonClick = () => {
    setButtonTimestamp(moment().format('DD-MM-YYYYThh:mm:ssZ'))
    setOffset(0)
  }
  return (
    <main className='stories-page'>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>Impact beyond numbers</h2>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-sm'>
        <div className='container'>
          <div className='row pb-5'>
            <div className='col-md-6 ps-md-4'>
              <div className='searchform'>
                <form className='search_widget' onSubmit={(e: any) => e.preventDefault()}>
                  <input
                    type='text'
                    name='search_post'
                    placeholder='Search Stories'
                    onChange={setSearchTextField}
                  ></input>
                  <input type='submit' onClick={setButtonClick} value={'Search'} />
                </form>
              </div>
            </div>
            <div className='d-md-none mt-4 mt-md-0'>
              <hr className='bg-brgrey'></hr>
            </div>
            <div className='col-md-6 pt-5 pt-md-0'>
              <div className='filter_widget'>
                <div className='d-flex flex-nowrap justify-content-end'>
                  <select className='form-select form-control body2 yeartype' onChange={onYearChange}>
                    <option selected value={0}>
                      Year
                    </option>
                    {generateYearOptions()?.map((year) => {
                      return <option>{year}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <hr className='bg-brgrey'></hr>
          </div>
        </div>
      </section>
      <RecentSection sectionType='stories' sectionHeading='Recent Stories' lang={params.lang} />
      {/* Stories Cards */}
      <div className='container'>
        <hr className='bg-brgrey'></hr>
      </div>
      <section className='section-py-md subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='pb-2 pb-md-4'>All Stories</h4>
            </div>
          </div>
          <div className='row gy-4'>
            {stories.length != 0 ? (
              stories?.map((story: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <BlogCard
                      title={story?.title}
                      imgLink={story?.featuredImage?.node?.sourceUrl}
                      link={newsmediaStoriesUrl + story?.slug}
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

      {/* Pagination */}
      <Pagination
        align='center'
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        current={page}
        itemRender={itemRender}
      />
      <SponsorsFooter />
    </main>
  )
}
