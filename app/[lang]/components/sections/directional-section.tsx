import Image from 'next/image'
import React from 'react'
import { GoArrowRight } from 'react-icons/go' // Import an arrow icon
import { portalUrl } from '../../../../utils/urls'

type SectionProps = {
  title: string
  desc: string
  imageUrl: string
  buttonText?: string
  buttonLink?: string
  rightToLeft: boolean
  arrowIcon?: boolean // Made arrowIcon optional
  sectionID?: string
  isUrdu?: boolean
  onclick?: () => void // Correct type for the onclick prop
}

// Section with card + desc + button for various modules
export const DirectionalSection = ({
  title,
  desc,
  imageUrl,
  buttonText,
  buttonLink,
  rightToLeft,
  arrowIcon,
  sectionID = '',
  isUrdu,
  onclick,
}: SectionProps) => {
  const paddingLeft = isUrdu ? 'pe-md-5' : 'ps-md-5'
  const paddingRight = isUrdu ? 'ps-md-5' : 'pe-md-5'
  const imageOrder = rightToLeft ? 'order-md-0' : 'order-md-1'
  const contentOrder = rightToLeft ? `order-md-1 ${paddingLeft}` : `order-md-0 ${paddingRight}`

  // Extract the correct link from buttonLink starting from 'https:'
  const correctButtonLink = buttonLink?.includes('https:')
    ? buttonLink.substring(buttonLink.indexOf('https:')) // Extract the URL starting from 'https:'
    : buttonLink // If 'https:' is not found, use the original buttonLink

  return (
    <div className='section-py-md container image-grid' id={sectionID}>
      <div className='row'>
        <div
          className={`col-md-6 ${imageOrder}`}
          data-aos='fade-up'
          data-aos-offset='200'
          data-aos-delay='50'
          data-aos-duration='1000'
          data-aos-easing='ease-in-out'
          data-aos-mirror='true'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
        >
          <Image
            className='br-r20'
            src={imageUrl}
            width={0}
            height={0}
            style={{ width: '100%' }}
            sizes='100vw'
            alt=''
          />
        </div>
        <div className={`col-md-6 d-flex flex-wrap align-items-center p-md-0 mt-5 mt-md-0 ${contentOrder}`}>
          <div className='h-auto'>
            <h3 className='tx-grey90 pb-3'>{title}</h3>
            <div className='tx-grey80' dangerouslySetInnerHTML={{ __html: desc || '' }} />
            {buttonText?.trim() ? (
              <a
                className='butn butn-solid ms-0 mt-4'
                href={buttonLink === '/research/karandaaz-data-portal' ? portalUrl : correctButtonLink}
              >
                {buttonText}
                {arrowIcon && <GoArrowRight className='ms-2' />} {/* Conditional rendering of the arrow icon */}
              </a>
            ) : null}
            {onclick ? (
              <button className='butn butn-solid ms-0 mt-4' onClick={onclick}>
                Apply Now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
