import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './press-card.css'
type PressCardProps = {
  title: string
  link?: string
  imgLink: string
}

export const PressCard = ({ title, link, imgLink }: PressCardProps) => {
  return (
    <Link href={link ? link : ''}>
      <div className='card border-0 cursor-pointer presscard'>
        <Image src={imgLink} className='card-img object-fit-cover' width={200} height={400} alt='press-image' />
        <div className='presscard-overlay'></div>
        <div className='card-body position-absolute bottom-0 end-0 '>
          <h5 className='card-text tx-grey00 presscardTextHover'>{title}</h5>
        </div>
      </div>
    </Link>
  )
}
