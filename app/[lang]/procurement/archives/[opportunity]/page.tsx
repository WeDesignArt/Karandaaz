import React from 'react'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { getProcurementBySlug } from '../../../api/lib/procurement'
import { SlClock } from 'react-icons/sl'
import { FiMapPin } from 'react-icons/fi'
import './page.css'

export default async function Article({ params }: { params: { opportunity: string } }) {
  const res = await getProcurementBySlug(params?.opportunity)
  if (!res) {
    return notFound()
  }
  return (
    <div>
      <section className='section-py-md' dir='ltr'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <div className='col-md-10 text-center mx-auto'>
                <Breadcrumb />
                <h2 className='pb-2 pb-md-2'>Archive Opportunities</h2>
              </div>
              <div className='col-md-9 text-center mx-auto'>
                <h4 className='tx-grey50'>These opportunities are now closed</h4>
              </div>
            </div>
            <div className='offset-md-2 col-sm-12 col-md-8'>
              <div className='opportunity_details'>
                <h5>{res?.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: res?.content }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
