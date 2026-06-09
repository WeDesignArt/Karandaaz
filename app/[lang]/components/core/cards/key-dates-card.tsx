import React from 'react'

type DateCardProps = {
  month: string
  day: string
  description: string
  index: number
  colClass?: string
}

const KeyDatesCard = ({ month, day, description, index, colClass }: DateCardProps) => {
  return (
    <div className={`${colClass || 'col-md-3'} ${index > 0 ? 'mt-4 mt-md-0' : 'mt-0'}`}>
      <div className='card bg-dfagreen'>
        <h6 className='tx-white'>{month}</h6>
        <hr className='br-white my-2'></hr>
        <h2 className='tx-white'>{day}</h2>
        <p className='tx-white mb-0'>{description}</p>
      </div>
    </div>
  )
}

export default KeyDatesCard
