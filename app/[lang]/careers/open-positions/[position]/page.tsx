'use client' // Add this at the top of your component
import React from 'react'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import './page.css'
import { SlClock } from 'react-icons/sl'
import { FiMapPin } from 'react-icons/fi'
import { GoSun, GoArrowRight } from 'react-icons/go'
import { PiMedal } from 'react-icons/pi'
import ShareButtons from '../../../components/core/share-buttons'
import { PiMoney } from 'react-icons/pi'
import moment from 'moment'
import { PeopleCard } from '../../../components/core/cards/people-card'
import { getAJobPosition, getKrnPeopleByType } from '../../../api/lib/careers'
import { peopleAtKarandaazUrl } from '../../../../../utils/urls'
import { event } from '../../../../../lib/gtag'
import Link from 'next/link'

export default async function Position({ params }: { params: { position: string; lang: any } }) {
  const res = await getAJobPosition(params?.position)

  const deadline = res?.jobposition?.jobDeadline
  // If WP returns a date-only string, treat the deadline as end-of-day local time.
  // This avoids expiring the job at 12:00 AM of the deadline date.
  const deadlineEnd = deadline ? moment(deadline).endOf('day') : null
  if (!deadlineEnd || deadlineEnd.isBefore(moment()))
    return (
      <div className='container py-5'>
        <h1>Application closed</h1>
        <p>The application for this position is closed.</p>
        <Link href='/careers/open-positions'>Go back to the open positions</Link>
      </div>
    )

  const positionDetails = res?.jobposition
  const peoplesdepartment = await getKrnPeopleByType(positionDetails?.peopledepartment?.edges?.[0]?.node?.name)
  const isUrdu = params.lang === 'ur'
  const handleButtonClick = () => {
    event({
      action: 'career_apply_button',
      category: 'Apply Button click',
      label: 'Apply Button click',
      value: 1,
    })
  }
  return (
    <main className='section-py-md '>
      <section className='subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-left'>
              <Breadcrumb center={false} lang={params.lang} />
              <h2 className='pb-2 pb-md-2'>{res?.title}</h2>
              <hr className='br-grey30'></hr>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container' dir='ltr'>
          <div className='row'>
            <div className='col-md-7 py-5'>
              {res ? (
                <div>
                  <h6>Reporting Structure</h6>
                  <p>
                    This role will be in the {positionDetails?.department} Department and the reporting line under{' '}
                    {positionDetails?.reportTo}.
                  </p>
                </div>
              ) : (
                <p>This page is currently not available</p>
              )}

              <div className='job-content' dangerouslySetInnerHTML={{ __html: res?.content }} />
            </div>
            {res ? (
              <aside className='offset-md-1 col-md-4'>
                <div className='job-container'>
                  <p className='tx-small text-center deadline-box'>
                    Application Deadline:{' '}
                    {positionDetails?.jobDeadline ? moment(positionDetails?.jobDeadline).format('D MMMM YYYY') : ''}
                  </p>
                  <div className='job-detail'>
                    <ul>
                      <li>
                        <SlClock /> {positionDetails?.shiftCategory}
                      </li>

                      <li>
                        <FiMapPin /> {positionDetails?.location}
                      </li>
                      {positionDetails?.grade ? (
                        <li>
                          <PiMedal />
                          {positionDetails?.grade}
                        </li>
                      ) : null}

                      {positionDetails?.payscale && (
                        <li>
                          <PiMoney />
                          PKR: {positionDetails?.payscale}
                        </li>
                      )}
                    </ul>
                    <a
                      href={
                        isUrdu
                          ? `/${params.lang}/careers/open-positions/${params?.position}/apply-now`
                          : `/careers/open-positions/${params?.position}/apply-now`
                      }
                      className='butn butn-solid butn-large d-block text-center'
                      onClick={handleButtonClick}
                    >
                      Apply
                    </a>
                    {/* <a href='#' className='butn butn-outline butn-large d-block text-center '>
                  Share job posting
                </a> */}
                  </div>
                  <ShareButtons />
                </div>
              </aside>
            ) : (
              <aside className='offset-md-1 col-md-4'></aside>
            )}
          </div>
        </div>
      </section>
      <section className='section-py-lg bg-grey' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 d-md-flex justify-content-between'>
              {/* <h2 className='mb-2 mb-md-4'>{positionDetails?.peopledepartment?.edges?.[0]?.node?.name}</h2> */}
              <h2 className='mb-2 mb-md-4'>Meet the team</h2>
              {peoplesdepartment.length > 4 ? (
                <a
                  className='tx-krnblue'
                  href={`${peopleAtKarandaazUrl}?department=${positionDetails?.peopledepartment?.edges?.[0]?.node?.name}`}
                >
                  View All <GoArrowRight className='tx-large' />
                </a>
              ) : null}
            </div>
            {peoplesdepartment?.map((person: any, index: number) => {
              return (
                <div className='col-md-3' key={person?.id || index}>
                  <PeopleCard
                    imgUrl={person?.featuredImage?.node?.sourceUrl}
                    caption={person?.featuredImage?.node?.caption}
                    theme={person?.ourLeader?.profileimagetheme}
                    title={person?.title}
                    position={person?.ourLeader?.memberPosition}
                    desc={person?.content}
                    section='people'
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
