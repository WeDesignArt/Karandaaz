'use client'
import { Breadcrumb } from '../../components/navigation/breadcrumb'
import { useEffect, useState } from 'react'
import { getOpportunitiesOptions, getProcurementsByPage, getProgramOptions } from '../../api/lib/procurement'
import moment from 'moment'
import { JobPositionCard } from '../../components/core/cards/jobposition-card'
import { generateYearOptions } from '../../../../utils/string'
import { Pagination } from 'antd'
import { Loader } from '../../components/states/loader'
import { EmptyState } from '../../components/states/emptyState'
import { itemRender } from '../../../../utils/pagination'
import { procurementArchivesUrl } from '../../../../utils/urls'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'

export default function ProcurementsOpen({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, _] = useState(10)
  const [opportunities, setOpportunities] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [year, setYear] = useState(0) // gets all data when search is empty
  const [searchText, setSearchText] = useState('') // gets all data when search is empty
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [page, setPage] = useState(1)
  const [opportunitiesOptions, setOpportunitiesOptions] = useState([])
  const [programsOptions, setProgramsOptions] = useState([])
  const [selectedOppotunity, setSelectedOppotunity] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('')

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
        const res = await getProcurementsByPage(
          offset,
          pageSize,
          year,
          selectedOppotunity,
          selectedProgram,
          searchText,
          'Open'
        )
        setLoading(false)
        setOpportunities(res?.nodes || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, year, buttonTimestamp, selectedOppotunity, selectedProgram])

  useEffect(() => {
    async function fetchData() {
      try {
        const opp = await getOpportunitiesOptions()
        const prog = await getProgramOptions()
        setOpportunitiesOptions(opp)
        setProgramsOptions(prog)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  // Update page to start ie 1 on offset = 0
  useEffect(() => {
    if (offset == 0) {
      setPage(1)
    }
  }, [offset])

  // Updates offset by page number provided
  const updateOffset = (page: number) => {
    setOffset(0 + (page - 1) * pageSize)
  }

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

  const onOpportunityCategChange = (event: any) => {
    setSelectedOppotunity(event.target.value)
    setOffset(0)
  }
  const onProgramChange = (event: any) => {
    setSelectedProgram(event.target.value)
    setOffset(0)
  }

  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb lang={params.lang} />
              <h2 className='mb-4'>{isUrdu ? 'کھلی مواقع' : 'Open Opportunities'}</h2>
              {isUrdu ? (
                <>
                  <a className='tx-krnblue' href={`/ur/${procurementArchivesUrl}`}>
                    محفوظات <GoArrowLeft className='tx-large' />
                  </a>
                </>
              ) : (
                <>
                  <a className='tx-krnblue' href={procurementArchivesUrl}>
                    Archives <GoArrowRight className='tx-large' />
                  </a>
                </>
              )}
            </div>
            {/* <div className='col-md-9 text-center mx-auto'>
              <h4 className='tx-grey50'>These opportunities are now closed</h4>
            </div> */}
          </div>
        </div>
      </section>
      <section className='section-py-sm' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 ps-md-4'>
              <div className='searchform pb-2 pb-md-4'>
                <form className='search_widget' onSubmit={(e: any) => e.preventDefault()}>
                  <input
                    type='text'
                    name='search_post'
                    placeholder={isUrdu ? 'مواقع تلاش کریں' : 'Search Opportunities'}
                    onChange={setSearchTextField}
                  ></input>
                  <input type='submit' onClick={setButtonClick} value={isUrdu ? 'تلاش' : 'Search'} />
                </form>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='filter_widget'>
                <div className='d-flex flex-nowrap justify-content-end'>
                  <select
                    className='form-select form-control body2 opportunitytype'
                    onChange={onOpportunityCategChange}
                  >
                    <option selected value=''>
                      {isUrdu ? 'موقع کی قسم' : 'Opportunity Type'}
                    </option>
                    {opportunitiesOptions?.map((opp: any) => {
                      return <option>{opp?.name}</option>
                    })}
                  </select>
                  <select className='form-select form-control body2 programtype' onChange={onProgramChange}>
                    <option selected value=''>
                      {isUrdu ? 'پروگرام' : 'Program'}
                    </option>
                    {programsOptions?.map((prog: any) => {
                      return <option>{prog?.name}</option>
                    })}
                  </select>
                  <select className='form-select form-control body2 yeartype ' onChange={onYearChange}>
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
            <div className='col-md-12'>
              <hr className='bg-brgrey'></hr>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-md pt-0' dir='ltr'>
        <div className='container'>
          <div className='row gy-4'>
            {opportunities.length != 0 ? (
              opportunities?.map((opportunity: any) => {
                return (
                  <div className='col-md-6'>
                    <JobPositionCard
                      title={opportunity?.title}
                      link={`/procurement/open/${opportunity?.slug}`}
                      deadline={opportunity?.procurementoptions?.applicationdeadline}
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
