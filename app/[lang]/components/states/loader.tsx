import React from 'react'

type Props = {
  center?: boolean
}
export const Loader = ({ center = false }: Props) => {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className='spinner-border text-primary m-4' role='status'>
        <span className='sr-only'></span>
      </div>
    </div>
  )
}
