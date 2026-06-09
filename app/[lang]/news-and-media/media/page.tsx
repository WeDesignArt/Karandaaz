'use client'
import { getMediaByPage, getStoryByPage } from '../../api/lib/news-media'
import { MediaCard } from '../../components/core/cards/media-card'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { Loader } from '../../components/states/loader'
import { generateYearOptions } from '../../../../utils/string'
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
// import { newsmediamediaUrl } from '../../../../utils/urls'
import SponsorsFooter from '../../components/navigation/sponsors-footer'
import { EmptyState } from '../../components/states/emptyState'
import { itemRender } from '../../../../utils/pagination'

export default function media({ params }: any) {
  const lang = params.lang || 'en'
  const isUrdu = params.lang === 'ur'
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [media, setmedia] = useState([])
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

  // Gets media acc to curent page
  // Sets loading + total states
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getMediaByPage(offset, pageSize, lang)
        setLoading(false)
        setmedia(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, buttonTimestamp, lang])

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
    <main className='media-page'>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-center mx-auto'>
              <Breadcrumb lang={lang} />
              <h2 className='pb-2 pb-md-2'>{isUrdu ? 'میڈیا میں کارنداز' : 'Karandaaz in media'}</h2>
            </div>
            {/* asda */}
          </div>
        </div>
      </section>
      {/* media Cards */}
      <section className='section-py-md subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='pb-2 pb-md-4'>{isUrdu ? 'تمام میڈیا' : 'All Media'}</h4>
            </div>
          </div>
          <div className='row gy-4'>
            {media.length != 0 ? (
              media?.map((story: any) => {
                return (
                  <div className='col-12 col-md-4'>
                    <MediaCard
                      title={story?.title}
                      imgLink={story?.featuredImage?.node?.sourceUrl}
                      // link={newsmediamediaUrl + story?.slug}
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
