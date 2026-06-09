import Image from 'next/image'
import React from 'react'
import './newsletter-card.css'
import { capitalizeFirstLetters, convertTitleToNewsLetterFormat } from '../../../../../utils/string'
type NewsletterCardProps = {
  title: string
  publication?: boolean
  link?: string
  imgurl: string
  publicationYear?: string
  type?: string
  isUrdu?: boolean
  onClick?: any
}

export const NewsletterCard = ({
  title,
  publication = false,
  imgurl,
  link,
  publicationYear = '',
  type,
  isUrdu = false,
  onClick,
}: NewsletterCardProps) => {
  const list = convertTitleToNewsLetterFormat(title)
  const [issue, quarter] = list

  return type === 'latest' ? (
    <a href={link ? link : ''} className='d-flex bg-grey latest-card' onClick={onClick}>
      <div className='card-body'>
        <h6 className='tx-blue30'>{publication ? publicationYear : quarter}</h6>
        <h5 className='card-text pt-2 mb-0'>{publication ? capitalizeFirstLetters(title) : issue}</h5>
        <button className='butn butn-solid btn-primary rounded-pill body2 tx-grey00 mt-4'>
          {isUrdu
            ? publication
              ? 'اشاعت پڑھیں'
              : 'نیوز لیٹر پڑھیں'
            : publication
            ? 'Read Publication'
            : 'Read NewsLetter'}
        </button>
      </div>
      <Image src={imgurl} className='card-img-top' width={0} height={0} sizes='100vw' alt='' />
    </a>
  ) : (
    <a href={link ? link : ''} className='card border-0 bg-blue00 cursor-pointer mt-3 news-letter-card h-100'>
      <Image src={imgurl} className='card-img-top' width={0} height={0} sizes='100vw' alt='' />
      <div className='card-body pb-4 text-center'>
        <h5 className='card-text tx-krnblue pt-2 pb-2 mb-0'>{publication ? capitalizeFirstLetters(title) : issue}</h5>
        <h6 className='tx-blue30 mb-0'>{publication ? publicationYear : quarter}</h6>
      </div>
    </a>
  )
}
