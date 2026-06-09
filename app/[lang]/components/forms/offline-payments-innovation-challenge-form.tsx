'use client'
import { useState } from 'react'
import { TfiArrowCircleDown } from 'react-icons/tfi'
import { FormWrapper } from './form-wrapper'
import { tooltipMessages } from '../../../../utils/data'
import { CiCircleInfo } from 'react-icons/ci'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './forms.css'
import { emailPattern, namePattern, TooltipComp } from '../../../../utils/forms'

interface Props {
  lang: string
}

type ErrorMessages = {
  category: boolean
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
}

export const OfflinePaymentsInnovationChallengeForm: React.FC<Props> = ({ lang }) => {
  const [form, setForm] = useState({
    category: '',
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
  })
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    category: true,
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
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const errorMessage = 'Please provide a valid value.'
  const [proposalOption, setProposalOption] = useState('')
  const [proposalFile, setProposalFile] = useState<File | null>(null)
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
    } else if (['city', 'province', 'isRegistered', 'workedWithKarandaaz'].includes(name)) {
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
      'category',
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
    ]
    return !mandatoryFields.some((field) => errorMessages[field])
  }

  return (
    <FormWrapper
      apiEndpoint='/api/offline-payments-innovation-challenge'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName=''
    >
      <div className='row g-3 p-4 p-md-0' dir='ltr'>
        {/* Category Selection */}
        <div className='col-12'>
          <h5 className='tx-grey90 mb-3'>
            Which category are you interested in? <span className='text-danger'>*</span>
          </h5>
          <div className='form-element'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='category'
                id='categoryA'
                value='Category A'
                checked={form.category === 'Category A'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='categoryA'>
                Category A
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='category'
                id='categoryB'
                value='Category B'
                checked={form.category === 'Category B'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='categoryB'>
                Category B
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='category'
                id='categoryBoth'
                value='Both'
                checked={form.category === 'Both'}
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='categoryBoth'>
                Both
              </label>
            </div>
          </div>
          {isSubmitted && errorMessages.category && <p className='errorState'>{errorMessage}</p>}
        </div>
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
            <div className='mb-3'>
              <input
                id='proposalFile'
                type='file'
                accept='.pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*'
                name={'proposalFile'}
                className={`body2`}
                onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
              />
              {isSubmitted && !proposalFile && <p className='errorState'>Please upload your proposal file.</p>}
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
              }}
            />
            <label className='form-check-label body2 tx-grey90' htmlFor='proposalLater'>
              I will send in my proposal to{' '}
              <a href='mailto:offlinepayments@karandaaz.com.pk'>offlinepayments@karandaaz.com.pk</a> later.
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
          // Prevent submit if proposal option not selected or file not uploaded when required
          if (!proposalOption || (proposalOption === 'now' && !proposalFile)) {
            e.preventDefault()
            return
          }
        }}
        disabled={true}
      >
        Submit Application
        <span className='mx-2'>
          <TfiArrowCircleDown />
        </span>
      </button>
    </FormWrapper>
  )
}
