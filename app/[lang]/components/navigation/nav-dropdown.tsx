import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import './nav-dropdown.css'
import useMediaQuery from '../../../../hooks/useMediaQuery'

type NavDropdownProps = {
  title: string
  desc: string
  header1: any
  header2?: any
  header3?: any
  header4?: any
  lang: string
}

export const NavDropdown = ({ title, desc, header1, header2, header3, header4, lang }: NavDropdownProps) => {
  const media = useMediaQuery()
  const isMobile = media ? media.width < 768 : false
  const isRTL = lang === 'ur'
  const textAlignmentClass = isRTL ? 'text-end' : 'text-start'

  const headers = [
    { title: header1?.title, values: header1?.values, heading: header1?.heading },
    { title: header2?.title, values: header2?.values, heading: header2?.heading },
    { title: header3?.title, values: header3?.values, heading: header3?.heading },
    { title: header4?.title, values: header4?.values, heading: header4?.heading },
  ]
  return (
    <div>
      <a className='nav-link dropdown-toggle p-0 m-0 d-none d-md-block'>
        {title} <IoIosArrowDown />
      </a>

      <a
        href=''
        className='nav-link dropdown-toggle p-0 m-0  d-md-none'
        data-bs-toggle='dropdown'
        data-bs-auto-close='outside'
      >
        {title} <IoIosArrowDown />
      </a>

      <div className='dropdown-menu'>
        <div className='mega-content px-lg-4'>
          <div className={`row`}>
            <div className={`col-lg py-lg-4 ${textAlignmentClass}`}>
              <h4 className='d-none d-lg-block'>{title}</h4>
              <div className='card-custom'>
                <p className='tx-grey60 navDropdownText'>{desc}</p>
              </div>
            </div>
            {headers.map((header, index) => (
              <div key={index} className={`col-lg pb-0 pb-lg-4 py-4 ${textAlignmentClass}`}>
                {header.heading ? (
                  <>
                    <Link href={isRTL ? `/ur/${header?.heading.toLowerCase()}` : `/${header?.heading.toLowerCase()}`}>
                      <h6 className='tx-krnblue'>{headers[index]?.title}</h6>
                    </Link>

                    <div className='border-bottom'></div>
                  </>
                ) : null}
                <div className='list-group'>
                  {header.values?.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className='col hoverDropdownText'>
                      <Link className='list-group-item tx-krnblue navDropdownText' href={link.link || '#'}>
                        {link.value}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
