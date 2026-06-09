import React from 'react'
import { SlClock } from 'react-icons/sl'
import { FiMapPin } from 'react-icons/fi'
import './jobposition-card.css'
import Link from 'next/link'
import moment from 'moment'
import { LuCalendarDays } from 'react-icons/lu'
import { GoArrowRight } from 'react-icons/go'

type JobPositionCardProps = {
  title: string
  location?: string
  link: string
  shiftCategory?: string
  deadline?: string
}
export const JobPositionCard = ({ title, location, link, shiftCategory, deadline }: JobPositionCardProps) => {
  return (
    <Link href={link} target='_blank' className='job-item d-block'>
      <h5 className='tx-krnblue title'>{title}</h5>
      <ul className='job-detail tx-grey60'>
        {shiftCategory ? (
          <li>
            <SlClock /> {shiftCategory}
          </li>
        ) : null}

        {location ? (
          <li>
            <FiMapPin /> {location}
          </li>
        ) : null}
        {deadline ? (
          <li>
            <LuCalendarDays />
            {moment(deadline).format('MMMM D YYYY')}
          </li>
        ) : null}
      </ul>
      <p className='tx-krnblue text-end mb-0 mt-4'>
        View Details <GoArrowRight className='tx-large' />
      </p>
    </Link>
  )
}
