'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { RiHome6Line } from 'react-icons/ri'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { convertToTitleCase } from '../../../../utils/string'

export type SupportedLang = 'en' | 'ur'

type TBreadCrumbProps = {
  center?: boolean
  removeLast?: boolean
  lastItem?: string
  lang?: SupportedLang
}

export const Breadcrumb = ({ center = true, removeLast = false, lastItem, lang = 'en' }: TBreadCrumbProps) => {
  const [dictionary, setDictionary] = useState<any>(null)

  const isUrdu = lang === 'ur'

  useEffect(() => {
    async function fetchDictionary() {
      if (lang === 'ur') {
        const dict = await import('../../../../dictionaries/ur.json').then((module) => module.default)
        setDictionary(dict)
      } else {
        setDictionary(null)
      }
    }

    fetchDictionary()
  }, [lang])

  const paths = usePathname()
  const pathNames = paths
    .split('/')
    .filter((path) => path)
    .filter((segment) => Boolean(segment) && segment !== 'ur')

  const activeClass = 'px-1 px-md-2 tx-krnblue body1 breadcrumb-ellipsis'
  const nonActiveClass = 'px-1 px-md-2 tx-grey70 body1'
  const centerClass = center ? 'justify-content-center' : ''

  return (
    <div className={`d-flex flex-wrap breadcrumb ${centerClass}`}>
      <Link href={isUrdu ? `/${lang}` : '/'} className='px-1 px-md-2 tx-grey70 body2'>
        <RiHome6Line />
      </Link>
      {pathNames.map((link, index) => {
        const href = isUrdu
          ? `/${lang}/${pathNames.slice(0, index + 1).join('/')}`
          : `/${pathNames.slice(0, index + 1).join('/')}`
        const itemClasses = paths === href ? activeClass : nonActiveClass

        let itemLink = ''

        if (lang === 'ur' && dictionary) {
          itemLink = dictionary.breadCrumb[link] || convertToTitleCase(link)
        } else {
          itemLink = convertToTitleCase(link)
        }

        if (removeLast == false) {
          return (
            <React.Fragment key={index}>
              <p className='p-0 m-0 tx-grey30 body2'>
                <MdKeyboardArrowRight color='grey' />
              </p>
              <Link href={href} className={itemClasses}>
                {itemLink}
              </Link>
            </React.Fragment>
          )
        } else if (removeLast == true) {
          if (pathNames.length - 1 == index) {
            return (
              <React.Fragment key={index}>
                <p className='p-0 m-0 tx-grey30 body2'>
                  <MdKeyboardArrowRight color='grey' />
                </p>
                <Link href={href} className={itemClasses}>
                  {lastItem}
                </Link>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment key={index}>
                <p className='p-0 m-0 tx-grey30 body2'>
                  <MdKeyboardArrowRight color='grey' />
                </p>
                <Link href={href} className={itemClasses}>
                  {itemLink}
                </Link>
              </React.Fragment>
            )
          }
        }
      })}
    </div>
  )
}
