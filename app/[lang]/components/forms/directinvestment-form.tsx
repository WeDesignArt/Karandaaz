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

export const DirectInvestmentForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const errorMessage = 'Please provide a valid value.'

  const [errorMessages, setErrorMessages] = useState({
    firstName: true,
    lastName: true,
    contact: true,
    email: true,
    companyName: true,
    companyType: true,
    companySize: true,
    amount: true,
    city: true,
    sector: true,
    description: true,
  })

  const handleInputChange = (e: any) => {
    const { id, value } = e.target
    if (id == 'firstName' || id == 'lastName') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: !namePattern.test(value),
      }))
    }
    if (id === 'email') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 30 || !emailPattern.test(value),
      }))
    }
    if (id === 'description') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 150, // Checks if the company field is empty
      }))
    }
    if (id === 'companyName') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '' || value.length >= 50, // Checks if the company field is empty
      }))
    }
    if (id === 'city' || id === 'sector' || id === 'companySize' || id === 'amount' || id === 'companyType') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === '',
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
      apiEndpoint='/api/directinvestment'
      errors={Object.values(errorMessages)}
      backgroundColor='blue'
      formName='directinvestment'
    >
      <div className='row g-3 p-4 p-md-0' dir='ltr'>
        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>First Name</label>
            <div className='form-element'>
              <input
                type='text'
                className={`form-control body2 ${isSubmitted && errorMessages.firstName ? 'field-error' : ''}`}
                placeholder={'First name'}
                name='firstName'
                id='firstName'
                onChange={handleInputChange}
              />
            </div>
          </div>
          {isSubmitted && errorMessages.firstName && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Last Name</label>
            <div className='form-element'>
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
                placeholder={'Email'}
                name={'email'}
                onChange={handleInputChange}
              />
              <TooltipComp title={tooltipMessages?.email} id='email'>
                <CiCircleInfo color='grey' />
              </TooltipComp>
            </div>
          </div>
          {isSubmitted && errorMessages.email && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Company Name</label>
            <div className='form-element'>
              <input
                type={'text'}
                className={`form-control body2 ${isSubmitted && errorMessages.companyName ? 'field-error' : ''}`}
                placeholder={'Company Name'}
                aria-label='companyName'
                name={'companyName'}
                id='companyName'
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.companyName && <p className='errorState'>{errorMessage}</p>}
          </div>
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Company Type
            </label>
            <select
              className={`form-select form-control body2 ${
                isSubmitted && errorMessages.companyType ? 'field-error' : ''
              }`}
              name={'companyType'}
              id='companyType'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Select Type
              </option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
              <option>Private Limited Company</option>
              <option>Public Limited Company</option>
              <option>Limited Liability Partnership (LLP)</option>
              <option>Non-Governmental Organization (NGO)</option>
              <option>Cooperative</option>
              <option>Government-Owned Enterprise</option>
              <option>Joint Venture</option>
              <option>Other</option>
            </select>
          </div>
          {isSubmitted && errorMessages.companyType && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Current company size (per year revenue)
            </label>
            <select
              className={`form-select form-control body2 ${
                isSubmitted && errorMessages.companySize ? 'field-error' : ''
              }`}
              name={'companySize'}
              id='companySize'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Select Type
              </option>
              <option>Less than PKR 10 million</option>
              <option>PKR 10 million - PKR 50 million</option>
              <option>PKR 50 million - PKR 100 million</option>
              <option>PKR 100 million - PKR 500 million</option>
              <option>PKR 500 million - PKR 1 billion</option>
              <option>Over PKR 1 billion</option>
            </select>
          </div>
          {isSubmitted && errorMessages.companySize && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Financing request/amount
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.amount ? 'field-error' : ''}`}
              name={'amount'}
              id='amount'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Select Type
              </option>
              <option>Less than PKR 10 million</option>
              <option>PKR 10 million - PKR 50 million</option>
              <option>PKR 50 million - PKR 100 million</option>
              <option>PKR 100 million - PKR 500 million</option>
              <option>PKR 500 million - PKR 1 billion</option>
              <option>Over PKR 1 billion</option>
            </select>
          </div>
          {isSubmitted && errorMessages.amount && <p className='errorState'>{errorMessage}</p>}
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
              <option selected disabled value={''}>
                Select City
              </option>
              <option value='Islamabad'>Islamabad</option>
              <option value='' disabled>
                Punjab Cities
              </option>
              <option value='Ahmed Nager Chatha'>Ahmed Nager Chatha</option>
              <option value='Ahmadpur East'>Ahmadpur East</option>
              <option value='Ali Khan Abad'>Ali Khan Abad</option>
              <option value='Alipur'>Alipur</option>
              <option value='Arifwala'>Arifwala</option>
              <option value='Attock'>Attock</option>
              <option value='Bhera'>Bhera</option>
              <option value='Bhalwal'>Bhalwal</option>
              <option value='Bahawalnagar'>Bahawalnagar</option>
              <option value='Bahawalpur'>Bahawalpur</option>
              <option value='Bhakkar'>Bhakkar</option>
              <option value='Burewala'>Burewala</option>
              <option value='Chillianwala'>Chillianwala</option>
              <option value='Chakwal'>Chakwal</option>
              <option value='Chichawatni'>Chichawatni</option>
              <option value='Chiniot'>Chiniot</option>
              <option value='Chishtian'>Chishtian</option>
              <option value='Daska'>Daska</option>
              <option value='Darya Khan'>Darya Khan</option>
              <option value='Dera Ghazi Khan'>Dera Ghazi Khan</option>
              <option value='Dhaular'>Dhaular</option>
              <option value='Dina'>Dina</option>
              <option value='Dinga'>Dinga</option>
              <option value='Dipalpur'>Dipalpur</option>
              <option value='Faisalabad'>Faisalabad</option>
              <option value='Ferozewala'>Ferozewala</option>
              <option value='Fateh Jhang'>Fateh Jang</option>
              <option value='Ghakhar Mandi'>Ghakhar Mandi</option>
              <option value='Gojra'>Gojra</option>
              <option value='Gujranwala'>Gujranwala</option>
              <option value='Gujrat'>Gujrat</option>
              <option value='Gujar Khan'>Gujar Khan</option>
              <option value='Hafizabad'>Hafizabad</option>
              <option value='Haroonabad'>Haroonabad</option>
              <option value='Hasilpur'>Hasilpur</option>
              <option value='Haveli Lakha'>Haveli Lakha</option>
              <option value='Jatoi'>Jatoi</option>
              <option value='Jalalpur'>Jalalpur</option>
              <option value='Jattan'>Jattan</option>
              <option value='Jampur'>Jampur</option>
              <option value='Jaranwala'>Jaranwala</option>
              <option value='Jhang'>Jhang</option>
              <option value='Jhelum'>Jhelum</option>
              <option value='Kalabagh'>Kalabagh</option>
              <option value='Karor Lal Esan'>Karor Lal Esan</option>
              <option value='Kasur'>Kasur</option>
              <option value='Kamalia'>Kamalia</option>
              <option value='Kamoke'>Kamoke</option>
              <option value='Khanewal'>Khanewal</option>
              <option value='Khanpur'>Khanpur</option>
              <option value='Kharian'>Kharian</option>
              <option value='Khushab'>Khushab</option>
              <option value='Kot Addu'>Kot Addu</option>
              <option value='Jauharabad'>Jauharabad</option>
              <option value='Lahore'>Lahore</option>
              <option value='Lalamusa'>Lalamusa</option>
              <option value='Layyah'>Layyah</option>
              <option value='Liaquat Pur'>Liaquat Pur</option>
              <option value='Lodhran'>Lodhran</option>
              <option value='Malakwal'>Malakwal</option>
              <option value='Mamoori'>Mamoori</option>
              <option value='Mailsi'>Mailsi</option>
              <option value='Mandi Bahauddin'>Mandi Bahauddin</option>
              <option value='Mian Channu'>Mian Channu</option>
              <option value='Mianwali'>Mianwali</option>
              <option value='Multan'>Multan</option>
              <option value='Murree'>Murree</option>
              <option value='Muridke'>Muridke</option>
              <option value='Mianwali Bangla'>Mianwali Bangla</option>
              <option value='Muzaffargarh'>Muzaffargarh</option>
              <option value='Narowal'>Narowal</option>
              <option value='Nankana Sahib'>Nankana Sahib</option>
              <option value='Okara'>Okara</option>
              <option value='Renala Khurd'>Renala Khurd</option>
              <option value='Pakpattan'>Pakpattan</option>
              <option value='Pattoki'>Pattoki</option>
              <option value='Pir Mahal'>Pir Mahal</option>
              <option value='Qaimpur'>Qaimpur</option>
              <option value='Qila Didar Singh'>Qila Didar Singh</option>
              <option value='Rabwah'>Rabwah</option>
              <option value='Raiwind'>Raiwind</option>
              <option value='Rajanpur'>Rajanpur</option>
              <option value='Rahim Yar Khan'>Rahim Yar Khan</option>
              <option value='Rawalpindi'>Rawalpindi</option>
              <option value='Sadiqabad'>Sadiqabad</option>
              <option value='Safdarabad'>Safdarabad</option>
              <option value='Sahiwal'>Sahiwal</option>
              <option value='Sangla Hill'>Sangla Hill</option>
              <option value='Sarai Alamgir'>Sarai Alamgir</option>
              <option value='Sargodha'>Sargodha</option>
              <option value='Shakargarh'>Shakargarh</option>
              <option value='Sheikhupura'>Sheikhupura</option>
              <option value='Sialkot'>Sialkot</option>
              <option value='Sohawa'>Sohawa</option>
              <option value='Soianwala'>Soianwala</option>
              <option value='Siranwali'>Siranwali</option>
              <option value='Talagang'>Talagang</option>
              <option value='Taxila'>Taxila</option>
              <option value='Toba Tek Singh'>Toba Tek Singh</option>
              <option value='Vehari'>Vehari</option>
              <option value='Wah Cantonment'>Wah Cantonment</option>
              <option value='Wazirabad'>Wazirabad</option>
              <option value='' disabled>
                Sindh Cities
              </option>
              <option value='Badin'>Badin</option>
              <option value='Bhirkan'>Bhirkan</option>
              <option value='Rajo Khanani'>Rajo Khanani</option>
              <option value='Chak'>Chak</option>
              <option value='Dadu'>Dadu</option>
              <option value='Digri'>Digri</option>
              <option value='Diplo'>Diplo</option>
              <option value='Dokri'>Dokri</option>
              <option value='Ghotki'>Ghotki</option>
              <option value='Haala'>Haala</option>
              <option value='Hyderabad'>Hyderabad</option>
              <option value='Islamkot'>Islamkot</option>
              <option value='Jacobabad'>Jacobabad</option>
              <option value='Jamshoro'>Jamshoro</option>
              <option value='Jungshahi'>Jungshahi</option>
              <option value='Kandhkot'>Kandhkot</option>
              <option value='Kandiaro'>Kandiaro</option>
              <option value='Karachi'>Karachi</option>
              <option value='Kashmore'>Kashmore</option>
              <option value='Keti Bandar'>Keti Bandar</option>
              <option value='Khairpur'>Khairpur</option>
              <option value='Kotri'>Kotri</option>
              <option value='Larkana'>Larkana</option>
              <option value='Matiari'>Matiari</option>
              <option value='Mehar'>Mehar</option>
              <option value='Mirpur Khas'>Mirpur Khas</option>
              <option value='Mithani'>Mithani</option>
              <option value='Mithi'>Mithi</option>
              <option value='Mehrabpur'>Mehrabpur</option>
              <option value='Moro'>Moro</option>
              <option value='Nagarparkar'>Nagarparkar</option>
              <option value='Naudero'>Naudero</option>
              <option value='Naushahro Feroze'>Naushahro Feroze</option>
              <option value='Naushara'>Naushara</option>
              <option value='Nawabshah'>Nawabshah</option>
              <option value='Nazimabad'>Nazimabad</option>
              <option value='Qambar'>Qambar</option>
              <option value='Qasimabad'>Qasimabad</option>
              <option value='Ranipur'>Ranipur</option>
              <option value='Ratodero'>Ratodero</option>
              <option value='Rohri'>Rohri</option>
              <option value='Sakrand'>Sakrand</option>
              <option value='Sanghar'>Sanghar</option>
              <option value='Shahbandar'>Shahbandar</option>
              <option value='Shahdadkot'>Shahdadkot</option>
              <option value='Shahdadpur'>Shahdadpur</option>
              <option value='Shahpur Chakar'>Shahpur Chakar</option>
              <option value='Shikarpaur'>Shikarpaur</option>
              <option value='Sukkur'>Sukkur</option>
              <option value='Tangwani'>Tangwani</option>
              <option value='Tando Adam Khan'>Tando Adam Khan</option>
              <option value='Tando Allahyar'>Tando Allahyar</option>
              <option value='Tando Muhammad Khan'>Tando Muhammad Khan</option>
              <option value='Thatta'>Thatta</option>
              <option value='Umerkot'>Umerkot</option>
              <option value='Warah'>Warah</option>
              <option value='' disabled>
                Khyber Cities
              </option>
              <option value='Abbottabad'>Abbottabad</option>
              <option value='Adezai'>Adezai</option>
              <option value='Alpuri'>Alpuri</option>
              <option value='Akora Khattak'>Akora Khattak</option>
              <option value='Ayubia'>Ayubia</option>
              <option value='Banda Daud Shah'>Banda Daud Shah</option>
              <option value='Bannu'>Bannu</option>
              <option value='Batkhela'>Batkhela</option>
              <option value='Battagram'>Battagram</option>
              <option value='Birote'>Birote</option>
              <option value='Chakdara'>Chakdara</option>
              <option value='Charsadda'>Charsadda</option>
              <option value='Chitral'>Chitral</option>
              <option value='Daggar'>Daggar</option>
              <option value='Dargai'>Dargai</option>
              <option value='Darya Khan'>Darya Khan</option>
              <option value='Dera Ismail Khan'>Dera Ismail Khan</option>
              <option value='Doaba'>Doaba</option>
              <option value='Dir'>Dir</option>
              <option value='Drosh'>Drosh</option>
              <option value='Hangu'>Hangu</option>
              <option value='Haripur'>Haripur</option>
              <option value='Karak'>Karak</option>
              <option value='Kohat'>Kohat</option>
              <option value='Kulachi'>Kulachi</option>
              <option value='Lakki Marwat'>Lakki Marwat</option>
              <option value='Latamber'>Latamber</option>
              <option value='Madyan'>Madyan</option>
              <option value='Mansehra'>Mansehra</option>
              <option value='Mardan'>Mardan</option>
              <option value='Mastuj'>Mastuj</option>
              <option value='Mingora'>Mingora</option>
              <option value='Nowshera'>Nowshera</option>
              <option value='Paharpur'>Paharpur</option>
              <option value='Pabbi'>Pabbi</option>
              <option value='Peshawar'>Peshawar</option>
              <option value='Saidu Sharif'>Saidu Sharif</option>
              <option value='Shorkot'>Shorkot</option>
              <option value='Shewa Adda'>Shewa Adda</option>
              <option value='Swabi'>Swabi</option>
              <option value='Swat'>Swat</option>
              <option value='Tangi'>Tangi</option>
              <option value='Tank'>Tank</option>
              <option value='Thall'>Thall</option>
              <option value='Timergara'>Timergara</option>
              <option value='Tordher'>Tordher</option>
              <option value='' disabled>
                Balochistan Cities
              </option>
              <option value='Awaran'>Awaran</option>
              <option value='Barkhan'>Barkhan</option>
              <option value='Chagai'>Chagai</option>
              <option value='Dera Bugti'>Dera Bugti</option>
              <option value='Gwadar'>Gwadar</option>
              <option value='Harnai'>Harnai</option>
              <option value='Jafarabad'>Jafarabad</option>
              <option value='Jhal Magsi'>Jhal Magsi</option>
              <option value='Kacchi'>Kacchi</option>
              <option value='Kalat'>Kalat</option>
              <option value='Kech'>Kech</option>
              <option value='Kharan'>Kharan</option>
              <option value='Khuzdar'>Khuzdar</option>
              <option value='Killa Abdullah'>Killa Abdullah</option>
              <option value='Killa Saifullah'>Killa Saifullah</option>
              <option value='Kohlu'>Kohlu</option>
              <option value='Lasbela'>Lasbela</option>
              <option value='Lehri'>Lehri</option>
              <option value='Loralai'>Loralai</option>
              <option value='Mastung'>Mastung</option>
              <option value='Musakhel'>Musakhel</option>
              <option value='Nasirabad'>Nasirabad</option>
              <option value='Nushki'>Nushki</option>
              <option value='Panjgur'>Panjgur</option>
              <option value='Pishin Valley'>Pishin Valley</option>
              <option value='Quetta'>Quetta</option>
              <option value='Sherani'>Sherani</option>
              <option value='Sibi'>Sibi</option>
              <option value='Sohbatpur'>Sohbatpur</option>
              <option value='Washuk'>Washuk</option>
              <option value='Zhob'>Zhob</option>
              <option value='Ziarat'>Ziarat</option>
            </select>
          </div>
          {isSubmitted && errorMessages.city && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-md-6'>
          <div>
            <label htmlFor='inputState' className='m-0 body2 tx-grey90 ms-1'>
              Sector
            </label>
            <select
              className={`form-select form-control body2 ${isSubmitted && errorMessages.sector ? 'field-error' : ''}`}
              name={'sector'}
              id='sector'
              onChange={handleInputChange}
            >
              <option selected value=''>
                Select Sector
              </option>
              <option value='Manufacturing'>Manufacturing</option>
              <option value='Information Technology'>Information Technology</option>
              <option value='Healthcare'>Healthcare</option>
              <option value='Education'>Education</option>
              <option value='Financial Services'>Financial Services</option>
              <option value='Retail & Wholesale'>Retail & Wholesale</option>
              <option value='E-commerce'>E-commerce</option>
              <option value='Transportation & Logistics'>Transportation & Logistics</option>
              <option value='Construction'>Construction</option>
              <option value='Energy & Utilities'>Energy & Utilities</option>
              <option value='Real Estate'>Real Estate</option>
              <option value='Hospitality & Tourism'>Hospitality & Tourism</option>
              <option value='Media & Entertainment'>Media & Entertainment</option>
              <option value='Telecommunications'>Telecommunications</option>
              <option value='Pharmaceuticals'>Pharmaceuticals</option>
              <option value='FMCG'>FMCG (Fast-Moving Consumer Goods)</option>
              <option value='Renewable Energy'>Renewable Energy</option>
              <option value='Automotive'>Automotive</option>
              <option value='Textiles'>Textiles</option>
              <option value='Food & Beverages'>Food & Beverages</option>
              <option value='Non-Profit/NGO'>Non-Profit/NGO</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          {isSubmitted && errorMessages.sector && <p className='errorState'>{errorMessage}</p>}
        </div>
        <div className='col-12'>
          <div>
            <label className='m-0 body2 tx-grey90 ms-1'>Description</label>
            <div className='form-element'>
              <textarea
                className={`form-control body2 ${isSubmitted && errorMessages.description ? 'field-error' : ''}`}
                placeholder={'Enter a description...'}
                name={'description'}
                id='description'
                rows={3}
                onChange={handleInputChange}
              />
            </div>
            {isSubmitted && errorMessages.description && <p className='errorState'>{errorMessage}</p>}
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary mb-3 rounded-pill body2 tx-grey00'
          onClick={() => setIsSubmitted(true)}
        >
          Apply for Investment
          <span className='mx-2'>
            <TfiArrowCircleDown />
          </span>
        </button>
      </div>
    </FormWrapper>
  )
}
