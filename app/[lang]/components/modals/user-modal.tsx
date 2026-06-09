'use client'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import './user-modal.css'
type UserModalProps = {
  title: string
  desc: string
  imgUrl: string
  position: string
  show: boolean
  handleClose: any
  theme: string
}

export const UserModal = ({ title, desc, show, imgUrl, position, handleClose, theme }: UserModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} size='xl' centered>
      <button type='button' className='btn-close' onClick={handleClose}></button>
      <div className='d-md-flex modal-wrapper'>
        <div className={`modal-img ${theme}`}>
          <Image
            src={imgUrl ? imgUrl : ''}
            className='profile'
            width={0}
            height={0}
            style={{ width: '100%' }}
            sizes='100vw'
            alt=''
          />
        </div>
        <div className='modal-body flex-1'>
          <h4>{title ? title : ''}</h4>
          <h6 className='tx-grey80'>{position ? position : ''}</h6>
          <p dangerouslySetInnerHTML={{ __html: desc ? desc : '' }} />
        </div>
      </div>
    </Modal>
  )
}
