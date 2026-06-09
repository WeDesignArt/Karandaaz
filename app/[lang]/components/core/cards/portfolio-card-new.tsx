import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import './portfolio-card.css'

type PortfolioCardProps = {
  title: string
  imgLink: string
  description?: string
  link: string
  index: number  // Accept index as a prop
}

const PortfolioCardNew = ({ title, imgLink, link, description, index }: PortfolioCardProps) => {
  // Conditionally assign the order classes based on the index
  const firstColClass = index % 2 === 0 ? 'order-md-0' : 'order-md-1';
  const secondColClass = index % 2 === 0 ? 'order-md-1' : 'order-md-0';

  return (
    <div className='portfolio-card style-2'>
      <div className='row d-flex'>
        {/* Apply different order classes based on the index */}
        <div className={`col-md-6 ${firstColClass}`}>
          <Link href={link}>
            <div className='pc-upper'>
              <Image
                src={imgLink}
                width={0}
                height={0}
                style={{ width: '100%' }}
                sizes='100vw'
                alt='portfolio/image'
              />
            </div>
          </Link>
        </div>
        <div className={`col-md-6 ${secondColClass}`}>
          <div className='pc-lower'>
            <Link href={link}>
              <h4 className='mb-3 d-flex justify-content-between align-item-center'>
                <span className='me-2 flex-1'>{title}</span>
              </h4>
            </Link>
            <p
              className='portfolio-desc'
              dangerouslySetInnerHTML={{ __html: description ? description : '' }}
            />
            <a href={link} className='butn butn-solid mt-3'>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCardNew