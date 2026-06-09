'use client'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
import { LiaFacebookF } from 'react-icons/lia'
import { FaCopy } from 'react-icons/fa'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import { usePathname } from 'next/navigation'
import { siteUrl } from '../../../../utils/urls'
import './share-buttons.css'
export default function ShareButtons({ isUrdu }: { isUrdu?: boolean }) {
  const shareUrl = siteUrl + usePathname()

  async function handleCopyLink() {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert('Link copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }
  return (
    <div className='social-share mt-4' dir={isUrdu ? 'rtl' : 'ltr'}>
      <p className='tx-small tx-bold tx-grey100 mb-0'>{isUrdu ? 'شیئر کریں' : 'Share'}</p>
      <ul className='social-icons list-inline d-flex justify-start mt-2 p-0'>
        <li className='pe-2'>
          <a href='#' target='_blank'>
            <FacebookShareButton url={shareUrl}>
              <LiaFacebookF />
            </FacebookShareButton>
          </a>
        </li>
        <li className='px-2'>
          <a href='#' target='_blank'>
            <LinkedinShareButton url={shareUrl}>
              <FaLinkedinIn />
            </LinkedinShareButton>
          </a>
        </li>

        <li className='px-2'>
          <a href='#' target='_blank'>
            <TwitterShareButton url={shareUrl}>
              <BsTwitterX />
            </TwitterShareButton>
          </a>
        </li>
        <li className='px-2'>
          <a href='#' onClick={handleCopyLink}>
            <FaCopy />
          </a>
        </li>
      </ul>
    </div>
  )
}
