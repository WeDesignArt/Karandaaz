import Image from 'next/image'
import React, { useState } from 'react'
import './people-card.css'
import Link from 'next/link'
import { UserModal } from '../../modals/user-modal'
type Props = {
  imgUrl: string
  title: string
  position: string
  linkUrl?: string
  desc: string
  section: 'authors' | 'people'
  theme: string
  caption: string
}
// Component for in People At Karandaaz Module & Blogs/Authors
export const PeopleCard = ({ imgUrl, title, position, linkUrl, desc, section, theme, caption }: Props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {section == 'authors' ? (
        <Link href={linkUrl ? linkUrl : ''}>
          <div className='card-pak'>
            <div className={`img-wrap ${theme}`}>
              <Image
                src={imgUrl}
                className={`mb-2 mb-md-4 ${caption?.includes('temp') ? 'temp-img' : 'main-img'}`}
                width={0}
                height={0}
                sizes='100vw'
                quality={100}
                alt=''
              />
            </div>
            <div className='pak-info'>
              <h5 className='tx-krnblue'>{title}</h5>
              <p className='tx-bold tx-small tx-grey80'>{position}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div onClick={handleShow} className='cursor-pointer'>
          <div className='card-pak'>
            <div className={`img-wrap ${theme}`}>
              <Image
                src={imgUrl}
                className={`mb-2 mb-md-4 ${caption?.includes('temp') ? 'temp-img' : 'main-img'}`}
                width={0}
                height={0}
                sizes='100vw'
                quality={100}
                alt=''
              />
            </div>
            <div className='pak-info'>
              <h5 className='tx-krnblue'>{title}</h5>
              <p className='tx-bold tx-small tx-grey80'>{position}</p>
            </div>
          </div>
        </div>
      )}
      {section == 'people' ? (
        <UserModal
          handleClose={handleClose}
          show={show}
          title={title}
          desc={desc ? desc : ''}
          imgUrl={imgUrl}
          position={position}
          theme={theme}
        />
      ) : null}
    </>
  )
}
