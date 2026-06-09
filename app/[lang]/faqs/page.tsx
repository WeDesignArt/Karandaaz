import React from 'react'
import { getAdditionalPagesFields } from '../api/lib/additionalPages'
import './page.css'
import { TopHeaderSection } from '../components/sections/top-header-section'

export default async function FaqsPage({ params }: any) {
  const res = await getAdditionalPagesFields('home-faqs')
  const information = res?.information || []

  return (
    <main>
      <TopHeaderSection heading=' <h2>FAQs</h2>' lang={params.lang} />
      <section className='section-py-md bg-grey'>
        <div className='container'>
          <div className='accordion' id='accordionExample'>
            {information.map((item: any, index: number) => (
              <div className='accordion-item' key={index}>
                <h2 className='accordion-header' id={`heading${index}`}>
                  <button
                    className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {item.heading}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent='#accordionExample'
                >
                  <div className='accordion-body' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
