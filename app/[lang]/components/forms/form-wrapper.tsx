'use client'
import React, { useState } from 'react'
import SuccessModal from '../modals/success-modal'
import { Loader } from '../states/loader'

type Props = {
  children: React.ReactNode
  apiEndpoint: string
  errors: any
  backgroundColor: string
  formName: string
  customFormData?: (formData: FormData) => FormData
}

export const FormWrapper = ({ children, apiEndpoint, errors, backgroundColor, formName, customFormData }: Props) => {
  const [success, setSuccess] = useState(false)
  const handleClose = () => setSuccess(false)
  const [loading, setLoading] = useState(false) // New loading state
  async function handleSubmit(event: any) {
    event.preventDefault()
    let formData = new FormData(event.target)

    // Apply custom form data processing if provided
    if (customFormData) {
      formData = customFormData(formData)
    }

    if (errors.includes(true)) {
      event.stopPropagation()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(apiEndpoint, {
        method: 'post',
        body: formData,
      })

      if (!response.ok) {
        console.log('falling over')
        throw new Error(`response status: ${response.status}`)
      }
      const responseData = await response.json()
      console.log(responseData['message'])
      setSuccess(true)
      // alert('Email successfully sent')
    } catch (err) {
      console.error('formerror', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className={`card ${backgroundColor == 'blue' ? 'bg-blue00' : null} border-0 rounded-4 p-md-4`}>
        <form onSubmit={handleSubmit} noValidate>
          {children}
        </form>
      </div>
      {loading && (
        <div className='loader'>
          <Loader center={true} />
        </div>
      )}

      <SuccessModal show={success} handleClose={handleClose} formName={formName} />
    </>
  )
}
