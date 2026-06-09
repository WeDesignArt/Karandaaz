import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './report-card.css'
type Props = {
  imageLink: string
  heading: string
  year: string
  reportLink: string
  type: string
}
export const ReportCard = ({ imageLink, heading, year, reportLink, type }: Props) => {
  return type === 'latest' ? (
    <Link className='d-flex bg-grey latest-card' href={reportLink ? reportLink : ''} target='_blank'>
      <div className='flex-1 card-body'>
        <h6 className='tx-krnblue'>{year}</h6>
        <h4 className='card-text'>{heading}</h4>
        <button className='btn btn-primary rounded-pill body2 tx-grey00 mt-4'>Read Report</button>
      </div>
      <Image src={imageLink} width={0} height={0} sizes='100vw' alt='' />
    </Link>
  ) : (
    <Link className='annual-report gap-3' href={reportLink ? reportLink : ''} target='_blank'>
      <Image src={imageLink} className='' width={0} height={0} sizes='100vw' alt='' />
      <div className='flex-1'>
        <p className='tx-krnblue'>{year}</p>
        <h4>{heading}</h4>
      </div>
    </Link>
  )
}
