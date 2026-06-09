export const dynamic = 'force-dynamic'

import { getJobPositions } from '../../api/lib/careers'
import { JobPositionCard } from '../../components/core/cards/jobposition-card'
import { TopHeaderSection } from '../../components/sections/top-header-section'
import { careersAvailablePositions, careersArchivePositions } from '../../../../utils/urls'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'

export default async function Careers({ params }: any) {
  const res = await getJobPositions()
  const isUrdu = params.lang === 'ur'

  // Get the current date
  const currentDate = new Date()

  // Filter positions that are not expired
  const validPositions = res?.filter((position: any) => {
    const deadline = position?.node?.jobposition?.jobDeadline
    return deadline && new Date(deadline) >= currentDate
  })

  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={
            isUrdu
              ? "<h2 class='pb-2 pb-md-2'> <span class='tx-krnblue'>پاکستان میں</span> شمولیتی معاشی ترقی کو آگے بڑھانے میں ہمارے ساتھ شامل ہوں </h2>"
              : "<h2 class='pb-2 pb-md-2'><span class='tx-krnblue'>Join us</span> in advancing inclusive <br/> economic growth in Pakistan </h2>"
          }
          lang={params.lang}
        />
        <div className='container' dir='ltr'>
          <div className='row gy-4'>
            {validPositions?.length > 0 ? (
              validPositions?.map((position: any) => (
                <div className='col-md-6' key={position?.node?.id}>
                  <JobPositionCard
                    title={position?.node?.jobposition?.jobTitle}
                    location={position?.node?.jobposition?.location}
                    link={
                      isUrdu
                        ? `/${params.lang}/${careersAvailablePositions + position?.node?.slug}`
                        : careersAvailablePositions + position?.node?.slug
                    }
                    shiftCategory={position?.node?.jobposition?.shiftCategory}
                    deadline={position?.node?.jobposition?.jobDeadline}
                  />
                </div>
              ))
            ) : (
              <div className='col-md-12'>
                <h3 className='text-center'>
                  {isUrdu
                    ? 'فی الحال کرندااز میں کوئی دستیاب آسامیاں نہیں ہیں'
                    : 'There are currently no openings at Karandaaz.'}
                </h3>
              </div>
            )}
          </div>
          <div className='row mt-5 justify-content-end'>
            {isUrdu ? (
              <>
                <a className='tx-krnblue w-auto' href={`/ur/${careersArchivePositions}`}>
                  محفوظات <GoArrowLeft className='tx-large' />
                </a>
              </>
            ) : (
              <>
                <a className='tx-krnblue w-auto' href={careersArchivePositions}>
                  Archives <GoArrowRight className='tx-large' />
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
