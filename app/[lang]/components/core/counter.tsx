import React from 'react'
type CounterProps = {
  prefix: string
  value: string
  suffix: string
}

export const Counter = ({ prefix, value, suffix }: CounterProps) => {
  return (
    <div className='counter'>
      <h6 className='tx-blue20 mb-0' style={{height: '1.5rem'}}>{prefix}</h6>
      <h1 className='tx-krnblue num-stats'>
        <span className='counter-val'>{value}</span>
      </h1>
      <p>{suffix}</p>
    </div>
  )
}