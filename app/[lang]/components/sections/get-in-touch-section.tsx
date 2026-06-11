import Image from 'next/image'
import { contactUrl, disclaimerUrl, privacyPolicyUrl } from '../../../../utils/urls'

export const GetInTouchSection = ({ lang }: any) => {
  const isUrdu = lang === 'ur'

  return (
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-sm-12 col-md-6 mb-5 mb-md-0'>
          <h2 className='tx-grey90 pb-3'>
            {isUrdu ? 'رابطہ کریں' : 'Get in touch'}
          </h2>
          <p className=' pb-4'>
            {isUrdu ? 'سوالات ہیں؟ ہمیں ای میل بھیجیں۔' : 'Have questions? Send us an email.'}
          </p>
          <a className='butn butn-solid ms-0' href={contactUrl}>
            {isUrdu ? 'ای میل کریں' : 'Email us'}
          </a>
          <p className='mt-4' style={{ fontSize: '12px', color: '#888' }}>
            {isUrdu ? (
              'کلک کر کے آپ ہماری شرائط و ضوابط، رازداری اور ڈیٹا تحفظ پالیسی سے اتفاق کرتے ہیں۔'
            ) : (
              <>
                By Clicking, you agree to our{' '}
                <a href={disclaimerUrl} style={{ color: '#888', fontSize: '12px', textDecoration: 'underline' }}>Terms and Conditions</a>,{' '}
                <a href={privacyPolicyUrl} style={{ color: '#888', fontSize: '12px', textDecoration: 'underline' }}>Privacy and Data Protection Policy</a>
              </>
            )}
          </p>
        </div>

        <div className='col-sm-12 col-md-6 d-flex justify-content-center'>
          <Image
            src='https://krndevelop.wpenginepowered.com/wp-content/uploads/2026/06/image_215b4-removebg-preview.png'
            width={400}
            height={320}
            style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
            alt='Get in touch'
          />
        </div>
      </div>
    </div>
  )
}
