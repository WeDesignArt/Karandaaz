import React from 'react'
import './entityBox.css'
type EntityBoxProps = {
  data: any
}

export const EntityBox = ({ data }: EntityBoxProps) => {
  return (
    <div className='box-entities bg-blue00'>
      <h6>{data?.mainHeading}</h6>
      <ul>
        <li>
          <p className='body-sm tx-grey90'>{data?.heading1}</p>
          <h4 className='tx-grey90'>{data?.value1}</h4>
        </li>
        <li>
          <p className='body-sm tx-grey90'>{data?.heading2}</p>
          <h4 className='tx-grey90'>{data?.value2}</h4>
        </li>
        <li>
          <p className='body-sm tx-grey90'>{data?.heading3}</p>
          <h4 className='tx-grey90'>{data?.value3}</h4>
        </li>
      </ul>
    </div>
  )
}
