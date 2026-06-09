'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script'; // Import Next.js Script component
import roeiImage from './../../images/roei.png';
import SubscribeForm from '../navigation/subscribeForm';

export const SubscriptionSection = ({ lang }: any) => {
  const isUrdu = lang === 'ur';

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simple email validation before submission
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    setEmailError(null); // Clear error if the email is valid

    // Dynamically load the script before submitting the form
    if (!isScriptLoaded) {
      setIsScriptLoaded(true);
    }

    // Simulate form submission here (you can use your existing form submission process)
    setTimeout(() => {
      setSubmissionStatus('Thank you for subscribing!');
      setEmail(''); // Reset form field after successful submission
      setIsSubmitting(false);
    }, 1000); // Simulate network delay
  };

  const validateEmail = (email: string) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-6 mb-5 mb-md-0'>
          <h3 className='tx-grey80 pb-2 pb-md-4'>
            {isUrdu
              ? 'ہمارے ماہرین کی رائے اور تازہ ترین معلومات حاصل کریں'
              : 'Receive our expert insights and updates'}
          </h3>

          {/* The form to subscribe */}
          <form className='custom_newsletter' onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@company.com"
              required
              aria-describedby="emailError"
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </button>

            {/* Show email error message if there's an issue */}
            {emailError && <p id="emailError" style={{ color: 'red' }}>{emailError}</p>}
          </form>

          {/* Submission status */}
          {submissionStatus && <p>{submissionStatus}</p>}

          {/* Dynamically load the Constant Contact script on submit */}
          {isScriptLoaded && (
            <Script
              id="ctct-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  var _ctct_m = "7fa420e43d64ae5d4f8f0f5ff4458acf";  // Replace with your Constant Contact account ID
                  var formElement = document.querySelector('.ctct-inline-form');
                  if (formElement && window.ctct && window.ctct.ui) {
                    window.ctct.ui.refreshInlineForm(formElement);
                  }
                `,
              }}
            />
          )}

          {/* Constant Contact form */}
          {isScriptLoaded && (
            <div className="ctct-inline-form" data-form-id="ecba7e55-1e7d-4acc-a4cb-c83065032188"></div>
          )}
        </div>

        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
          {/* Image */}
          <Image className="subscription-image" src={roeiImage} width={400} height={270} alt="Subscription Image" />
        </div>
      </div>
    </div>
  );
};