'use client'
import Image from 'next/image'
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './user-modal.css'
type SuccessModalProps = {
  show: boolean
  handleClose: any
  formName: string
}
export const SuccessModal = ({ show, handleClose, formName }: SuccessModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <button type='button' className='btn-close' onClick={handleClose}></button>
      <div className='row'>
        <div className='col-sm-12 text-center p-3 p-md-5'>
          {formName !== 'contact' && (
            <Image
              src='https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/success.png'
              className='mb-3 mb-md-5'
              width={0}
              height={0}
              style={{ width: 'auto', height: 'auto' }}
              sizes='100vw'
              alt=''
            />
          )}
          <h4 className='mb-3'>{formName === 'contact' ? 'Submission Received' : 'Application submitted'}</h4>
          {formName === 'careers' && (
            <p>
              Thank you for applying! We’re excited about the possibility of you joining our mission for shared
              prosperity in Pakistan! Our team is reviewing applications and will reach out soon if you are shortlisted.{' '}
              <br></br>
              Meanwhile, feel free to explore our corporate values and see how we foster a collaborative workforce at
              Karandaaz Pakistan.
            </p>
          )}
          <a className='butn butn-solid' href='/'>
            Back to Home
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal
