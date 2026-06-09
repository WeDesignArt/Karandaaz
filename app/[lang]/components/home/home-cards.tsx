import Image from 'next/image'
import React from 'react'
import { HomeBodyCard } from '../core/cards/homebody-card'
import { convertStringToArray } from '../../../../utils/string'
export const HomeCards = ({ data, lang }: any) => {
  const isUrdu = lang === 'ur'
  return (
    <section className='section-py-md'>
      <div className='container'>
        <div className='col-sm-12 col-lg-9 mx-auto mb-5'>
          <h2 className='text-center mx-auto'>{data.title}</h2>
          <p className='text-center mx-auto w-lg-75 mb-0 mt-4'>{data.content}</p>
        </div>
        <div className='grid-x-gap-2-col row gy-4 gx-4 home-grid-section'>
          <div className='col-12 col-md-4 d-lg-none'>
            <Image
              src={data?.cards1?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-8'
            data-aos='fade-in'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            data-aos-mirror='true'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
          >
            <HomeBodyCard
              theme={'dark'}
              title={data?.cards1?.title}
              desc={data?.cards1?.content}
              linksArr={convertStringToArray(data?.cards1?.links)}
              link={isUrdu ? '/ur/capital' : '/capital'}
              isUrdu={isUrdu}
            />
          </div>
          <div
            className='col-12 col-md-4 d-none d-lg-block'
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
              src={data?.cards1?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-4'
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
              src={data?.cards2?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-8'
            data-aos='fade-in'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            data-aos-mirror='true'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
          >
            <HomeBodyCard
              theme='light'
              title={data?.cards2?.title}
              desc={data?.cards2?.content}
              linksArr={convertStringToArray(data?.cards2?.links)}
              link={isUrdu ? '/ur/innovation-investments' : '/innovation-investments'}
              isUrdu={isUrdu}
            />
          </div>
          <div
            className='col-12 col-md-4 d-lg-none'
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
              src={data?.cards3?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-8'
            data-aos='fade-in'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            data-aos-mirror='true'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
          >
            <HomeBodyCard
              theme={'dark'}
              title={data?.cards3?.title}
              desc={data?.cards3?.content}
              linksArr={convertStringToArray(data?.cards3?.links)}
              link={isUrdu ? '/ur/digital' : '/digital'}
              isUrdu={isUrdu}
            />
          </div>
          <div
            className='col-12 col-md-4 d-none d-lg-block'
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
              src={data?.cards3?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-4'
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
              src={data?.cards4?.image?.node?.sourceUrl}
              width={0}
              height={0}
              style={{ width: '100%' }}
              sizes='100vw'
              alt='Karandaaz Logo'
            />
          </div>
          <div
            className='col-12 col-md-8'
            data-aos='fade-in'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            data-aos-mirror='true'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
          >
            <HomeBodyCard
              theme='light'
              title={data?.cards4?.title}
              desc={data?.cards4?.content}
              linksArr={convertStringToArray(data?.cards4?.links)}
              link={isUrdu ? '/ur/research' : '/research'}
              cols='3'
              isUrdu={isUrdu}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
