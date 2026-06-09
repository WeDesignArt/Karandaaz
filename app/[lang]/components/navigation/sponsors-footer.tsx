import React from 'react'
import Image from 'next/image'
import ukAid from './../../images/UK-international-development-colour.svg'
import billAndMalenda from './../../images/gatesfoundationprimarylogo.png'
import jamapunji from './../../images/jamapunji.svg'

const SponsorsFooter = ({ lang }: any) => {
  const isUrdu = lang === 'ur'
  return (
    <div className='py-5 border-top'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 mb-3'>
            <h4 className='subtitle-style-1'>{isUrdu ? 'ہمارے معاونین' : 'Our Sponsors'}</h4>
          </div>
          <div className='col-sm-12 col-md-8 col-lg-6'>
            <div className='d-flex flex-wrap justify-content-between gap-4'>
              <Image
                src={ukAid}
                width={0}
                height={52}
                style={{ width: 'auto' }}
                alt='Karandaaz Logo'
                className='object-fit-contain'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='500'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              />
              <Image
                src={billAndMalenda}
                width={0}
                height={44}
                style={{ width: 'auto' }}
                alt='Karandaaz Logo'
                className='object-fit-contain'
                data-aos='fade-up'
                data-aos-offset='200'
                data-aos-delay='50'
                data-aos-duration='100'
                data-aos-easing='ease-in-out'
                data-aos-mirror='true'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
              />
            </div>
          </div>
          {/* <div className='col-sm-12 offset-lg-4 col-md-4 col-lg-3 text-md-end mt-4 mt-md-0 text-center'>
            <Image
              src={jamapunji}
              width={0}
              height={0}
              style={{ width: 'auto' }}
              alt='Karandaaz Logo'
              className='object-fit-contain'
              data-aos='fade-up'
              data-aos-offset='200'
              data-aos-delay='50'
              data-aos-duration='1500'
              data-aos-easing='ease-in-out'
              data-aos-mirror='true'
              data-aos-once='true'
              data-aos-anchor-placement='top-bottom'
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SponsorsFooter
