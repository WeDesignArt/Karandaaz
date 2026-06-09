'use client'
import React from 'react'
import { useState } from 'react'
import { tooltipMessages } from '../../../../utils/data'
import { FormWrapper } from './form-wrapper'
import { CiCircleInfo } from 'react-icons/ci'
import './forms.css'
import { emailPattern, errorMessage, namePattern, TooltipComp } from '../../../../utils/forms'

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Error Message true by default - bc all fields are empty
  const [errorMessages, setErrorMessages] = useState({
    firstName: true,
    lastName: true,
    email: true,
    message: true,
    subject: true,
  })

  // FormsShow errors only when submitted atleast once
  const handleInputChange = (e: any) => {
    const { id, value } = e.target
    if (id === 'firstName' || id === 'lastName') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.length <= 1 || !namePattern.test(value),
      }))
    }
    if (id === 'email') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.length <= 1 || value.length >= 30 || !emailPattern.test(value),
      }))
    }
    if (id === 'message' || id === 'subject') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 150,
      }))
    }
  }

  return (
    <FormWrapper
      apiEndpoint='/api/contact'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName='contact'
    >
      <div className='row gy-3 p-4 p-md-0' dir='ltr'>
        <h5 className='mb-4'>Have a question? Send us a message and we will get back to you</h5>
        <div className='col-12 col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>First Name</label>
            <input
              type='text'
              className={`form-control body2 ${isSubmitted && errorMessages.firstName ? 'field-error' : ''}`}
              placeholder={'First name'}
              aria-label='First name'
              name='firstName'
              id='firstName'
              onChange={handleInputChange}
            />
          </div>
          {isSubmitted && errorMessages.firstName && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12 col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Last Name</label>
            <input
              type='text'
              id='lastName'
              className={`form-control body2 ${isSubmitted && errorMessages.lastName ? 'field-error' : ''}`}
              placeholder={'Last name'}
              aria-label='Last name'
              name='lastName'
              onChange={handleInputChange}
            />
          </div>
          {isSubmitted && errorMessages.lastName && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Email Address</label>
            <div className='form-element'>
              <input
                type='email'
                id='email'
                className={`form-control body2 ${isSubmitted && errorMessages.email ? 'field-error' : ''}`}
                placeholder={'example@gmail.com'}
                aria-label='email'
                name={'email'}
                onChange={handleInputChange}
              />
              <TooltipComp title={tooltipMessages.email} id='email'>
                <CiCircleInfo color='grey' />
              </TooltipComp>
            </div>
          </div>
          {isSubmitted && errorMessages.email && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Subject
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.subject ? 'field-error' : ''}`}
              name={'subject'}
              id='subject'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Subject
              </option>
              <option>General inquiry</option>
              <option>Procurement & vendor services</option>
              <option>Careers & job opporunities</option>
              <option>Communication & media query</option>
              <option>Research & insights request</option>
              <option>Investment & funding inquiry</option>
              <option>Collaboration opportunities</option>
            </select>
          </div>
          {isSubmitted && errorMessages.subject && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Message</label>
            <textarea
              id='message'
              className={`form-control body2 ${isSubmitted && errorMessages.message ? 'field-error' : ''}`}
              placeholder='Write your message...'
              aria-label='Message'
              name='message'
              rows={3}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSubmitted && errorMessages.message && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12 form-btn-gap'>
          <button
            type='submit'
            className='btn btn-primary mb-3 rounded-pill body2 tx-grey00 w-100'
            onClick={() => setIsSubmitted(true)}
          >
            Send message
          </button>
        </div>
      </div>
    </FormWrapper>
  )
}
