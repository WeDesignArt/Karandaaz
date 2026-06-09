import { getDigitalDiscoveryChall, getDigitalRelatedMedia } from '../../../api/lib/digital'
import { TopHeaderSection } from '../../../components/sections/top-header-section'
import Image from 'next/image'
import './page.css'
import { BlogCard } from '@/[lang]/components//core/cards/blog-card'

export default async function KrnDiscoveryChallenge({ params }: any) {
  const res = await getDigitalDiscoveryChall(params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const faqsSection = res?.faqsSection

  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md pb-0 bg-grey'>
        <TopHeaderSection heading={res?.heading} subheading={res?.subheading} lang={params.lang} />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h2> {res?.thematicSection?.heading}</h2>
            </div>
            <div className='col-md-9 text-center mx-auto'>
              <div className='tx-grey80 pb-3' dangerouslySetInnerHTML={{ __html: res?.thematicSection?.subheading }} />
            </div>
            {res?.thematicSection?.thematicCard?.map((card: any, index: any) => {
              return (
                <div
                  className={` br-r20 mb-2 mb-md-4 ${index == 0 ? 'br-yellow40 bg-yellow00' : 'bg-blue00 br-blue20'}`}
                >
                  <div className='row p-2 p-md-5'>
                    <div className='col-md-12'>
                      <h6>{card?.heading}</h6>
                      <p className='mb-0 mb-md-3' dangerouslySetInnerHTML={{ __html: card?.subheading }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className='section-py-md  subheader'>
        <div className='container'>
          <div className='bg-blue00 section-py-sm br-r20 mb-2 mb-md-4'>
            <div className='row p-2 p-md-5'>
              <div className='col-md-6'>
                <h2 className='tx-krnblue pb-2 pb-md-2'>{res?.applySection?.heading}</h2>
              </div>
              <div className='col-md-6'>
                <p className='mb-0 mb-md-3' dangerouslySetInnerHTML={{ __html: res?.applySection?.subheading }} />
                {/* <a className='butn butn-solid' href={contactUrl}>
                  Apply for fund <GoArrowRight className='tx-large' />
                </a> */}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <Image
                src={res?.applySection?.imageOne?.node?.sourceUrl}
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                className='br-20 mb-2 mb-md-4'
                sizes='100vw'
                alt=''
              />
              <div className='bg-blue40 br-r20 p-2 p-md-5'>
                <div className='row'>
                  <div className='col-md-6' style={{ borderRight: '2px solid white', paddingRight: '35px' }}>
                    <div className='text-center py-2 py-md-4'>
                      <p className='tx-blue20 tx-medium tx-bold mb-0'>
                        {isUrdu ? 'درخواستیں کھل گئی ہیں:' : 'Applications Open:'}
                      </p>
                      <p className='tx-white tx-medium tx-bold'>{res?.applySection?.openDate}</p>
                    </div>
                  </div>
                  <div className='col-md-6' style={{ paddingLeft: '20px' }}>
                    <div className='text-center py-2 py-md-4'>
                      <p className='tx-blue20 tx-medium tx-bold mb-0'>
                        {' '}
                        {isUrdu ? 'درخواستیں بند ہو جائیں گی:' : 'Applications Close:'}
                      </p>
                      <p className='tx-white tx-medium tx-bold'>{res?.applySection?.closeDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <Image
                src={res?.applySection?.imageTwo?.node?.sourceUrl}
                width={0}
                height={0}
                style={{ width: '100%', height: '100%' }}
                className='br-r20'
                sizes='100vw'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>

      <section className='section-py-md  bg-grey'>
        <div className='col-md-12 text-center'>
          <h2 className='mb-3'> {faqsSection?.heading}</h2>
        </div>
        <div className='col-md-9 text-center mx-auto'>
          <div className='tx-grey80 pb-3' dangerouslySetInnerHTML={{ __html: faqsSection?.subheading }} />
        </div>

        <div className='container'>
          <div className='accordion' id='accordionExample'>
            {faqsSection?.questionSection?.map((item: any, index: number) => (
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
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent='#accordionExample'
                >
                  <div className='accordion-body' dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className='section-py-md relatedmedia bg-blue00'>
        <div className='container'>
          <div className='row gy-4'>
            <div className='col-md-12'>
              <h4 className='tx-blue20'>{isUrdu ? 'متعلقہ میڈیا' : 'Related media'}</h4>
            </div>
            {resRelatedmedia?.relatedMedia?.relatedPosts?.map((post: any, index: number) => {
              return (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-3'
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  <BlogCard imgLink={post?.thumbnail?.node?.mediaItemUrl} title={post?.title} link={post?.link} />
                </div>
              )
            })}
          </div>
        </div>
      </section> */}
    </main>
  )
}
