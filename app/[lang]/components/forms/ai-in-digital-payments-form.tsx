'use client'
import { useState } from 'react'
import { TfiArrowCircleDown } from 'react-icons/tfi'
import Tooltip from 'react-bootstrap/Tooltip'
import { FormWrapper } from './form-wrapper'
import { tooltipMessages } from '../../../../utils/data'
import { CiCircleInfo } from 'react-icons/ci'
import PhoneInput from 'react-phone-input-2'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import 'react-phone-input-2/lib/style.css'
import './forms.css'
import { emailPattern, namePattern, TooltipComp } from '../../../../utils/forms'

interface Props {
  lang: string
}

type ErrorMessages = {
  businessName: boolean
  yearOfEstablishment: boolean
  website: boolean
  coreWorkingArea: boolean
  ownerName: boolean
  primaryMobile: boolean
  primaryEmail: boolean
  businessAddress: boolean
  city: boolean
  province: boolean
  isRegistered: boolean
  isStateBankLicensed: boolean
  workedWithKarandaaz: boolean
  hasDfiExperience: boolean
}

export const AiInDigitalPaymentsForm: React.FC<Props> = ({ lang }) => {
  const [form, setForm] = useState({
    businessName: '',
    yearOfEstablishment: '',
    website: '',
    coreWorkingArea: '',
    ownerName: '',
    primaryMobile: '',
    primaryEmail: '',
    businessAddress: '',
    city: '',
    province: '',
    isRegistered: '',
    isStateBankLicensed: '',
    workedWithKarandaaz: '',
    hasDfiExperience: '',
  })
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    businessName: true,
    yearOfEstablishment: true,
    website: false,
    coreWorkingArea: true,
    ownerName: true,
    primaryMobile: true,
    primaryEmail: true,
    businessAddress: false,
    city: true,
    province: true,
    isRegistered: true,
    isStateBankLicensed: true,
    workedWithKarandaaz: true,
    hasDfiExperience: true,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const errorMessage = 'Please provide a valid value.'
  const [proposalOption, setProposalOption] = useState('')
  const [proposalFiles, setProposalFiles] = useState<File[]>([])
  const [proposalTouched, setProposalTouched] = useState(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === 'ownerName') {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' || !namePattern.test(value) }))
    } else if (name === 'primaryEmail') {
      setErrorMessages((prev) => ({
        ...prev,
        [name]: value.trim() === '' || value.length >= 50 || !emailPattern.test(value),
      }))
    } else if (name === 'businessName' || name === 'businessAddress') {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' || value.length >= 100 }))
    } else if (name === 'coreWorkingArea') {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' || value.length >= 100 }))
    } else if (name === 'website') {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() !== '' && !urlPattern.test(value) }))
    } else if (name === 'yearOfEstablishment') {
      const currentYear = new Date().getFullYear()
      const yearValue = value.trim()
      const isValidYear = /^\d{4}$/.test(yearValue) && parseInt(yearValue) >= 1900 && parseInt(yearValue) <= currentYear
      setErrorMessages((prev) => ({ ...prev, [name]: yearValue === '' || !isValidYear }))
    } else if (['city', 'province', 'isRegistered', 'workedWithKarandaaz', 'hasDfiExperience'].includes(name)) {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' }))
    } else if (name === 'primaryMobile') {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' || value.length < 6 }))
    } else if (name === 'isStateBankLicensed') {
      setErrorMessages((prev) => ({ ...prev, [name]: false }))
    } else {
      setErrorMessages((prev) => ({ ...prev, [name]: value.trim() === '' }))
    }
    setForm({ ...form, [name]: value })
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrorMessages((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() === '' }))
  }

  const isMandatoryFieldsFilled = () => {
    const mandatoryFields: (keyof ErrorMessages)[] = [
      'businessName',
      'yearOfEstablishment',
      'coreWorkingArea',
      'ownerName',
      'primaryMobile',
      'primaryEmail',
      'city',
      'province',
      'isRegistered',
      'isStateBankLicensed',
      'workedWithKarandaaz',
      'hasDfiExperience',
    ]
    return !mandatoryFields.some((field) => errorMessages[field])
  }

  return (
    <FormWrapper
      apiEndpoint='/api/ai-in-digital-payments'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName=''
      customFormData={(formData: FormData) => {
        console.log('=== DEBUG: FormData before adding files ===')
        Array.from(formData.entries()).forEach(([key, value]) => {
          console.log(`${key}:`, value)
        })

        console.log('=== DEBUG: Adding files to FormData ===')
        console.log('proposalFiles array:', proposalFiles)
        console.log('proposalFiles count:', proposalFiles.length)

        // Clear any existing proposalFiles entries first
        formData.delete('proposalFiles')

        // Add our proposal files to the FormData
        proposalFiles.forEach((file, index) => {
          console.log(`Adding file ${index + 1}:`, {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          })
          formData.append('proposalFiles', file, file.name)
        })

        // Add proposal option
        formData.append('proposalOption', proposalOption)

        console.log('=== DEBUG: Final FormData entries ===')
        Array.from(formData.entries()).forEach(([key, value]) => {
          if (key === 'proposalFiles') {
            console.log(`${key}:`, {
              name: (value as File).name,
              size: (value as File).size,
              type: (value as File).type,
            })
          } else {
            console.log(`${key}:`, value)
          }
        })

        return formData
      }}
    >
      <div className='row g-3 p-4 p-md-0' dir='ltr'>
        {/* Business Information Section */}
        <div className='col-12 mt-4'>
          <h5 className='tx-grey90 mb-3'>Business Information</h5>
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Name of business <span className='text-danger'>*</span>
          </label>
          <input
            name='businessName'
            value={form.businessName}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.businessName ? 'field-error' : ''}`}
            placeholder='Business name'
            id='businessName'
          />
          {isSubmitted && errorMessages.businessName && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Year of establishment <span className='text-danger'>*</span>
          </label>
          <input
            name='yearOfEstablishment'
            value={form.yearOfEstablishment}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.yearOfEstablishment ? 'field-error' : ''}`}
            placeholder='e.g., 2020'
            id='yearOfEstablishment'
            maxLength={4}
          />
          {isSubmitted && errorMessages.yearOfEstablishment && (
            <p className='errorState'>Please enter a valid 4-digit year between 1900 and {new Date().getFullYear()}</p>
          )}
        </div>
        <div className='col-12'>
          <label className='m-0 body2 tx-grey90 ms-1'>Website link</label>
          <input
            name='website'
            value={form.website}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.website ? 'field-error' : ''}`}
            placeholder='https://www.yourwebsite.com'
            id='website'
          />
          {isSubmitted && errorMessages.website && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Core working area <span className='text-danger'>*</span>
          </label>
          <input
            name='coreWorkingArea'
            value={form.coreWorkingArea}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.coreWorkingArea ? 'field-error' : ''}`}
            placeholder='Describe your core working area'
            id='coreWorkingArea'
          />
          {isSubmitted && errorMessages.coreWorkingArea && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Owner's name <span className='text-danger'>*</span>
          </label>
          <input
            name='ownerName'
            value={form.ownerName}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.ownerName ? 'field-error' : ''}`}
            placeholder='Owner name'
            id='ownerName'
          />
          {isSubmitted && errorMessages.ownerName && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Primary Mobile Number <span className='text-danger'>*</span>
          </label>
          <PhoneInput
            country={'pk'}
            value={form.primaryMobile}
            onChange={(value) => {
              setForm((f) => ({ ...f, primaryMobile: value }))
              setErrorMessages((prev) => ({
                ...prev,
                primaryMobile: value.trim() === '' || value.length < 6,
              }))
            }}
            inputProps={{
              id: 'primaryMobile',
              name: 'primaryMobile',
              className: `form-control contacttype body2 ${
                isSubmitted && errorMessages.primaryMobile ? 'field-error' : ''
              }`,
            }}
          />
          {isSubmitted && errorMessages.primaryMobile && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Primary email address <span className='text-danger'>*</span>
          </label>
          <div className='form-element'>
            <input
              name='primaryEmail'
              value={form.primaryEmail}
              onChange={handleInputChange}
              className={`form-control body2 ${isSubmitted && errorMessages.primaryEmail ? 'field-error' : ''}`}
              placeholder='Email address'
              id='primaryEmail'
              type='email'
            />
            <TooltipComp title={tooltipMessages?.email} id='primaryEmail'>
              <CiCircleInfo color='grey' />
            </TooltipComp>
          </div>
          {isSubmitted && errorMessages.primaryEmail && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <label className='m-0 body2 tx-grey90 ms-1'>Business Address</label>
          <textarea
            name='businessAddress'
            value={form.businessAddress}
            onChange={handleInputChange}
            className={`form-control body2 ${isSubmitted && errorMessages.businessAddress ? 'field-error' : ''}`}
            placeholder='Business address'
            id='businessAddress'
            rows={2}
          />
          {isSubmitted && errorMessages.businessAddress && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            City <span className='text-danger'>*</span>
          </label>
          <select
            className={`form-select form-control body2 ${isSubmitted && errorMessages.city ? 'field-error' : ''}`}
            name='city'
            id='city'
            value={form.city}
            onChange={handleInputChange}
          >
            <option value=''>Select City</option>
            <option value='Karachi'>Karachi</option>
            <option value='Lahore'>Lahore</option>
            <option value='Islamabad'>Islamabad</option>
            <option value='Rawalpindi'>Rawalpindi</option>
            <option value='Faisalabad'>Faisalabad</option>
            <option value='Multan'>Multan</option>
            <option value='Peshawar'>Peshawar</option>
            <option value='Quetta'>Quetta</option>
            <option value='Other'>Other</option>
          </select>
          {isSubmitted && errorMessages.city && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Province <span className='text-danger'>*</span>
          </label>
          <select
            className={`form-select form-control body2 ${isSubmitted && errorMessages.province ? 'field-error' : ''}`}
            name='province'
            id='province'
            value={form.province}
            onChange={handleInputChange}
          >
            <option value=''>Select Province</option>
            <option value='Punjab'>Punjab</option>
            <option value='Sindh'>Sindh</option>
            <option value='Khyber Pakhtunkhwa'>Khyber Pakhtunkhwa</option>
            <option value='Balochistan'>Balochistan</option>
            <option value='Gilgit-Baltistan'>Gilgit-Baltistan</option>
            <option value='Azad Kashmir'>Azad Kashmir</option>
          </select>
          {isSubmitted && errorMessages.province && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Is your Business Registered? <span className='text-danger'>*</span>
          </label>
          <div className='form-element mt-2'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='isRegistered'
                id='registeredYes'
                value='Yes'
                checked={form.isRegistered === 'Yes'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='registeredYes'>
                Yes
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='isRegistered'
                id='registeredNo'
                value='No'
                checked={form.isRegistered === 'No'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='registeredNo'>
                No
              </label>
            </div>
          </div>
          {isSubmitted && errorMessages.isRegistered && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Is your business a State Bank-licensed financial institution? <span className='text-danger'>*</span>
          </label>
          <div className='form-element mt-2'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='isStateBankLicensed'
                id='stateBankYes'
                value='Yes'
                checked={form.isStateBankLicensed === 'Yes'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='stateBankYes'>
                Yes
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='isStateBankLicensed'
                id='stateBankNo'
                value='No'
                checked={form.isStateBankLicensed === 'No'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='stateBankNo'>
                No
              </label>
            </div>
          </div>
          {isSubmitted && errorMessages.isStateBankLicensed && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Have you previously worked with Karandaaz? <span className='text-danger'>*</span>
          </label>
          <div className='form-element mt-2'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='workedWithKarandaaz'
                id='karandaazYes'
                value='Yes'
                checked={form.workedWithKarandaaz === 'Yes'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='karandaazYes'>
                Yes
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='workedWithKarandaaz'
                id='karandaazNo'
                value='No'
                checked={form.workedWithKarandaaz === 'No'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='karandaazNo'>
                No
              </label>
            </div>
          </div>
          {isSubmitted && errorMessages.workedWithKarandaaz && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <label className='m-0 body2 tx-grey90 ms-1'>
            Have you previously worked on digital financial inclusion programs? <span className='text-danger'>*</span>
          </label>
          <div className='form-element mt-2'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='hasDfiExperience'
                id='hasDfiExperienceYes'
                value='Yes'
                checked={form.hasDfiExperience === 'Yes'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='hasDfiExperienceYes'>
                Yes
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='hasDfiExperience'
                id='hasDfiExperienceNo'
                value='No'
                checked={form.hasDfiExperience === 'No'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='hasDfiExperienceNo'>
                No
              </label>
            </div>
          </div>
          {isSubmitted && errorMessages.hasDfiExperience && <p className='errorState'>{errorMessage}</p>}
        </div>
        {/* Proposal Submission Options */}
        <div className='mt-4'>
          <h5 className='tx-grey90 mb-3'>
            Proposal Submission <span className='text-danger'>*</span>
          </h5>
          <div className='form-check mb-2'>
            <input
              className='form-check-input'
              type='radio'
              name='proposalOption'
              id='proposalNow'
              value='now'
              checked={proposalOption === 'now'}
              onChange={() => {
                setProposalOption('now')
                setProposalTouched(true)
              }}
            />
            <label className='form-check-label body2 tx-grey90' htmlFor='proposalNow'>
              I want to submit my proposal right now.
            </label>
          </div>
          {proposalOption === 'now' && (
            <div className='my-3'>
              <div className='d-flex flex-column flex-md-row align-md-items-center gap-4'>
                <div className='d-flex flex-row align-items-center'>
                  <p className='subtitle-style-1'>Upload files (maximum 2 files, up to 7MB each):</p>
                  <OverlayTrigger overlay={<Tooltip id='resume'>{tooltipMessages.fileUpload}</Tooltip>}>
                    <div className='mx-1'>
                      <CiCircleInfo color='grey' />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className='d-flex align-items-center gap-2'>
                  <label htmlFor='proposalFiles' className='btn btn-outline-primary btn-sm rounded-full'>
                    Choose Files
                  </label>
                  <input
                    id='proposalFiles'
                    type='file'
                    multiple
                    accept='.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,*/*'
                    name={'proposalFiles'}
                    className='d-none'
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])

                      // Instead of appending, let's replace if this is a fresh selection
                      // or append only if we have space
                      if (proposalFiles.length === 0) {
                        // No existing files, use the new selection (up to 2 files)
                        setProposalFiles(files.slice(0, 2))
                      } else {
                        // Append new files to existing ones, but respect the 2-file limit
                        const combinedFiles = [...proposalFiles, ...files]
                        setProposalFiles(combinedFiles.slice(0, 2))
                      }

                      // Clear the input so the same file can be selected again if needed
                      e.target.value = ''
                    }}
                  />
                </div>
              </div>

              {proposalFiles.length > 0 && (
                <div className='d-flex flex-column flex-md-row gap-2 mt-3'>
                  {proposalFiles.map((file, index) => (
                    <div key={index} className='d-inline-flex align-items-center bg-light px-3 rounded gap-3'>
                      <span className='tx-small tx-grey70'>{file.name}</span>
                      <button
                        type='button'
                        className='btn p-0 outline-none'
                        onClick={() => {
                          const updatedFiles = proposalFiles.filter((_, i) => i !== index)
                          setProposalFiles(updatedFiles)
                        }}
                        title='Remove file'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {isSubmitted && proposalFiles.length === 0 && (
                <p className='errorState'>Please upload at least one file (max 2 files).</p>
              )}
              {isSubmitted && proposalFiles.length > 2 && (
                <p className='errorState'>You can upload a maximum of 2 files.</p>
              )}
            </div>
          )}
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='proposalOption'
              id='proposalLater'
              value='later'
              checked={proposalOption === 'later'}
              onChange={() => {
                setProposalOption('later')
                setProposalTouched(true)
                setProposalFiles([])
              }}
            />
            <label className='form-check-label body2 tx-grey90' htmlFor='proposalLater'>
              I will send in my proposal to{' '}
              <a href='mailto:programofficedfs@karandaaz.com.pk'>programofficedfs@karandaaz.com.pk</a> later.
            </label>
          </div>
          {isSubmitted && !proposalOption && <p className='errorState'>Please select a proposal submission option.</p>}
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary mb-3 rounded-pill body2 tx-grey00 w-100 mt-4'
        onClick={(e) => {
          setIsSubmitted(true)
          setProposalTouched(true)
          // Prevent submit if required fields invalid
          const proposalInvalid =
            !proposalOption || (proposalOption === 'now' && (proposalFiles.length < 1 || proposalFiles.length > 2))
          if (!isMandatoryFieldsFilled() || proposalInvalid) {
            e.preventDefault()
            return
          }
        }}
      >
        Submit Application
        <span className='mx-2'>
          <TfiArrowCircleDown />
        </span>
      </button>
    </FormWrapper>
  )
}
