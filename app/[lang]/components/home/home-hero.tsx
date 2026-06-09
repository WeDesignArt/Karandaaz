'use client'
import React from 'react'
import './home.css'

type HeroSectionProps = {
  heading: string
  videoSrc: string
}
export const HeroSection = ({ heading, videoSrc }: HeroSectionProps) => {
  return (
    <section className='hero-section'>
      <video autoPlay muted playsInline loop className='hero-video'>
        <source src={videoSrc} type='video/mp4' /> Your browser does not support the video tag.
      </video>
      <div className='video-overlay'></div>
      <div className='container'>
        <div className='row'>
          <div
            className='col-lg-5'
            data-aos='fade-up'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            data-aos-mirror='true'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
          >
            <h1 className='tx-white'>{heading}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
