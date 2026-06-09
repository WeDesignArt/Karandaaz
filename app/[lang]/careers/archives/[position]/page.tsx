'use client' // Add this at the top of your component
import React from 'react'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import './page.css'
import { SlClock } from 'react-icons/sl'
import { FiMapPin } from 'react-icons/fi'
import { PiMedal } from 'react-icons/pi'
import ShareButtons from '../../../components/core/share-buttons'
import { PiMoney } from 'react-icons/pi'
import moment from 'moment'
import { getAJobPosition } from '../../../api/lib/careers'

export default async function archivedPosition({ params }: { params: { position: string; lang: any } }) {
  const res = await getAJobPosition(params?.position)
  const positionDetails = res?.jobposition
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
    </main>
  )
}
