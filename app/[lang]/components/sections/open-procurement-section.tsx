import { getOpenProcurements } from '../../api/lib/procurement'
import React from 'react'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import { JobPositionCard } from '../core/cards/jobposition-card'
import { EmptyState } from '../states/emptyState'
import { procurementOpenUrl } from '../../../../utils/urls'

export default async function OpenProcurementSection({ isUrdu }: any) {
  const openProc = await getOpenProcurements(4)

  return (
    <section className='section-py-md bg-grey'>
      <div className='container'>
        <div className='row gy-4'>
          <div className='col-md-12'>
            <div className='d-flex align-items-center justify-content-between mb-2 mb-md-5'>
              {isUrdu ? (
                <>
                  <h3 className='tx-grey100'>کھلی معاہداتی مواقع</h3>
                  <a className='tx-krnblue' href={`/ur/${procurementOpenUrl}`}>
                    تمام دیکھیں <GoArrowLeft className='tx-large' />
                  </a>
                </>
              ) : (
                <>
                  <h3 className='tx-grey100'>Contractual Opportunities at Karandaaz</h3>
                  <a className='tx-krnblue' href={procurementOpenUrl}>
                    View All <GoArrowRight className='tx-large' />
                  </a>
                </>
              )}
            </div>
          </div>
          {/* {openProc?.nodes?.map((opportunity: any) => {
            return (
              <div className='col-md-6'>
                <JobPositionCard
                  title={opportunity?.title}
                  link={`/procurement/open/${opportunity?.slug}`}
                  shiftCategory='Full-time'
                  location={opportunity?.procurementoptions?.location}
                />
              </div>
            )
          })} */}

          {openProc?.nodes ? (
            openProc?.nodes?.map((opportunity: any) => {
              return (
                <div className='col-md-6' dir='ltr'>
                  <JobPositionCard
                    title={opportunity?.title}
                    link={
                      isUrdu ? `/ur/procurement/open/${opportunity?.slug}` : `/procurement/open/${opportunity?.slug}`
                    }
                    deadline={opportunity?.procurementoptions?.applicationdeadline}
                  />
                </div>
              )
            })
          ) : (
            <div className='text-center'> {<EmptyState />}</div>
          )}
        </div>
      </div>
    </section>
  )
}
