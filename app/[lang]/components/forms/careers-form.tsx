'use client'
import { tooltipMessages } from '../../../../utils/data'
import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { CiCircleInfo } from 'react-icons/ci'
import { FormWrapper } from './form-wrapper'
import 'react-phone-input-2/lib/style.css'
import './forms.css'
import {
  emailPattern,
  errorMessage,
  fileErrorMessage,
  namePattern,
  payPattern,
  phonePattern,
  TooltipComp,
} from '../../../../utils/forms'
import PhoneInput from 'react-phone-input-2'
import { event } from '../../../../lib/gtag'

interface CareersFormProps {
  position: string
}

export const CareersForm = ({ position }: CareersFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isReferred, setIsReferred] = useState('')
  const [errorMessages, setErrorMessages] = useState({
    firstName: true,
    lastName: true,
    gender: true,
    contact: true,
    email: true,
    city: true,
    country: true,
    education: true,
    accreditation: true,
    experience: true,
    currentDesignation: true,
    currentOrganization: true,
    availableDate: true,
    desiredPay: true,
    linkedinProfile: true,
    isReferred: true,
    referredBy: false,
    currentSalary: true,
    resume: true,
  })
  // If any of the fields do not follow validation rules, set error as true
  const handleInputChange = (e: any) => {
    const { id, value } = e.target
    let isReferredValue = isReferred
    let isReferredBy = ''
    if (id === 'firstName' || id === 'lastName') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: !namePattern.test(value),
      }))
    }
    if (id === 'gender') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }
    if (id === 'email') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.length <= 1 || value.length > 254 || !emailPattern.test(value),
      }))
    }
    if (id === 'resume') {
      const file = e.target.files[0]
      const fileSizeLimit = 10 * 1024 * 1024
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: file?.size > fileSizeLimit,
      }))
    }
    if (id === 'city') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }
    if (id === 'accreditation') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }

    if (id === 'experience') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }

    if (id === 'currentDesignation' || id === 'currentOrganization') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }

    if (id === 'company' || id === 'country' || id === 'linkedinProfile' || id === 'education') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
    }
    if (id === 'desiredPay' || id === 'currentSalary') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: !payPattern.test(value),
      }))
    }
    if (id === 'availableDate') {
      const selectedDate = new Date(value)
      const today = new Date()

      // Clear time component for accurate date comparison
      today.setHours(0, 0, 0, 0)

      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: selectedDate <= today, // Error if selected date is today or in the past
      }))
    }
    if (id === 'isReferred') {
      isReferredValue = value
      setIsReferred(value)
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
      }))
      if (isReferredValue === 'Yes' && isReferredBy === '') {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          referredBy: true,
        }))
      } else {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          referredBy: false,
        }))
      }
    }
    if (id === 'referredBy') {
      isReferredBy = value
      if (isReferredValue === 'Yes') {
        // setReferredBy(value)
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [id]: !namePattern.test(value) || value.length >= 40,
        }))
      } else {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [id]: false,
        }))
      }
    }
  }
  const handlePhoneChange = (value: any) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ['contact']: value.trim() === '' || value.length < 6,
    }))
  }

  const handleButtonClick = () => {
    event({
      action: 'submit_job_application',
      category: 'Apply Button click',
      label: 'Apply Button click',
      value: 1,
    })
  }

  return (
    <FormWrapper
      apiEndpoint='/api/careers'
      errors={Object.values(errorMessages)}
      backgroundColor='none'
      formName='careers'
    >
      {/* SECTION 1 */}
      {/* First Name */}
      <div className='border-0 rounded-4 career-form' dir='ltr'>
        <div className='row g-3'>
          <p className='subtitle-style-1'>Personal details</p>
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>First Name</label>
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
          {/* Last Name */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Last Name</label>
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
              <label htmlFor='gender' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                Gender
              </label>

              <select
                className={`form-select form-control body2 ${isSubmitted && errorMessages.gender ? 'field-error' : ''}`}
                name='gender'
                id='gender'
                onChange={handleInputChange}
              >
                <option selected value=''>
                  Select Gender
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            {isSubmitted && errorMessages.gender && <p className='errorState'>Please select a gender.</p>}
          </div>
          {/* Contact */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Mobile number</label>
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
          {/* Email */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Email address</label>
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
          {/* City */}
          <div className='col-md-6'>
            <div>
              <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                Current City
              </label>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.city ? 'field-error' : ''}`}
                name='city'
                id='city'
                placeholder={'Write City'}
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.city && <p className='errorState'>{errorMessage}</p>}
          </div>
          {/* Country */}
          <div className='col-md-6'>
            <div>
              <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                Current Country
              </label>
              <select
                className={`form-select form-control body2 ${
                  isSubmitted && errorMessages.country ? 'field-error' : ''
                }`}
                name={'country'}
                id='country'
                onChange={handleInputChange}
              >
                <option selected disabled value=''>
                  Select Country
                </option>
                <option value='Afghanistan'>Afghanistan</option>
                <option value='Åland Islands'>Åland Islands</option>
                <option value='Albania'>Albania</option>
                <option value='Algeria'>Algeria</option>
                <option value='American Samoa'>American Samoa</option>
                <option value='Andorra'>Andorra</option>
                <option value='Angola'>Angola</option>
                <option value='Anguilla'>Anguilla</option>
                <option value='Antarctica'>Antarctica</option>
                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                <option value='Argentina'>Argentina</option>
                <option value='Armenia'>Armenia</option>
                <option value='Aruba'>Aruba</option>
                <option value='Australia'>Australia</option>
                <option value='Austria'>Austria</option>
                <option value='Azerbaijan'>Azerbaijan</option>
                <option value='Bahamas'>Bahamas</option>
                <option value='Bahrain'>Bahrain</option>
                <option value='Bangladesh'>Bangladesh</option>
                <option value='Barbados'>Barbados</option>
                <option value='Belarus'>Belarus</option>
                <option value='Belgium'>Belgium</option>
                <option value='Belize'>Belize</option>
                <option value='Benin'>Benin</option>
                <option value='Bermuda'>Bermuda</option>
                <option value='Bhutan'>Bhutan</option>
                <option value='Bolivia'>Bolivia</option>
                <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                <option value='Botswana'>Botswana</option>
                <option value='Bouvet Island'>Bouvet Island</option>
                <option value='Brazil'>Brazil</option>
                <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                <option value='Brunei Darussalam'>Brunei Darussalam</option>
                <option value='Bulgaria'>Bulgaria</option>
                <option value='Burkina Faso'>Burkina Faso</option>
                <option value='Burundi'>Burundi</option>
                <option value='Cambodia'>Cambodia</option>
                <option value='Cameroon'>Cameroon</option>
                <option value='Canada'>Canada</option>
                <option value='Cape Verde'>Cape Verde</option>
                <option value='Cayman Islands'>Cayman Islands</option>
                <option value='Central African Republic'>Central African Republic</option>
                <option value='Chad'>Chad</option>
                <option value='Chile'>Chile</option>
                <option value='China'>China</option>
                <option value='Christmas Island'>Christmas Island</option>
                <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
                <option value='Colombia'>Colombia</option>
                <option value='Comoros'>Comoros</option>
                <option value='Congo'>Congo</option>
                <option value='Congo, The Democratic Republic of The'>Congo, The Democratic Republic of The</option>
                <option value='Cook Islands'>Cook Islands</option>
                <option value='Costa Rica'>Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value='Croatia'>Croatia</option>
                <option value='Cuba'>Cuba</option>
                <option value='Cyprus'>Cyprus</option>
                <option value='Czech Republic'>Czech Republic</option>
                <option value='Denmark'>Denmark</option>
                <option value='Djibouti'>Djibouti</option>
                <option value='Dominica'>Dominica</option>
                <option value='Dominican Republic'>Dominican Republic</option>
                <option value='Ecuador'>Ecuador</option>
                <option value='Egypt'>Egypt</option>
                <option value='El Salvador'>El Salvador</option>
                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                <option value='Eritrea'>Eritrea</option>
                <option value='Estonia'>Estonia</option>
                <option value='Ethiopia'>Ethiopia</option>
                <option value='Falkland Islands (Malvinas)'>Falkland Islands (Malvinas)</option>
                <option value='Faroe Islands'>Faroe Islands</option>
                <option value='Fiji'>Fiji</option>
                <option value='Finland'>Finland</option>
                <option value='France'>France</option>
                <option value='French Guiana'>French Guiana</option>
                <option value='French Polynesia'>French Polynesia</option>
                <option value='French Southern Territories'>French Southern Territories</option>
                <option value='Gabon'>Gabon</option>
                <option value='Gambia'>Gambia</option>
                <option value='Georgia'>Georgia</option>
                <option value='Germany'>Germany</option>
                <option value='Ghana'>Ghana</option>
                <option value='Gibraltar'>Gibraltar</option>
                <option value='Greece'>Greece</option>
                <option value='Greenland'>Greenland</option>
                <option value='Grenada'>Grenada</option>
                <option value='Guadeloupe'>Guadeloupe</option>
                <option value='Guam'>Guam</option>
                <option value='Guatemala'>Guatemala</option>
                <option value='Guernsey'>Guernsey</option>
                <option value='Guinea'>Guinea</option>
                <option value='Guinea-bissau'>Guinea-bissau</option>
                <option value='Guyana'>Guyana</option>
                <option value='Haiti'>Haiti</option>
                <option value='Heard Island and Mcdonald Islands'>Heard Island and Mcdonald Islands</option>
                <option value='Holy See (Vatican City State)'>Holy See (Vatican City State)</option>
                <option value='Honduras'>Honduras</option>
                <option value='Hong Kong'>Hong Kong</option>
                <option value='Hungary'>Hungary</option>
                <option value='Iceland'>Iceland</option>
                <option value='India'>India</option>
                <option value='Indonesia'>Indonesia</option>
                <option value='Iran, Islamic Republic of'>Iran, Islamic Republic of</option>
                <option value='Iraq'>Iraq</option>
                <option value='Ireland'>Ireland</option>
                <option value='Isle of Man'>Isle of Man</option>
                <option value='Israel'>Israel</option>
                <option value='Italy'>Italy</option>
                <option value='Jamaica'>Jamaica</option>
                <option value='Japan'>Japan</option>
                <option value='Jersey'>Jersey</option>
                <option value='Jordan'>Jordan</option>
                <option value='Kazakhstan'>Kazakhstan</option>
                <option value='Kenya'>Kenya</option>
                <option value='Kiribati'>Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value='Korea, Republic of'>Korea, Republic of</option>
                <option value='Kuwait'>Kuwait</option>
                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value='Latvia'>Latvia</option>
                <option value='Lebanon'>Lebanon</option>
                <option value='Lesotho'>Lesotho</option>
                <option value='Liberia'>Liberia</option>
                <option value='Libyan Arab Jamahiriya'>Libyan Arab Jamahiriya</option>
                <option value='Liechtenstein'>Liechtenstein</option>
                <option value='Lithuania'>Lithuania</option>
                <option value='Luxembourg'>Luxembourg</option>
                <option value='Macao'>Macao</option>
                <option value='Macedonia, The Former Yugoslav Republic of'>
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value='Madagascar'>Madagascar</option>
                <option value='Malawi'>Malawi</option>
                <option value='Malaysia'>Malaysia</option>
                <option value='Maldives'>Maldives</option>
                <option value='Mali'>Mali</option>
                <option value='Malta'>Malta</option>
                <option value='Marshall Islands'>Marshall Islands</option>
                <option value='Martinique'>Martinique</option>
                <option value='Mauritania'>Mauritania</option>
                <option value='Mauritius'>Mauritius</option>
                <option value='Mayotte'>Mayotte</option>
                <option value='Mexico'>Mexico</option>
                <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option>
                <option value='Moldova, Republic of'>Moldova, Republic of</option>
                <option value='Monaco'>Monaco</option>
                <option value='Mongolia'>Mongolia</option>
                <option value='Montenegro'>Montenegro</option>
                <option value='Montserrat'>Montserrat</option>
                <option value='Morocco'>Morocco</option>
                <option value='Mozambique'>Mozambique</option>
                <option value='Myanmar'>Myanmar</option>
                <option value='Namibia'>Namibia</option>
                <option value='Nauru'>Nauru</option>
                <option value='Nepal'>Nepal</option>
                <option value='Netherlands'>Netherlands</option>
                <option value='Netherlands Antilles'>Netherlands Antilles</option>
                <option value='New Caledonia'>New Caledonia</option>
                <option value='New Zealand'>New Zealand</option>
                <option value='Nicaragua'>Nicaragua</option>
                <option value='Niger'>Niger</option>
                <option value='Nigeria'>Nigeria</option>
                <option value='Niue'>Niue</option>
                <option value='Norfolk Island'>Norfolk Island</option>
                <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                <option value='Norway'>Norway</option>
                <option value='Oman'>Oman</option>
                <option value='Pakistan'>Pakistan</option>
                <option value='Palau'>Palau</option>
                <option value='Palestinian Territory, Occupied'>Palestinian Territory, Occupied</option>
                <option value='Panama'>Panama</option>
                <option value='Papua New Guinea'>Papua New Guinea</option>
                <option value='Paraguay'>Paraguay</option>
                <option value='Peru'>Peru</option>
                <option value='Philippines'>Philippines</option>
                <option value='Pitcairn'>Pitcairn</option>
                <option value='Poland'>Poland</option>
                <option value='Portugal'>Portugal</option>
                <option value='Puerto Rico'>Puerto Rico</option>
                <option value='Qatar'>Qatar</option>
                <option value='Reunion'>Reunion</option>
                <option value='Romania'>Romania</option>
                <option value='Russian Federation'>Russian Federation</option>
                <option value='Rwanda'>Rwanda</option>
                <option value='Saint Helena'>Saint Helena</option>
                <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                <option value='Saint Lucia'>Saint Lucia</option>
                <option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option>
                <option value='Saint Vincent and The Grenadines'>Saint Vincent and The Grenadines</option>
                <option value='Samoa'>Samoa</option>
                <option value='San Marino'>San Marino</option>
                <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                <option value='Saudi Arabia'>Saudi Arabia</option>
                <option value='Senegal'>Senegal</option>
                <option value='Serbia'>Serbia</option>
                <option value='Seychelles'>Seychelles</option>
                <option value='Sierra Leone'>Sierra Leone</option>
                <option value='Singapore'>Singapore</option>
                <option value='Slovakia'>Slovakia</option>
                <option value='Slovenia'>Slovenia</option>
                <option value='Solomon Islands'>Solomon Islands</option>
                <option value='Somalia'>Somalia</option>
                <option value='South Africa'>South Africa</option>
                <option value='South Georgia and The South Sandwich Islands'>
                  South Georgia and The South Sandwich Islands
                </option>
                <option value='Spain'>Spain</option>
                <option value='Sri Lanka'>Sri Lanka</option>
                <option value='Sudan'>Sudan</option>
                <option value='Suriname'>Suriname</option>
                <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                <option value='Swaziland'>Swaziland</option>
                <option value='Sweden'>Sweden</option>
                <option value='Switzerland'>Switzerland</option>
                <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                <option value='Taiwan'>Taiwan</option>
                <option value='Tajikistan'>Tajikistan</option>
                <option value='Tanzania, United Republic of'>Tanzania, United Republic of</option>
                <option value='Thailand'>Thailand</option>
                <option value='Timor-leste'>Timor-leste</option>
                <option value='Togo'>Togo</option>
                <option value='Tokelau'>Tokelau</option>
                <option value='Tonga'>Tonga</option>
                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                <option value='Tunisia'>Tunisia</option>
                <option value='Turkey'>Turkey</option>
                <option value='Turkmenistan'>Turkmenistan</option>
                <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                <option value='Tuvalu'>Tuvalu</option>
                <option value='Uganda'>Uganda</option>
                <option value='Ukraine'>Ukraine</option>
                <option value='United Arab Emirates'>United Arab Emirates</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='United States'>United States</option>
                <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option>
                <option value='Uruguay'>Uruguay</option>
                <option value='Uzbekistan'>Uzbekistan</option>
                <option value='Vanuatu'>Vanuatu</option>
                <option value='Venezuela'>Venezuela</option>
                <option value='Viet Nam'>Viet Nam</option>
                <option value='Virgin Islands, British'>Virgin Islands, British</option>
                <option value='Virgin Islands, U.S.'>Virgin Islands, U.S.</option>
                <option value='Wallis and Futuna'>Wallis and Futuna</option>
                <option value='Western Sahara'>Western Sahara</option>
                <option value='Yemen'>Yemen</option>
                <option value='Zambia'>Zambia</option>
                <option value='Zimbabwe'>Zimbabwe</option>
              </select>
            </div>
            {isSubmitted && errorMessages.country && <p className='errorState'>{errorMessage}</p>}
          </div>
          {/* SECTION 2 */}
          {/* Resume */}
          <hr className='br-grey30'></hr>
          <p className='subtitle-style-1'>Professional details</p>
          <div className='col-md-6'>
            <div>
              <label htmlFor='education' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                Highest Educational Qualification
              </label>
              <select
                className={`form-select form-control body2 ${
                  isSubmitted && errorMessages.education ? 'field-error' : ''
                }`}
                name='education'
                id='education'
                onChange={handleInputChange}
              >
                <option selected value=''>
                  Select Degree
                </option>
                <option value='A Level/Matriculation'>A Level/Matriculation</option>
                <option value='Undergraduate Degree'>Undergraduate Degree</option>
                <option value='Masters Degree'>Masters Degree</option>
                <option value='PhD'>PhD</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            {isSubmitted && errorMessages.education && (
              <p className='errorState'>Please select your highest educational qualification.</p>
            )}
          </div>
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Latest Professional Accreditation</label>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.accreditation ? 'field-error' : ''}`}
                placeholder={'Write Accreditation '}
                aria-label='accreditation'
                name='accreditation'
                id='accreditation'
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.accreditation && (
              <p className='errorState'>Please enter your latest professional accreditation.</p>
            )}
          </div>
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Total Experience in Years</label>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.experience ? 'field-error' : ''}`}
                placeholder={'3 Years'}
                aria-label='experience'
                name='experience'
                id='experience'
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.experience && (
              <p className='errorState'>Please enter your total experience in years.</p>
            )}
          </div>
          {/* Current Designation */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Current Designation</label>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.currentDesignation ? 'field-error' : ''}`}
                placeholder={'e.g. Senior Manager'}
                aria-label='currentDesignation'
                name='currentDesignation'
                id='currentDesignation'
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.currentDesignation && (
              <p className='errorState'>Please enter your current designation.</p>
            )}
          </div>
          {/* Current Organization */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Current Organization</label>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.currentOrganization ? 'field-error' : ''}`}
                placeholder={'e.g. Acme Corp'}
                aria-label='currentOrganization'
                name='currentOrganization'
                id='currentOrganization'
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.currentOrganization && (
              <p className='errorState'>Please enter your current organization.</p>
            )}
          </div>
          {/* LinkedIn */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Linkedin Profile</label>
              <input
                type='url'
                id='linkedinProfile'
                className={`form-control body2 ${isSubmitted && errorMessages.linkedinProfile ? 'field-error' : ''}`}
                placeholder={'linkedin.com/example'}
                aria-label='linkedinProfile'
                name={'linkedinProfile'}
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.linkedinProfile && <p className='errorState'>{errorMessage}</p>}
          </div>
          <hr className='br-grey30'></hr>
          <p className='subtitle-style-1'>Employment details</p>
          {/* Date */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Availability to Join</label>
              <input
                type='date'
                id='availableDate'
                placeholder={'Select Date'}
                aria-label='Select Date'
                name='availableDate'
                // min='2024-01-01'
                // max='2024-12-31'
                onChange={handleInputChange}
                className={`form-control body2 ${isSubmitted && errorMessages.availableDate ? 'field-error' : ''}`}
              />
              {isSubmitted && errorMessages.availableDate && <p className='errorState'>{errorMessage}</p>}
            </div>
          </div>
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Existing Gross Salary</label>
              <div className='input-group'>
                <span className='input-group-text' id='basic-addon1'>
                  PKR
                </span>
                <input
                  type='text'
                  className={`form-control body2 ${isSubmitted && errorMessages.currentSalary ? 'field-error' : ''}`}
                  placeholder='0'
                  aria-label='0'
                  name='currentSalary'
                  id='currentSalary'
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {isSubmitted && errorMessages.currentSalary && <p className='errorState'>{errorMessage}</p>}
          </div>
          {/* Pay */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Minimum Expected Gross Salary</label>
              <div className='input-group'>
                <span className='input-group-text' id='basic-addon1'>
                  PKR
                </span>
                <input
                  type='text'
                  id='desiredPay'
                  placeholder='0'
                  className={`form-control body2 ${isSubmitted && errorMessages.desiredPay ? 'field-error' : ''}`}
                  aria-label='pay'
                  name='desiredPay'
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {isSubmitted && errorMessages.desiredPay && <p className='errorState'>{errorMessage}</p>}
          </div>
          {/* Blog */}
          {/* <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>Website, blog, or portfolio link</label>
              <input
                type='url'
                id='blogLink'
                className={`form-control body2 ${isSubmitted && errorMessages.blogLink ? 'field-error' : ''}`}
                placeholder={'www.example.com'}
                aria-label='blogLink'
                name={'blogLink'}
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.blogLink && <p className='errorState'>{errorMessage}</p>}
          </div> */}

          {/* SECTION 3 */}
          <hr className='br-grey30'></hr>
          <div className='resume-field'>
            <div className='d-md-flex justify-content-between align-items-baseline'>
              <div className='d-flex flex-row align-items-baseline'>
                <p className='subtitle-style-1 mb-3'>Upload resume (PDF format, up to 7MB)</p>
                <OverlayTrigger overlay={<Tooltip id='resume'>{tooltipMessages.fileUpload}</Tooltip>}>
                  <div className='mx-1'>
                    <CiCircleInfo color='grey' />
                  </div>
                </OverlayTrigger>
              </div>
              <input
                type='file'
                id='resume'
                accept='pdf/*'
                name={'resume'}
                className={`body2 ${isSubmitted && errorMessages.resume ? 'field-error' : ''}`}
                onChange={handleInputChange}
                required
              />
            </div>
            {isSubmitted && errorMessages.resume && <p className='errorState'>{fileErrorMessage}</p>}
          </div>
          {/* SECTION 4 */}
          {/* Is Referred  */}
          <hr className='br-grey30'></hr>
          <div className='col-md-6'>
            <div>
              <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                Referred by a Karandaaz employee?
              </label>
              <select
                className={`form-select form-control body2 ${
                  isSubmitted && errorMessages.isReferred ? 'field-error' : ''
                }`}
                name='isReferred'
                id='isReferred'
                onChange={handleInputChange}
              >
                <option selected value={''}>
                  Select
                </option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>
            {isSubmitted && errorMessages.isReferred && <p className='errorState'>{errorMessage}</p>}
          </div>
          {/* Referred By Name */}
          <div className='col-md-6'>
            <div>
              <label className='m-0 body2 tx-grey90 ms-1 mb-2'>If yes, who referred you</label>
              <input
                type='text'
                className={`form-control body2 ${
                  isSubmitted && isReferred === 'Yes' && errorMessages.referredBy ? 'field-error' : ''
                }`}
                placeholder={'Employee name'}
                name='referredBy'
                id='referredBy'
                onChange={handleInputChange}
                // disabled={isReferred ? false : true}
              />
            </div>
            {isSubmitted && isReferred === 'Yes' && errorMessages.referredBy && (
              <p className='errorState'>{errorMessage}</p>
            )}
          </div>
          {/* Section 4 */}
          {/* Employee Name */}
          <hr className='br-grey30'></hr>

          {/* Hear About Us */}
          <div className='col-12'>
            <div>
              <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1 mb-2'>
                How did you hear about us? (optional)
              </label>
              <select
                className={`form-select form-control body2`}
                name={'hearAboutUs'}
                id='hearAboutUs'
                onChange={handleInputChange}
              >
                <option selected value=''>
                  Select
                </option>
                <option>LinkedIn</option>
                <option>Instagram</option>
                <option>Karandaaz Employee</option>
                <option>News Publication</option>
                <option>Word of Mouth</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <input
            type='hidden'
            name='jobTitle'
            id='jobTitle'
            value={position} // Set the actual job title here
          />
          {/* First click sets the submit state to true - allows the error states to be visible */}
          <button
            type='submit'
            className='btn btn-primary mt-5 mb-3 rounded-pill body2 tx-grey00'
            onClick={() => {
              setIsSubmitted(true)
              handleButtonClick // Call your function here
            }}
          >
            Submit application
          </button>
        </div>
      </div>
    </FormWrapper>
  )
}
