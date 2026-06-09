'use client'
import { useEffect, useState } from 'react'

interface SubscribeFormProps {
  formId: string
  emailFieldId: string
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ formId, emailFieldId }) => {
  const [isFormLoaded, setIsFormLoaded] = useState(false)

  useEffect(() => {
    // Check if the script is already loaded
    if (!(window as any).isConstantContactLoaded) {
      // Load the Constant Contact form script
      const script = document.createElement('script')
      script.src = '//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js'
      script.async = true
      script.onload = () => {
        ;(window as any).isConstantContactLoaded = true // Mark script as loaded

        // Add placeholder to the email field after the form loads
        const addPlaceholder = () => {
          const emailField = document.getElementById(emailFieldId)
          if (emailField) {
            emailField.setAttribute('placeholder', 'Email Address')
          } else {
            // Retry after a short delay if the field isn't yet available
            setTimeout(addPlaceholder, 100)
          }
        }
        addPlaceholder()
        setIsFormLoaded(true) // Set the form as loaded
      }

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script) // Clean up the script on component unmount
      }
    } else {
      // Script already loaded, just add the placeholder
      const addPlaceholder = () => {
        const emailField = document.getElementById(emailFieldId)
        if (emailField) {
          emailField.setAttribute('placeholder', 'Email Address')
        } else {
          setTimeout(addPlaceholder, 100) // Retry if field not yet available
        }
      }
      addPlaceholder()
      setIsFormLoaded(true)
    }
  }, [emailFieldId])

  return (
    <>
      {/* Add inline Constant Contact tracking script */}
      <script
        id='ctct-m'
        dangerouslySetInnerHTML={{
          __html: `var _ctct_m = "7fa420e43d64ae5d4f8f0f5ff4458acf";`, // Your actual _ctct_m value
        }}
      />
      {!isFormLoaded && <p>Loading form...</p>} {/* Show loading message until form is loaded */}
      {/* Constant Contact Inline Form */}
      <div className='ctct-inline-form' data-form-id={formId}></div>
    </>
  )
}

export default SubscribeForm
