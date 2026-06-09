import Link from 'next/link'
import React from 'react'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
type Props = {
  title: string
  children: React.ReactNode
  theme?: string
  link?: string
  isUrdu?: boolean
}

export const NewsGroup = ({ title, children, theme = 'dark', link = '', isUrdu = false }: Props) => {
  const headingColor = theme == 'dark' ? 'tx-blue20' : ''
  const linkColor = theme == 'dark' ? 'tx-grey00' : 'tx-krnblue'

  return (
    <div className='mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className={`${headingColor} text-left mb-4`}>{title}</h4>
        <Link href={link} className={`${linkColor} p-0 m-0 d-flex mb-4`}>
          <p className='p-0 m-0 pe-1 subtitle-style-1 underline-hover text-nowrap'> View All</p>
          <p className='p-0 m-0 '>
            {isUrdu ? <GoArrowLeft className='tx-medium' /> : <GoArrowRight className='tx-medium' />}
          </p>
        </Link>
      </div>
      {children}
    </div>
  )
}
