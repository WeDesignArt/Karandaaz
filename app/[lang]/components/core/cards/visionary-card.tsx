import Image from 'next/image'
import React, { useState } from 'react'
import './visionary-card.css'
import { GoArrowRight } from 'react-icons/go'
import { UserModal } from '../../modals/user-modal'
import darkBackground from './../../../images/pattren-Dark.png'
import lightBackground from './../../../images/pattren-Light.png'

type Props = {
  imgUrl: string
  title: string
  content: string
  position: string
  deptPosition: string
  theme: string
  caption: string
  type: string
  isPrimary: boolean
}
export const VisionaryCard = ({
  imgUrl,
  title,
  content,
  position,
  deptPosition,
  theme,
  caption,
  type,
  isPrimary,
}: Props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const isDark = theme === 'Dark'
  const isLight = theme === 'Light'
  return (
    <>
      <div onClick={handleShow} className='cursor-pointer'>
        <div className='team-card-body'>
          <div className={`img-wrap ${theme}`}>
            <Image
              src={imgUrl}
              className={`mb-2 mb-md-4 ${caption?.includes('temp') ? 'temp-img' : 'main-img'}`}
              width={0}
              height={0}
              sizes='100vw'
              alt=''
            />
            {isDark && <Image src={darkBackground} className='pattren' width={0} height={0} sizes='100vw' alt='' />}
            {isLight && <Image src={lightBackground} className='pattren' width={0} height={0} sizes='100vw' alt='' />}
          </div>

          <div className='bod-info'>
            <h5>{title}</h5>
            <p className='tx-bold tx-grey100 mb-0'>{position}</p>
            {deptPosition && (
              <p className='tx-grey50 mb-0'>
                {isPrimary ? deptPosition : 'Member'}, {type}
              </p>
            )}
            <p className='mt-3' dangerouslySetInnerHTML={{ __html: content }} />
            <a className='tx-krnblue'>
              Read More <GoArrowRight className='tx-large' />
            </a>
          </div>
        </div>
      </div>
      <UserModal
        handleClose={handleClose}
        show={show}
        title={title}
        desc={content}
        imgUrl={imgUrl}
        position={position}
        theme={theme}
      />
    </>
  )
}
