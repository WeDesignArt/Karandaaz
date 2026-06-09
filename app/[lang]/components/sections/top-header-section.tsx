'use client'
import React from 'react'
import { Breadcrumb, SupportedLang } from '../navigation/breadcrumb'
import { digitalUrl } from '../../../../utils/urls'
import { GoArrowRight } from 'react-icons/go'
import { event } from '../../../../lib/gtag'

// Wysiwyg Editor types
type TopHeaderSectionProps = {
  heading?: string
  subheading?: string
  btntitle?: string
  lang: string
  btnstyle?: string // Optional btnstyle prop
  btnUrl?: string // Optional btnstyle prop
  secondaryButton?: boolean // Optional btnstyle prop
  proposalTemplate?: string
  proposalTemplateText?: string
}

export const TopHeaderSection = ({
  heading = '',
  subheading = '',
  btntitle = '',
  lang,
  btnstyle = '',
  btnUrl = '',
  secondaryButton = false,
  proposalTemplate,
  proposalTemplateText,
}: TopHeaderSectionProps) => {
  // Determine button class based on btnstyle
  const buttonClass = `butn ${btnstyle.includes('butn-solid') ? '' : 'butn-outline'} ${btnstyle}`.trim()
  const isUrdu = lang === 'ur'

  const handleButtonClick = () => {
    event({
      action: 'term_sheet_download',
      category: 'Term Sheet Download',
      label: 'Term Sheet Download',
      value: 1,
    })
  }
  const handleRegisterButtonClick = () => {
    event({
      action: 'register_for_pdw',
      category: 'Register Button Click',
      label: 'Register Button Click',
      value: 1,
    })
  }
  const handleTemplateClick = (value: any) => {
    proposalTemplateText === 'Download Proposal Template'
      ? event({
          action: 'DFAC_proposal_download',
          category: 'Proposal Download',
          label: 'Proposal Download',
          value: value,
        })
      : event({
          action: 'terms_of_reference',
          category: 'Terms of Reference',
          label: 'View Terms of Reference',
          value: value,
        })
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <Breadcrumb lang={lang as SupportedLang} />
          {heading ? <div className='pb-3' dangerouslySetInnerHTML={{ __html: heading }} /> : null}
        </div>
        {subheading ? (
          <div className='col-md-9 text-center mx-auto'>
            <div className='tx-grey80 mb-3 mb-md-5' dangerouslySetInnerHTML={{ __html: subheading }}></div>
            {btntitle ? (
              <a href={btnUrl} className={buttonClass} onClick={handleButtonClick}>
                {btntitle} <GoArrowRight className='tx-large' />
              </a>
            ) : null}
            {secondaryButton ? (
              <a
                href={proposalTemplate}
                className='butn butn-outline butn-large'
                onClick={() =>
                  handleTemplateClick(
                    proposalTemplateText === 'Download Proposal Template'
                      ? 'Download Proposal Template'
                      : 'Terms Of Reference'
                  )
                }
              >
                {proposalTemplateText}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
