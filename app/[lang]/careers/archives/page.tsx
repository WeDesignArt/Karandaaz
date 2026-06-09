'use client'
import { useEffect, useState } from 'react'
import { getJobPositionsByPage } from '../../api/lib/careers'
import { JobPositionCard } from '../../components/core/cards/jobposition-card'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { careersArchivePositions } from '../../../../utils/urls'
import { itemRender } from '../../../../utils/pagination'
import { Pagination } from 'antd'
import { Loader } from '../../components/states/loader'
import { EmptyState } from '@/[lang]/components/states/emptyState'

export default function CareersArchive({ params }: any) {
  const [offset, setOffset] = useState(0)
  const [pageSize, _] = useState(15)
  const [positions, setPosition] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getJobPositionsByPage(offset, pageSize)
        setLoading(false)
        setPosition(res?.edges || [])
        setTotal(res?.pageInfo?.offsetPagination?.total)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [offset, pageSize])

  const isUrdu = params.lang === 'ur'
  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }
  // Get the current date
  const currentDate = new Date()

  // Filter positions that are not expired
  const expiredPositions = positions?.filter((position: any) => {
    const deadline = position?.node?.jobposition?.jobDeadline
    return deadline && new Date(deadline) < currentDate
  })

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

  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={
            isUrdu
              ? "<h2 class='pb-2 pb-md-2'> آرکائیو شدہ آسامیاں</h2>"
              : "<h2 class='pb-2 pb-md-2'><span class='tx-krnblue'>Archived</span> Jobs</h2>"
          }
          lang={params.lang}
        />
        <div className='container' dir='ltr'>
          <div className='row gy-4 mb-5'>
            {expiredPositions?.length > 0 ? (
              expiredPositions?.map((position: any) => (
                <div className='col-md-6' key={position?.node?.id}>
                  <JobPositionCard
                    title={position?.node?.jobposition?.jobTitle}
                    location={position?.node?.jobposition?.location}
                    link={
                      isUrdu
                        ? `/${params.lang}/${careersArchivePositions + position?.node?.slug}`
                        : careersArchivePositions + position?.node?.slug
                    }
                    shiftCategory={position?.node?.jobposition?.shiftCategory}
                    deadline={position?.node?.jobposition?.jobDeadline}
                  />
                </div>
              ))
            ) : (
              <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
            )}
          </div>

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
        </div>
      </section>
    </main>
  )
}
