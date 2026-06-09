'use client'
import React from 'react'
import './swiper.css'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useMediaQuery from '../../../../hooks/useMediaQuery'

export const ImagesMarquee = ({ urls }: any) => {
  const media = useMediaQuery()
  const isMobile = media ? media.width < 768 : false

  return (
    <section className='mt-5'>
      <Swiper
        className='gallery-carousel'
        pagination={{ clickable: true }}
        slidesPerView={isMobile ? 2 : 4.5}
        spaceBetween={isMobile ? 24 : 40}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {urls?.map((url: any) => (
          <SwiperSlide>
            <Image src={url} width={0} height={0} style={{ width: '100%', height: 'auto' }} sizes='100vw' alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
