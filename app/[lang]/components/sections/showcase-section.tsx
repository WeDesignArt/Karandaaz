import Image from 'next/image'
import React from 'react'
import { GoArrowRight } from 'react-icons/go'

export const ShowcaseSection = () => {
  return (
    <section className='section-py-md'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='pt-2 pt-md-5'>
              <h3 className='pb-1 pb-md-1'>Showcase Your Research</h3>
              <p className='tx-large tx-grey60'>
                Be part of the library
              </p>
              <a className='butn butn-solid text-center ms-0' href='#'>
                Submit Content <GoArrowRight className='tx-large' />
              </a>
            </div>
          </div>
          <div className='col-sm-12 col-md-6'>
            <div className='text-end'>
              <Image
                src='/images/scyr.png'
                width={0}
                height={0}
                style={{ width: 'auto', height: '100%' }}
                sizes='100vw'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
