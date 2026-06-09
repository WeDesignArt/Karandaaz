import Link from 'next/link'
import React from 'react'
import './library-card.css'
import { ContactForm } from '../../forms/contact-form'
type LibraryCardProps = {
  title: string
  link?: string
  reportType: string
  source: string
  year: string
}

const LibraryCard = ({ title, link, reportType, source, year }: LibraryCardProps) => {
  return (
    <div>
      <Link href='#' className='rl-box' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        <h5 className='tx-krnblue pb-2 pb-md-3'>{title}</h5>
        <ul className='rl-detail'>
          <li>
            <span>Type:</span> {reportType}
          </li>
          <li>
            <span>Source:</span> {source}
          </li>
          <li>
            <span>Year:</span> {year}
          </li>
        </ul>
      </Link>
      <div className='modal fade' id='exampleModal' aria-labelledby='exampleModalLabel'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-body'>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibraryCard
