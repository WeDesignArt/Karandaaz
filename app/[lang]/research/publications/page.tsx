'use client'
import { Loader } from '../../components/states/loader'
import { generateYearOptions, getNodesWithoutParents } from '../../../../utils/string'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { NewsletterCard } from '../../components/core/cards/newsletter-card'
import { researchPublicationsUrl } from '../../../../utils/urls'
import { SubscriptionSection } from '../../components/sections/subscription-section'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { getAllPublicationsCategories, getPublicationsByPage, getPublications } from '../../api/lib/research'
import { itemRender } from '../../../../utils/pagination'
import { EmptyState } from '../../components/states/emptyState'
import { event } from './../../../../lib/gtag'

export default function PressReleases({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(9)
  const [publications, setPublications] = useState([])
  const [recentPublications, setRecentPublications] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState(0) // gets all data when year = 0
  const [categories, setCategories] = useState([])
  const [topic, setTopic] = useState('')
  const [topicOperator, setTopicOperator] = useState('EXISTS')
  const [searchText, setSearchText] = useState('')
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)

  const isUrdu = params.lang === 'ur'

  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getPublications()
        setRecentPublications(res || [])
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  // Gets publications data acc in case of change in
  // filter selection, or search button click acc to page selected
  // Sets loading + total states
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getPublicationsByPage(offset, pageSize, year, topic, searchText, topicOperator)
        setPublications(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, topic, buttonTimestamp])

  // Gets all filter categories on first page render
  useEffect(() => {
    async function fetchData() {
      try {
        const pubCategories = await getAllPublicationsCategories()
        setCategories(pubCategories)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

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
  const onYearChange = (event: any) => {
    setYear(Number(event.target.value))
    setOffset(0)
  }

  // Topic operator is diff in both the cases
  // to allow for the correct data
  const onTopicChange = (event: any) => {
    setTopic(event.target.value)
    if (event.target.value == '') {
      setTopicOperator('EXISTS')
    } else {
      setTopicOperator('IN')
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

  const handlePublicationClick = (title: any) => {
    event({
      action: 'read_publication',
      category: 'Read Publication click',
      label: title,
      value: title,
    })
  }

  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>{isUrdu ? 'چاپیات' : 'Publications'}</h2>
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
                    placeholder={isUrdu ? 'اشاعتیں تلاش کریں' : 'Search Publications'}
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
                <div className='d-flex flex-nowrap justify-content-end'>
                  <select className='form-select form-control body2 topictype' onChange={onTopicChange}>
                    <option selected value={''}>
                      {isUrdu ? 'موضوعات' : 'Topic'}
                    </option>
                    {getNodesWithoutParents(categories)?.map((category: any) => {
                      return <option>{category}</option>
                    })}
                  </select>
                  <select className='form-select form-control body2 yeartype' onChange={onYearChange}>
                    <option selected value={0}>
                      {isUrdu ? 'سال' : 'Year'}
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
      {/* Publication Cards */}
      <section className='section-py-md pt-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='mb-5'>{isUrdu ? 'تازہ ترین اشاعت' : 'Latest Publication'}</h4>
            </div>
          </div>
          <div className='row mb-5'>
            {recentPublications.length != 0 ? (
              recentPublications?.map((recentPublication: any, index: number) => {
                return (
                  <div className='col-12'>
                    <NewsletterCard
                      key={index}
                      publication={true}
                      title={recentPublication?.title}
                      imgurl={recentPublication?.featuredImage?.node?.sourceUrl}
                      publicationYear={recentPublication?.date ? String(moment(recentPublication?.date).year()) : ''}
                      link={
                        isUrdu
                          ? `/${params.lang}/${researchPublicationsUrl + recentPublication?.slug}`
                          : researchPublicationsUrl + recentPublication?.slug
                      }
                      type={'latest'}
                      isUrdu={isUrdu}
                      onClick={() => handlePublicationClick(recentPublication?.title)}
                    />
                  </div>
                )
              })
            ) : (
              <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
            )}
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='mb-5'>{isUrdu ? 'تمام اشاعتیں' : 'All Publications'}</h4>
            </div>
          </div>
          <div className='row gy-5'>
            {publications.length != 0 ? (
              publications?.map((publication: any, index: number) => {
                return (
                  <div className='col-12 col-md-4'>
                    <NewsletterCard
                      key={index}
                      publication={true}
                      title={publication?.title}
                      imgurl={publication?.featuredImage?.node?.sourceUrl}
                      publicationYear={publication?.date ? String(moment(publication?.date).year()) : ''}
                      link={
                        isUrdu
                          ? `/${params.lang}/${researchPublicationsUrl + publication?.slug}`
                          : researchPublicationsUrl + publication?.slug
                      }
                      onClick={() => handlePublicationClick(publication?.title)}
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
      <div className='section-py-md bg-blue00'>
        <SubscriptionSection lang={params.lang} />
      </div>
      <SponsorsFooter />
    </>
  )
}
