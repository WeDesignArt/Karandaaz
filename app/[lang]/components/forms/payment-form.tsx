'use client'
import React, { useEffect, useState } from 'react'
import { FormWrapper } from './form-wrapper'
import { GoArrowRight } from 'react-icons/go'
import { CiCircleInfo } from 'react-icons/ci'
import { tooltipMessages } from '../../../../utils/data'
import { emailPattern, errorMessage, namePattern, phonePattern, TooltipComp } from '../../../../utils/forms'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './forms.css'

// Forms show errors only when submitted atleast once
export const PaymentForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessages, setErrorMessages] = useState({
    firstName: true,
    lastName: true,
    contact: true,
    email: true,
    company: true,
    city: true,
    country: true,
  })

  const handleInputChange = (e: any) => {
    const { id, value } = e.target
    if (id == 'firstName' || id == 'lastName') {
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
    if (id === 'company') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '', // Checks if the company field is empty
      }))
    }
    if (id === 'city' || id === 'country') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length < 5,
      }))
    }
  }

  const handlePhoneChange = (value: any) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ['contact']: value.trim() === '' || value.length < 6,
    }))
  }
  return (
    <FormWrapper
      apiEndpoint='/api/payment'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName='payment'
    >
      <div className='row g-3 p-4 p-md-0'>
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
            <label className='m-0 body2 tx-grey90 ms-1'>Contact Number</label>
            <PhoneInput
              country={'pk'}
              onChange={handlePhoneChange}
              inputProps={{
                id: 'contact',
                name: 'contact',
                className: `form-control contacttype body2 ${
                  isSubmitted && errorMessages.contact ? 'field-error' : ''
                }`,
              }}
            />
          </div>
          {isSubmitted && errorMessages.contact && <p className='errorState'>{errorMessage}</p>}
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
        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Company & Designation</label>
            <input
              type={'text'}
              className={`form-control body2 ${isSubmitted && errorMessages.company ? 'field-error' : ''}`}
              placeholder={'Company & Designation'}
              aria-label='company'
              name={'company'}
              id='company'
              onChange={handleInputChange}
            />
            {isSubmitted && errorMessages.company && <p className='errorState'>{errorMessage}</p>}
          </div>
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Principal Location (City)
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.city ? 'field-error' : ''}`}
              name={'city'}
              id='city'
              onChange={handleInputChange}
            >
              <option selected value={''}>
                Select City
              </option>
              <option>1.</option>
              <option>2.</option>
            </select>
          </div>
          {isSubmitted && errorMessages.city && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Country
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.country ? 'field-error' : ''}`}
              name={'country'}
              id='country'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Select Country
              </option>
              <option>1.</option>
              <option>2.</option>
            </select>
          </div>
          {isSubmitted && errorMessages.country && <p className='errorState'>{errorMessage}</p>}
        </div>
        <button
          type='submit'
          className='btn btn-primary mb-3 rounded-pill body2 tx-grey00'
          onClick={() => setIsSubmitted(true)}
        >
          Make Small Payment
          <span className='mx-2'>
            <GoArrowRight />
          </span>
        </button>
      </div>
    </FormWrapper>
  )
}
