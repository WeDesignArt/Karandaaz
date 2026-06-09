'use client'
import React from 'react'
import KeyDatesCard from '../core/cards/key-dates-card'
import { event } from '../../../../lib/gtag'
import { GoArrowRight } from 'react-icons/go'

type DateCard = {
  date: string
  description: string
  month: string
}

type KeyDatesProps = {
  data: {
    heading: string
    noteText: string
    buttonText: string
    keyCards: DateCard[]
    termSheet: {
      node: {
        mediaItemUrl: string
      }
    }
    deadlineText: string
  }
  cardSection: {
    buttonLink: string
    buttonTitle: string
  }
  DownloadProposalTemplate?: boolean
  TermsOfRefference?: string
}

export const Keydates = ({
  data,
  cardSection,
  DownloadProposalTemplate = false,
  TermsOfRefference = '',
}: KeyDatesProps) => {
  const handleButtonClick = () => {
    event({
      action: 'term_sheet_download',
      category: 'Term Sheet Download',
      label: 'Term Sheet Download',
      value: 2,
    })
  }
  const handleTemplateClick = (value: any) => {
    event({
      action: 'DFAC_proposal_download',
      category: 'Proposal Download',
      label: 'Proposal Download',
      value: value,
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

  return (
    <section className='section-py-md pt-0 keydates'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='text-center mb-5'>{data.heading}</h2>
          </div>
        </div>
        <div className='row'>
          {data?.keyCards?.map((card, index) => {
            const count = data?.keyCards?.length || 0
            const colClass = count >= 4 ? 'col-md-3' : count === 3 ? 'col-md-4' : count === 2 ? 'col-md-6' : 'col-md-12'
            return (
              <KeyDatesCard
                key={index}
                index={index}
                month={card?.month}
                day={card?.date}
                description={card?.description}
                colClass={colClass}
              />
            )
          })}
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='text-center'>
              {data.noteText && (
                <>
                  <p className='mt-4'>{data.noteText}</p>
                  <p>
                    In case of any queries, email us at <a href='mailto:dfa@karandaaz.com.pk'>dfa@karandaaz.com.pk</a>
                  </p>
                </>
              )}

              {data?.termSheet?.node?.mediaItemUrl && (
                <a
                  href={data?.termSheet?.node?.mediaItemUrl}
                  className='butn butn-solid mt-5'
                  onClick={handleButtonClick}
                >
                  {data?.buttonText}
                </a>
              )}
              {cardSection?.buttonLink && (
                <a href={cardSection?.buttonLink} className='butn butn-solid mt-5'>
                  {cardSection?.buttonTitle} <GoArrowRight className='tx-large' />
                </a>
              )}
              {TermsOfRefference && (
                <>
                  <a
                    href={TermsOfRefference}
                    className='butn butn-outline butn-large mt-5'
                    onClick={() => handleTemplateClick('Offline Payment TOR')}
                  >
                    View Terms of Reference
                  </a>
                </>
              )}
              {DownloadProposalTemplate && (
                <>
                  <a
                    href='https://krndevelop.wpenginepowered.com/wp-content/uploads/2025/03/DFAC-2-Proposal-Template.docx'
                    className='butn butn-outline butn-large'
                    onClick={() => handleTemplateClick('DFAC 2 Proposal Template')}
                  >
                    Download Proposal Template
                  </a>
                </>
              )}
              {data?.deadlineText && (
                <div className='mt-4 text-center' dangerouslySetInnerHTML={{ __html: data?.deadlineText }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Keydates
