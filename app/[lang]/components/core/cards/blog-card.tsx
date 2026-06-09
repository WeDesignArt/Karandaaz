import React from 'react'
import './blog-card.css'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'

type BlogCardProps = {
  title: string
  imgLink: string
  author?: string
  date?: any
  link?: string
  excerpt?: string
  section?: string
}
export const BlogCard = ({ title, imgLink, author, date, link, excerpt, section }: BlogCardProps) => {
  return (
    <Link href={link ? link : ''}>
      <div className='card border-0 cursor-pointer blogcardHover' dir='ltr'>
        <div className='position-relative inline-block'>
          <Image
            src={imgLink ? imgLink : ''}
            className='card-img-top'
            width={0}
            height={0}
            style={{ width: '100%' }}
            sizes='100vw'
            alt=''
          />
          {section === 'stories-of-impact' ? (
            <Image
              src={`https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/11/youtube-play.png`}
              width={75}
              height={50}
              sizes='100vw'
              alt='youtube play'
              className='position-absolute top-0 bottom-0 start-0 end-0 m-auto'
            />
          ) : null}
        </div>

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
    </Link>
  )
}
