import React from 'react'
import Link from 'next/link'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'

type HomeBodyCardProps = {
  theme: string
  title: string
  desc: string
  linksArr: any[]
  link: string
  cols?: string
  isUrdu?: boolean
}
export const HomeBodyCard = ({ theme, title, desc, linksArr, link, cols, isUrdu = false }: HomeBodyCardProps) => {
  const bgColor = theme == 'light' ? 'bg-blue00' : 'bg-blue50'
  const textColor = theme == 'light' ? 'tx-krnblue' : 'tx-blue00'
  // const colClass = cols == '3' ? 'row-cols-1 row-cols-lg-3' : 'row-cols-1 row-cols-lg-2'
  return (
    <div className={`card home-card h-100 border-0 p-2 p-md-4 ${bgColor} ${textColor}`}>
      <div className='card-body'>
        <Link href={link} className={textColor}>
          <h4 className='card-title d-flex align-items-center'>
            <span className='text-nowrap'>{title}</span>
            <span className='ms-1 ms-md-2 d-flex align-items-center'>
              {isUrdu ? <GoArrowLeft className='tx-yellow50' /> : <GoArrowRight className='tx-yellow50' />}
            </span>
          </h4>
        </Link>

        <p className='card-text pb-0 mb-0 pb-md-4'>{desc}</p>
        {/* <div className={`row ${colClass} gy-3 mt-0`}>
          {linksArr.map((link) => (
            <div
              className='col'
              data-aos='fade-up'
              data-aos-offset='200'
              data-aos-delay='50'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-mirror='true'
              data-aos-once='true'
              data-aos-anchor-placement='top-bottom'
            >
              <Link href={link.link} className={`underline-hover tx-bold ${textColor}`}>
                {link.value}
              </Link>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
