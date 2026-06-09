import React from 'react'
import Image from 'next/image'

type CardComponentProps = {
  imageSrc: string
  altText: string
  title: string
  description: string
  className?: string
  columns?: number
}

const WhoCanApplyCard = ({ imageSrc, altText, title, description, columns }: CardComponentProps) => {
  return (
    <div className={`${columns === 1 ? 'col-md-12' : 'col-md-6'}`}>
      <div className='card bg-grey h-100'>
        <Image
          src={imageSrc}
          className='mb-4'
          width={0}
          height={0}
          style={{ height: '150px', width: 'max-content' }}
          sizes='100vw'
          alt={altText}
        />
        <div className='card-content'>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </div>
  )
}

export default WhoCanApplyCard
