'use client'
import { ReportCard } from '../components/core/cards/report-card'
import { Loader } from '../components/states/loader'
// import { generateYearOptions } from '../../utils/string'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getReportsByPage, getReports } from '../api/lib/additionalPages'
import { Pagination } from 'antd'
// import { itemRender } from '../../utils/pagination'
import { TopHeaderSection } from '../components/sections/top-header-section'
import { EmptyState } from '../components/states/emptyState'
import { generateYearOptions } from '../../../utils/string'
import { itemRender } from '../../../utils/pagination'
export default function AnnualReports({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(9)
  const [recentReport, setRecentReport] = useState([])
  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState(0) // gets all data when year = 0
  const [searchText, setSearchText] = useState('')
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getReports()
        setLoading(false)
        setRecentReport(res || [])
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getReportsByPage(offset, pageSize, year, searchText)
        setLoading(false)
        setReports(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, buttonTimestamp])

  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

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
    setYear(Number(event.target.value))
  }

  const setSearchTextField = (e: any) => {
    setSearchText(e.target.value)
  }
  const setButtonClick = () => {
    setButtonTimestamp(moment().format('DD-MM-YYYYThh:mm:ssZ'))
  }

  return (
    <>
      <section className='section-py-md'>
        <TopHeaderSection heading='<h2>Annual Reports</h2>' lang={params.lang} />
        <div className='container mt-4'>
          <div className='row pb-5'>
            <div className='col-md-6 ps-md-4'>
              <div className='searchform'>
                <form className='search_widget' onSubmit={(e: any) => e.preventDefault()}>
                  <input
                    type='text'
                    name='search_post'
                    placeholder='Search Reports'
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
                  <select className='form-select form-control body2 year_type w-100' onChange={onYearChange}>
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
      {/* Reports Cards */}
      <section className='section-py-md pt-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='mb-5'>Recent Reports</h4>
            </div>
          </div>
          <div className='row mb-5'>
            {recentReport.length != 0 ? (
              recentReport?.map((report: any, index: number) => {
                return (
                  <div className='col-12'>
                    <ReportCard
                      key={index}
                      imageLink={report?.featuredImage?.node?.sourceUrl}
                      heading={report?.title}
                      year={report?.date ? String(moment(report?.date).year()) : ''}
                      reportLink={report?.reportsfields?.reportfile?.node?.mediaItemUrl}
                      type={'latest'}
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
              <h4 className='mb-5'>All Reports</h4>
            </div>
          </div>
          <div className='row'>
            {reports.length != 0 ? (
              reports?.map((report: any, index: number) => {
                return (
                  <div className='col-md-6 my-2'>
                    <ReportCard
                      key={index}
                      imageLink={report?.featuredImage?.node?.sourceUrl}
                      heading={report?.title}
                      year={report?.date ? String(moment(report?.date).year()) : ''}
                      reportLink={report?.reportsfields?.reportfile?.node?.mediaItemUrl}
                      type={''}
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
