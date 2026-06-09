import React from 'react'
import { getCompliancePageFields } from '../api/lib/compliance'
import { TopHeaderSection } from '../components/sections/top-header-section'

export default async function Compliance({ params }: any) {
  const res = await getCompliancePageFields()
  return (
    <div>
      <section className='section-py-md pb-0 subheader'>
        <TopHeaderSection heading='<h2>Compliance</h2>' lang={params.lang} />
        <div>
          <h4>{res?.status?.heading}</h4>
          <p>{res?.status?.content}</p>
          <h4>{res?.auditor?.heading}</h4>
          <p>{res?.auditor?.content}</p>
          <h4>{res?.secp?.heading}</h4>
          <p>{res?.secp?.content}</p>
        </div>
      </section>
    </div>
  )
}
