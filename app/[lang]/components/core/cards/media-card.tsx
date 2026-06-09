import React from 'react'
import './media-card.css'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'

type MediaCardProps = {
  title: string
  imgLink: string
  author?: string
  date?: any
  link?: string
  excerpt?: string
}
export const MediaCard = ({ title, imgLink, author, date, link, excerpt }: MediaCardProps) => {
  return (
      <div className='card border-0 cursor-pointer' dir='ltr'>
        <Image
          src={imgLink ? imgLink : ''}
          className='card-img-top'
          width={0}
          height={0}
          style={{ width: '100%', height: '248px' }}
          sizes='100vw'
          alt=''
        />
        <div className='card-body'>
          <p className='card-text pt-2 pb-3 mb-0 subtitle-style-1 titleHeight'>{title}</p>
          {excerpt ? <p className='body2 tx-grey50' dangerouslySetInnerHTML={{ __html: excerpt }} /> : ''}
          <div className='d-flex justify-content-between tx-grey70 pt-md-4  bottom-0'>
            {author ? (
              <p className='body-sm'>
                <span> {author ? author : ''} </span> <span className='px-2'>| </span>
                <span> {date ? moment(date).format('MMMM D YYYY') : ''}</span>
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
  )
}
