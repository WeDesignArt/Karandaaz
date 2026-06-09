'use client'
import { useState } from 'react'
import './scroll-nav.css'
import { Link } from 'react-scroll'

// Reusable Scrollable Component. Hidden on small screen sizes
export const ScrollNav = ({ items }: any) => {
  const [active, setActive] = useState(1)
  return (
    <nav className='d-none d-md-block sticky-top sticky-position mt-5'>
      <ul className='d-flex justify-content-center bg-white p-0 m-0'>
        {Object.keys(items).map((key, index) => {
          return (
            <Link
              className={`cursor-pointer p-3 subtitle-style-1 tx-krngrey ${index + 1 == active ? 'active-link' : ''}`}
              to={`section${index + 1}`}
              smooth={true}
              duration={300}
              offset={-70}
              onSetActive={() => setActive(index + 1)}
              spy
            >
              {items[key]?.navlabel}
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
