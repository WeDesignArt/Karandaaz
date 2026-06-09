'use client'
import { getNewslettersByPage, getNewsletters } from '../../api/lib/news-media'
import { NewsletterCard } from '../../components/core/cards/newsletter-card'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { Loader } from '../../components/states/loader'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { generateYearOptions } from '../../../../utils/string'
import moment from 'moment'
import { EmptyState } from '../../components/states/emptyState'
import { itemRender } from '../../../../utils/pagination'
import { event } from './../../../../lib/gtag'

export default function Newsletters({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, _] = useState(9)
  const [recentNewsletters, setRecenetNewsletters] = useState([])
  const [newsletters, setNewsletters] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState('') // gets all data when search is empty
  const [searchText, setSearchText] = useState('') // gets all data when search is empty
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)
  const isUrdu = params.lang === 'ur'
  const lang = params.lang
  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getNewsletters(1, lang)
        setRecenetNewsletters(res || [])
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [lang])

  // Newsletters need to be filtered by their title year & not published year
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getNewslettersByPage(offset, pageSize, year + ' ' + searchText, lang)
        setLoading(false)
        setNewsletters(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, buttonTimestamp])

  // Updates offset by page number provided
  const updateOffset = (page: number) => {
    setOffset(0 + (page - 1) * pageSize)
  }
  useEffect(() => {
    if (offset == 0) {
      setPage(1)
    }
  }, [offset])

  const onYearChange = (event: any) => {
    setYear(String(event.target.value))
    setOffset(0)
  }
  const setSearchTextField = (e: any) => {
    setSearchText(e.target.value)
  }

  // Only on button click - the search text is sent to query
  const setButtonClick = () => {
    setButtonTimestamp(moment().format('DD-MM-YYYYThh:mm:ssZ'))
    setOffset(0)
  }
  const handleNewsLetterClick = () => {
    event({
      action: 'newsletter_download',
      category: 'Download Button click',
      label: 'Download Newsletter',
      value: 1,
    })
  }

  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>
                {isUrdu ? 'کارانداز کے اثرات پر سہ ماہی جائزے' : `Quarterly insights on Karandaaz’s impact`}
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletters Cards */}
      <section className='section-py-sm'>
        <div className='container'>
          <div className='row pb-5'>
            <div className='col-md-6 ps-md-4'>
              <div className='searchform'>
                <form className='search_widget' onSubmit={(e: any) => e.preventDefault()}>
                  <input
                    type='text'
                    name='search_post'
                    placeholder={isUrdu ? 'نیوز لیٹرز تلاش کریں' : 'Search Newsletters'}
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
                  <select className='form-select form-control body2 yeartype' onChange={onYearChange}>
                    <option selected value={''}>
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
      <section className='section-py-md pt-5 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='mb-5'>{isUrdu ? 'تازہ ترین نیوز لیٹر' : 'Latest Newsletter'}</h4>
            </div>
          </div>
          <div className='row mb-5'>
            {recentNewsletters.length != 0 ? (
              recentNewsletters?.map((recentNewsletter: any, index: number) => {
                return (
                  <div className='col-12'>
                    <NewsletterCard
                      key={index}
                      title={recentNewsletter?.node?.title}
                      imgurl={
                        recentNewsletter?.node?.featuredImage?.node?.sourceUrl ??
                        'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/bulletin.png'
                      }
                      link={
                        recentNewsletter?.node?.insightNewsletter?.uploadThePublication?.node?.mediaItemUrl
                          ? recentNewsletter.node.insightNewsletter.uploadThePublication.node.mediaItemUrl
                          : isUrdu
                            ? `/${params.lang}/news-and-media/newsletters/${recentNewsletter?.node?.slug}`
                            : `/news-and-media/newsletters/${recentNewsletter?.node?.slug}`
                      }
                      type={'latest'}
                      isUrdu={isUrdu}
                      onClick={handleNewsLetterClick}
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
              <h4 className='mb-5'>{isUrdu ? 'تمام نیوز لیٹرز' : 'All Newsletters'}</h4>
            </div>
          </div>
          <div className='row gy-5' dir='ltr'>
            {newsletters.length != 0 ? (
              newsletters?.map((newsletter: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <NewsletterCard
                      title={newsletter?.title}
                      imgurl={
                        newsletter?.featuredImage?.node?.sourceUrl ??
                        'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/bulletin.png'
                      }
                      link={
                        newsletter?.insightNewsletter?.uploadThePublication?.node?.mediaItemUrl
                          ? newsletter.insightNewsletter.uploadThePublication.node.mediaItemUrl
                          : isUrdu
                            ? `/${params.lang}/news-and-media/newsletters/${newsletter?.slug}`
                            : `/news-and-media/newsletters/${newsletter?.slug}`
                      }
                      onClick={handleNewsLetterClick}
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
    </>
  )
}
