'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useMediaQuery from '../../../../hooks/useMediaQuery'

export const ImagesSwiper = ({ urls }: any) => {
  const media = useMediaQuery()
  const isMobile = media ? media.width < 768 : false
  return (
    <Swiper
      className='logo-carousel'
      pagination={{ clickable: true }}
      slidesPerView={isMobile ? 2 : urls?.length < 5 ? urls?.length : 5}
      spaceBetween={isMobile ? 24 : 40}
      modules={[Autoplay, Pagination]}
      loop={true}
      autoplay={true}
    >
      {urls?.map((url: any) => (
        <SwiperSlide>
          <Image src={url} width={0} height={0} style={{ width: 'auto', height: '120px' }} sizes='100vw' alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
