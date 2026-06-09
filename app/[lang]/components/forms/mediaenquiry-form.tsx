'use client'
import { tooltipMessages } from '../../../../utils/data'
import { emailPattern, errorMessage, namePattern, TooltipComp } from '../../../../utils/forms'
import { useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import { GoArrowRight } from 'react-icons/go'
import { FormWrapper } from './form-wrapper'
import './forms.css'

// Forms show errors only when submitted atleast once
export const MediaEnquiryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [errorMessages, setErrorMessages] = useState({
    firstName: true,
    lastName: true,
    email: true,
    enquiry: true,
    organization: true,
  })

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
    if (id === 'enquiry') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 150,
      }))
    }
    if (id === 'organization') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 40,
      }))
    }
  }

  return (
    <FormWrapper
      apiEndpoint='/api/mediainquiry'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName='mediainquiry'
    >
      <div className='row gy-3' id='mediaform'>
        <div className='col-md-6'>
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
        <div className='col-md-6'>
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
        <div className='col-md-6'>
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
        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Organization</label>
            <input
              type='text'
              id='organization'
              className={`form-control body2 ${isSubmitted && errorMessages.organization ? 'field-error' : ''}`}
              placeholder={'Organization'}
              aria-label='Organization'
              name='organization'
              onChange={handleInputChange}
            />
          </div>
          {isSubmitted && errorMessages.organization && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Enquiry</label>
            <textarea
              id='enquiry'
              className={`form-control body2 ${isSubmitted && errorMessages.enquiry ? 'field-error' : ''}`}
              placeholder='Write your message...'
              aria-label='enquiry'
              name='enquiry'
              rows={3}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSubmitted && errorMessages.enquiry && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <button
            type='submit'
            className='btn btn-primary mb-3 rounded-pill body2 tx-grey00 w-100'
            onClick={() => setIsSubmitted(true)}
          >
            Submit <GoArrowRight className='tx-medium' />
          </button>
        </div>
      </div>
    </FormWrapper>
  )
}
