'use client'
import { BlogCard } from '../../components/core/cards/blog-card'
import { Loader } from '../../components/states/loader'
import { generateYearOptions, organizeData } from '../../../../utils/string'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { Pagination } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { RecentSection } from '../../components/sections/recent-section'
import { researchBlogsUrl } from '../../../../utils/urls'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { getAllBlogsCategories, getBlogsByPage } from '../../api/lib/research'
import { EmptyState } from '../../components/states/emptyState'
import { itemRender } from '../../../../utils/pagination'

export default function Blogs({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState<number>(0)
  const [categories, setCategories] = useState([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const yearDropdownRef = useRef<HTMLDivElement>(null)
  const topicDropdownRef = useRef<HTMLDivElement>(null)
  const isUrdu = params.lang === 'ur'

  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

  // Gets blogs data acc in case of change in
  // filter selection, or search button click acc to page selected
  // Sets loading + total states
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getBlogsByPage(offset, pageSize, year, selectedTopics.join(','), searchText)
        setBlogs(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, selectedTopics, buttonTimestamp])

  // Gets all filter categories on first page render
  useEffect(() => {
    async function fetchData() {
      try {
        const categoriess = await getAllBlogsCategories()
        setCategories(categoriess)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
      setIsYearDropdownOpen(false)
    }
    if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  // Updates offset by page number provided
  const updateOffset = (page: number) => {
    setOffset(0 + (page - 1) * pageSize)
  }

  // Set page to 1 if offset is changed to 0
  // due to inability of default antd pagination
  useEffect(() => {
    if (offset == 0) {
      setPage(1)
    }
  }, [offset])

  // Sets the year state & offset back to start again
  const toggleYearSelection = (year: number) => {
    setYear(year) // Set the selected year
    setOffset(0)
  }

  const handleTopicChange = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
    setOffset(0)
  }

  // Stores search result
  const setSearchTextField = (e: any) => {
    setSearchText(e.target.value)
  }
  // A separate button timestamp state ensures new data is fetched only on
  // clicking the search button, not on every field entry.
  const setButtonClick = () => {
    setButtonTimestamp(moment().format('DD-MM-YYYYThh:mm:ssZ'))
    setOffset(0)
  }

  const { groupedData, noParentNodes } = organizeData(categories)

  return (
    <main className='blog-page'>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>
                {' '}
                {isUrdu ? 'ماہرین کی بصیرت اور تازہ ترین معلومات' : 'Expert insights and updates'}
              </h2>
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
                    placeholder={isUrdu ? 'بلاگز تلاش کریں' : 'Search Blogs'}
                    onChange={setSearchTextField}
                  ></input>
                  <input type='submit' onClick={setButtonClick} value={isUrdu ? 'تلاش' : 'Search'} />
                </form>
              </div>
            </div>
            <div className='d-md-none mt-4 mt-md-0'>
              <hr className='bg-brgrey'></hr>
            </div>
            <div className='col-md-6 pt-5 pt-md-0'>
              <div className='filter_widget'>
                <div className='d-md-flex flex-nowrap justify-content-end'>
                  <div className='custom-multi-select' ref={topicDropdownRef}>
                    <div className='filter-header' onClick={toggleDropdown}>
                      <span>{isUrdu ? 'موضوعات' : 'Topics'}</span>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M19.9181 8.9502L13.3981 15.4702C12.6281 16.2402 11.3681 16.2402 10.5981 15.4702L4.07812 8.9502'
                          stroke='#08628B'
                          strokeWidth='1.5'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    {isDropdownOpen && (
                      <div className='filter-menu'>
                        {noParentNodes.map((topic: string) => (
                          <label
                            key={topic}
                            className={`filter-item ${selectedTopics.includes(topic) ? 'active' : ''}`}
                          >
                            <input
                              type='checkbox'
                              checked={selectedTopics.includes(topic)}
                              onChange={() => handleTopicChange(topic)}
                              className='hidden-checkbox'
                            />

                            <span>{topic}</span>
                            <span className='checkmark'>
                              {selectedTopics.includes(topic) && (
                                <svg
                                  width='16'
                                  height='11'
                                  viewBox='0 0 16 11'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.6654 1L5.4987 10.1667L1.33203 6'
                                    stroke='#08628B'
                                    strokeWidth='1.66667'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              )}
                            </span>
                          </label>
                        ))}
                        {Object.keys(groupedData).map((parentName) => (
                          <React.Fragment key={parentName}>
                            {/* Render parent option as disabled */}
                            <div className='filter-item disabled'>{parentName}</div>
                            {/* Render child options */}
                            {groupedData[parentName].map((childName: string) => (
                              <label
                                key={childName}
                                className={`filter-item ${selectedTopics.includes(childName) ? 'active' : ''}`}
                              >
                                <input
                                  type='checkbox'
                                  checked={selectedTopics.includes(childName)}
                                  onChange={() => handleTopicChange(childName)}
                                  className='hidden-checkbox'
                                />

                                <span>{childName}</span>
                                <span className='checkmark'>
                                  {selectedTopics.includes(childName) && (
                                    <svg
                                      width='16'
                                      height='11'
                                      viewBox='0 0 16 11'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M14.6654 1L5.4987 10.1667L1.33203 6'
                                        stroke='#08628B'
                                        strokeWidth='1.66667'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                      />
                                    </svg>
                                  )}
                                </span>
                              </label>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='custom-multi-select year-select' ref={yearDropdownRef}>
                    <div className='filter-header' onClick={toggleYearDropdown}>
                      <span>{isUrdu ? 'سال' : 'Year'}</span>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M19.9181 8.9502L13.3981 15.4702C12.6281 16.2402 11.3681 16.2402 10.5981 15.4702L4.07812 8.9502'
                          stroke='#08628B'
                          strokeWidth='1.5'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    {isYearDropdownOpen && (
                      <div className='filter-menu'>
                        {generateYearOptions().map((yearOption) => (
                          <label key={yearOption} className={`filter-item ${year === yearOption ? 'active' : ''}`}>
                            <input
                              type='checkbox'
                              checked={year === yearOption} // Check if year is selected
                              onChange={() => toggleYearSelection(yearOption)} // Use the toggle function
                              className='hidden-checkbox'
                            />
                            <span>{yearOption}</span>
                            <span className='checkmark'>
                              {year === yearOption && (
                                <svg
                                  width='16'
                                  height='11'
                                  viewBox='0 0 16 11'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.6654 1L5.4987 10.1667L1.33203 6'
                                    stroke='#08628B'
                                    strokeWidth='1.66667'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              )}{' '}
                              {/* Display tick if selected */}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* <select className='form-select form-control body2 yeartype' onChange={onYearChange}>
                    <option selected value={0}>
                      {isUrdu ? 'سال' : 'Year'}
                    </option>
                    {generateYearOptions()?.map((year) => {
                      return <option>{year}</option>
                    })}
                  </select> */}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <hr className='bg-brgrey'></hr>
          </div>
        </div>
      </section>
      {/* Blogs Recent Cards */}
      <RecentSection sectionType='blogs' sectionHeading={isUrdu ? 'حالیہ بلاگز' : 'Recent Blogs'} lang={params.lang} />
      {/* Blogs Cards */}
      <div className='container'>
        <hr className='bg-brgrey'></hr>
      </div>
      <section className='section-py-md subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='pb-2 pb-md-4'>{isUrdu ? 'تمام بلاگز' : 'All Blogs'}</h4>
            </div>
          </div>
          <div className='row gy-4'>
            {blogs.length != 0 ? (
              blogs?.map((blog: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <BlogCard
                      title={blog?.title}
                      imgLink={blog?.featuredImage?.node?.sourceUrl}
                      link={isUrdu ? `/${params.lang}${researchBlogsUrl}/${blog?.slug}` : researchBlogsUrl + blog?.slug}
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

      {/* Pagination */}
      <Pagination
        align='center'
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        itemRender={itemRender}
        current={page}
      />
      <SponsorsFooter />
    </main>
  )
}
