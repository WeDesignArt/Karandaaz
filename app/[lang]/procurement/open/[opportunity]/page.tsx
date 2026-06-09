import React from 'react'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { getProcurementBySlug } from '../../../api/lib/procurement'
import moment from 'moment'
import { LuCalendarDays } from 'react-icons/lu'
import './page.css'

export default async function Article({ params }: { params: { opportunity: string; lang: any } }) {
  const res = await getProcurementBySlug(params?.opportunity)
  if (!res) {
    return notFound()
  }
  const deadline = res?.procurementoptions?.applicationdeadline
  return (
    <div>
      <section className='section-py-md no-urdu' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <div className='col-md-10 text-center mx-auto'>
                <Breadcrumb lang={params.lang} />
                <h2 className='pb-2 pb-md-2'>Open Opportunities</h2>
              </div>
            </div>
            <div className='offset-md-2 col-sm-12 col-md-8'>
              <div className='opportunity_details'>
                <h5>{res?.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: res?.content }} />
                <ul className='tx-grey60 details-list'>
                  {deadline && (
                    <li>
                      <LuCalendarDays /> {moment(deadline).format('MMMM D YYYY')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
