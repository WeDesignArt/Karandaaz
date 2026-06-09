import Image from 'next/image'
import React from 'react'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import './portfolio-card.css'
import Link from 'next/link'
type PortfolioCardProps = {
  title: string
  imgLink: string
  description?: string
  link: string
  isUrdu?: boolean
}

const PortfolioCard = ({ title, imgLink, link, description, isUrdu }: PortfolioCardProps) => {
  return (
    <div className='portfolio-card'>
      <Link href={link}>
        <div className='pc-upper'>
          <Image src={imgLink} width={0} height={0} style={{ width: '100%' }} sizes='100vw' alt='portfolio/image' />
        </div>
      </Link>
      <div className='pc-lower'>
        <Link href={link}>
          <h4 className='mb-0 d-flex justify-content-between align-item-center'>
            <span className='flex-1'>
              {title} {isUrdu ? <GoArrowLeft className='tx-yellow50' /> : <GoArrowRight className='tx-yellow50' />}
            </span>
          </h4>
        </Link>
        {/* <div className='tx-small tx-grey60'>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div> */}
        <p className='portfolio-desc mt-3' dangerouslySetInnerHTML={{ __html: description ? description : '' }} />
      </div>
    </div>
  )
}

export default PortfolioCard
