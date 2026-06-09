'use client'
import { useEffect, useState } from 'react'
import { TfiArrowCircleDown } from 'react-icons/tfi'
import { FormWrapper } from './form-wrapper'
import { tooltipMessages } from '../../../../utils/data'
import { CiCircleInfo } from 'react-icons/ci'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './forms.css'
import { emailPattern, namePattern, TooltipComp } from '../../../../utils/forms'

export const RmofeForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const errorMessage = 'Please provide a valid value.'

  type ErrorMessages = {
    category: boolean
    businessName: boolean
    yearEstablishment: boolean
    website: boolean
    companySize: boolean
    coreWorkingAreas: boolean
    fieldForceSize: boolean
    languages: boolean
    ownerName: boolean
    contact: boolean
    email: boolean
    businessAddress: boolean
    city: boolean
    province: boolean
    isRegistered: boolean
    isStateBankLicensed: boolean
    workedWithKarandaaz: boolean
    merchantRelationships: boolean
    merchantDescription: boolean
    onboardingExperience: boolean
    proposalOption: boolean
  }

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    category: true,
    businessName: true,
    yearEstablishment: true,
    website: false, // Not mandatory
    companySize: true,
    coreWorkingAreas: false, // Not mandatory
    fieldForceSize: true, // Only mandatory for Category A
    languages: true, // Only mandatory for Category A
    ownerName: true,
    contact: true,
    email: true,
    businessAddress: true,
    city: true,
    province: true,
    isRegistered: true,
    isStateBankLicensed: true,
    workedWithKarandaaz: true,
    merchantRelationships: true,
    merchantDescription: true,
    onboardingExperience: true,
    proposalOption: false, // Start as false since it's not selected initially
  })

  const [proposalOption, setProposalOption] = useState('')
  const [proposalFile, setProposalFile] = useState<File | null>(null)
  const [proposalTouched, setProposalTouched] = useState(false)

  // Check if all mandatory fields are filled
  const isMandatoryFieldsFilled = () => {
    const mandatoryFields: (keyof ErrorMessages)[] = [
      'category',
      'businessName',
      'yearEstablishment',
      'companySize',
      'ownerName',
      'contact',
      'email',
      'businessAddress',
      'city',
      'province',
      'isRegistered',
      'isStateBankLicensed',
      'workedWithKarandaaz',
      'merchantRelationships',
      'merchantDescription',
      'onboardingExperience',
    ]

    // Add Category A specific fields if Category A is selected
    if (selectedCategory === 'Category A') {
      mandatoryFields.push('fieldForceSize', 'languages')
    }

    // Check if any mandatory field has an error
    return !mandatoryFields.some((field) => errorMessages[field])
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'ownerName') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' || !namePattern.test(value),
      }))
    }

    if (name === 'email') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' || value.length >= 50 || !emailPattern.test(value),
      }))
    }

    if (name === 'businessName' || name === 'businessAddress') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' || value.length >= 100,
      }))
    }

    if (name === 'coreWorkingAreas') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.length >= 100, // Not mandatory, only check length
      }))
    }

    if (name === 'merchantDescription') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' || value.length >= 200,
      }))
    }

    if (name === 'website') {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() !== '' && !urlPattern.test(value), // Only validate if not empty
      }))
    }

    if (name === 'yearEstablishment') {
      const currentYear = new Date().getFullYear()
      const yearValue = value.trim()
      const isValidYear = /^\d{4}$/.test(yearValue) && parseInt(yearValue) >= 1900 && parseInt(yearValue) <= currentYear
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: yearValue === '' || !isValidYear,
      }))
    }

    if (name === 'fieldForceSize') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: selectedCategory === 'Category A' && (value.trim() === '' || parseInt(value) < 0),
      }))
    }

    if (name === 'languages') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: selectedCategory === 'Category A' && value.trim() === '',
      }))
    }

    if (['companySize', 'city', 'province'].includes(name)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '',
      }))
    }
  }

  const handleRadioChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'category') {
      setSelectedCategory(value)
      // Update Category A specific field errors based on selection
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        fieldForceSize: value === 'Category A' ? true : false,
        languages: value === 'Category A' ? true : false,
      }))
    }

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }))
  }

  const handlePhoneChange = (value: any) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ['contact']: value.trim() === '' || value.length < 6,
    }))
  }

  return (
    <FormWrapper apiEndpoint='/api/rmofe' errors={Object.values(errorMessages)} backgroundColor='blue' formName=''>
      <div className='row g-3 p-4 p-md-0' dir='ltr'>
        {/* Category Selection */}
        <div className='col-12'>
          <h5 className='tx-grey90 mb-3'>
            Which category are you opting? <span className='text-danger'>*</span>
          </h5>
          <div className='form-element'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='category'
                id='categoryA'
                value='Category A'
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='categoryA'>
                Category A
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='category'
                id='categoryB'
                value='Category B'
                onChange={handleRadioChange}
              />
              <label className='form-check-label body2 tx-grey90' htmlFor='categoryB'>
                Category B
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
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Name of the Business <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.businessName ? 'field-error' : ''}`}
                placeholder='Business name'
                name='businessName'
                id='businessName'
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.businessName && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Year of Establishment <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.yearEstablishment ? 'field-error' : ''}`}
                placeholder='e.g., 2020'
                name='yearEstablishment'
                id='yearEstablishment'
                maxLength={4}
                onChange={handleInputChange}
              />
              <TooltipComp title='Enter a 4-digit year between 1900 and current year' id='yearEstablishment'>
                <CiCircleInfo color='grey' />
              </TooltipComp>
            </div>
          </div>
          {isSubmitted && errorMessages.yearEstablishment && (
            <p className='errorState'>Please enter a valid 4-digit year between 1900 and {new Date().getFullYear()}</p>
          )}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Website link</label>
            <div className='form-element'>
              <input
                type='url'
                className={`form-control body2 ${isSubmitted && errorMessages.website ? 'field-error' : ''}`}
                placeholder='https://www.yourwebsite.com'
                name='website'
                id='website'
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.website && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Company size <span className='text-danger'>*</span>
            </label>
            <select
              className={`form-select form-control body2 ${
                isSubmitted && errorMessages.companySize ? 'field-error' : ''
              }`}
              name='companySize'
              id='companySize'
              onChange={handleInputChange}
            >
              <option value=''>Select company size</option>
              <option value='1–10 employees'>1–10 employees</option>
              <option value='11–50 employees'>11–50 employees</option>
              <option value='51–200 employees'>51–200 employees</option>
              <option value='201–500 employees'>201–500 employees</option>
              <option value='501–1,000 employees'>501–1,000 employees</option>
              <option value='1,001–5,000 employees'>1,001–5,000 employees</option>
              <option value='5,001–10,000 employees'>5,001–10,000 employees</option>
              <option value='10,001+ employees'>10,001+ employees</option>
            </select>
          </div>
          {isSubmitted && errorMessages.companySize && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Core Working Areas of the Business</label>
            <div className='form-element'>
              <textarea
                className={`form-control body2 ${isSubmitted && errorMessages.coreWorkingAreas ? 'field-error' : ''}`}
                placeholder='Describe your core working areas...'
                name='coreWorkingAreas'
                id='coreWorkingAreas'
                rows={3}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.coreWorkingAreas && <p className='errorState'>{errorMessage}</p>}
        </div>

        {/* Category A specific fields */}
        {selectedCategory === 'Category A' && (
          <>
            <div className='col-md-6'>
              <div>
                <label className='m-0 body2 tx-grey90 ms-1'>
                  Size of the Field Force (Category A) <span className='text-danger'>*</span>
                </label>
                <input
                  type='number'
                  className={`form-control body2 ${isSubmitted && errorMessages.fieldForceSize ? 'field-error' : ''}`}
                  placeholder='Number of field workers'
                  name='fieldForceSize'
                  id='fieldForceSize'
                  min='0'
                  onChange={handleInputChange}
                />
              </div>
              {isSubmitted && errorMessages.fieldForceSize && <p className='errorState'>{errorMessage}</p>}
            </div>

            <div className='col-md-6'>
              <div>
                <label className='m-0 body2 tx-grey90 ms-1'>
                  Languages Spoken by the Field Workers (Category A) <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className={`form-control body2 ${isSubmitted && errorMessages.languages ? 'field-error' : ''}`}
                  placeholder='e.g., Urdu, English, Punjabi'
                  name='languages'
                  id='languages'
                  onChange={handleInputChange}
                />
              </div>
              {isSubmitted && errorMessages.languages && <p className='errorState'>{errorMessage}</p>}
            </div>
          </>
        )}

        {/* Contact and Location Information Section */}
        <div className='col-12 mt-4'>
          <h5 className='tx-grey90 mb-3'>Contact and Location Information</h5>
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Owner Full Name <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.ownerName ? 'field-error' : ''}`}
                placeholder='Full name'
                name='ownerName'
                id='ownerName'
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.ownerName && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Primary Mobile Number <span className='text-danger'>*</span>
            </label>
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

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Email Address <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <input
                type='email'
                id='email'
                className={`form-control body2 ${isSubmitted && errorMessages.email ? 'field-error' : ''}`}
                placeholder='Email address'
                name='email'
                onChange={handleInputChange}
              />
              <TooltipComp title={tooltipMessages?.email} id='email'>
                <CiCircleInfo color='grey' />
              </TooltipComp>
            </div>
          </div>
          {isSubmitted && errorMessages.email && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Business Address <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <textarea
                className={`form-control body2 ${isSubmitted && errorMessages.businessAddress ? 'field-error' : ''}`}
                placeholder='Complete business address'
                name='businessAddress'
                id='businessAddress'
                rows={2}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.businessAddress && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              City <span className='text-danger'>*</span>
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.city ? 'field-error' : ''}`}
              name='city'
              id='city'
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
          </div>
          {isSubmitted && errorMessages.city && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Province <span className='text-danger'>*</span>
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.province ? 'field-error' : ''}`}
              name='province'
              id='province'
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
          </div>
          {isSubmitted && errorMessages.province && <p className='errorState'>{errorMessage}</p>}
        </div>

        {/* Legal and Registration Details Section */}
        <div className='col-12 mt-4'>
          <h5 className='tx-grey90 mb-3'>Legal and Registration Details</h5>
        </div>

        <div className='col-md-6'>
          <div>
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
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='registeredNo'>
                  No
                </label>
              </div>
            </div>
          </div>
          {isSubmitted && errorMessages.isRegistered && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
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
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='stateBankNo'>
                  No
                </label>
              </div>
            </div>
          </div>
          {isSubmitted && errorMessages.isStateBankLicensed && <p className='errorState'>{errorMessage}</p>}
        </div>

        {/* Market Connectivity Section */}
        <div className='col-12 mt-4'>
          <h5 className='tx-grey90 mb-3'>Market Connectivity</h5>
        </div>

        <div className='col-md-6'>
          <div>
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
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='karandaazNo'>
                  No
                </label>
              </div>
            </div>
          </div>
          {isSubmitted && errorMessages.workedWithKarandaaz && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Do you have existing relationships with the Merchant communities? <span className='text-danger'>*</span>
            </label>
            <div className='form-element mt-2'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='merchantRelationships'
                  id='merchantYes'
                  value='Yes'
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='merchantYes'>
                  Yes
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='merchantRelationships'
                  id='merchantNo'
                  value='No'
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='merchantNo'>
                  No
                </label>
              </div>
            </div>
          </div>
          {isSubmitted && errorMessages.merchantRelationships && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              If yes, please describe. (if no, please write not applicable) <span className='text-danger'>*</span>
            </label>
            <div className='form-element'>
              <textarea
                className={`form-control body2 ${
                  isSubmitted && errorMessages.merchantDescription ? 'field-error' : ''
                }`}
                placeholder='Please describe your merchant relationships or write "not applicable"'
                name='merchantDescription'
                id='merchantDescription'
                rows={3}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.merchantDescription && <p className='errorState'>{errorMessage}</p>}
        </div>

        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>
              Have you previously worked on onboarding merchants or digital financial inclusion programs?{' '}
              <span className='text-danger'>*</span>
            </label>
            <div className='form-element mt-2'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='onboardingExperience'
                  id='onboardingYes'
                  value='Yes'
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='onboardingYes'>
                  Yes
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='onboardingExperience'
                  id='onboardingNo'
                  value='No'
                  onChange={handleRadioChange}
                />
                <label className='form-check-label body2 tx-grey90' htmlFor='onboardingNo'>
                  No
                </label>
              </div>
            </div>
          </div>
          {isSubmitted && errorMessages.onboardingExperience && <p className='errorState'>{errorMessage}</p>}
        </div>

        {/* Proposal Submission Options */}
        <div className='col-12 mt-4'>
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
                setErrorMessages((prev) => ({ ...prev, proposalOption: false }))
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
                setErrorMessages((prev) => ({ ...prev, proposalOption: false }))
              }}
            />
            <label className='form-check-label body2 tx-grey90' htmlFor='proposalLater'>
              I will send in my proposal to <a href='mailto:rmofe@karandaaz.com.pk'>rmofe@karandaaz.com.pk</a> later.
            </label>
          </div>
          {isSubmitted && errorMessages.proposalOption && (
            <p className='errorState'>Please select a proposal submission option.</p>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary mb-3 rounded-pill body2 tx-grey00 mt-4'
          onClick={(e) => {
            setIsSubmitted(true)
            setProposalTouched(true)

            // Set proposal option error if not selected
            if (!proposalOption) {
              setErrorMessages((prev) => ({ ...prev, proposalOption: true }))
              e.preventDefault()
              return
            }

            // Prevent submit if file not uploaded when required
            if (proposalOption === 'now' && !proposalFile) {
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
      </div>
    </FormWrapper>
  )
}
