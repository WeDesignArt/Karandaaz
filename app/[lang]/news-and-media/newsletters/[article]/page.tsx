import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import Image from 'next/image'
import React from 'react'
import { getNewsletterBySlug } from '@/[lang]/api/lib/news-media'
import './page.css'
import FloatingNav from './FloatingNav'
import MobileFloatingNav from './MobileFloatingNav'
import HashScroll from './HashScroll'
import SubscribeForm from '@/[lang]/components/navigation/subscribeForm'
import SponsorsFooter from '@/[lang]/components/navigation/sponsors-footer'
import { GoArrowLeft } from 'react-icons/go'
import { peopleAtKarandaazUrl, researchBlogsUrl } from '../../../../../utils/urls'

export default async function Article({ params }: { params: { article: string; lang: any } }) {
  const res = await getNewsletterBySlug(params?.article, params?.lang)
  const isUrdu = params.lang === 'ur'

  // Map section fieldGroupName to floatingNav key
  const sectionKeyMap: Record<string, string> = {
    InsightNewsletterNewsletterSectionsCeoMessageLayout: 'ceoMessage',
    InsightNewsletterNewsletterSectionsNewsFlashLayout: 'newsFlash',
    InsightNewsletterNewsletterSectionsKnowOurPartnersLayout: 'partnersInterview',
    InsightNewsletterNewsletterSectionsSuccessStoriesLayout: 'successStories',
    InsightNewsletterNewsletterSectionsKarandaazPublicationsLayout: 'KRNPublications',
    InsightNewsletterNewsletterSectionsKarandaazBlogsLayout: 'KRNBlogs',
    InsightNewsletterNewsletterSectionsKarandaazEventsLayout: 'KRNEvents',
    InsightNewsletterNewsletterSectionsLifeAtKarandaazLayout: 'lifeEvents',
    // Add more mappings as needed
  }

  // Build set of available section keys
  const availableSections: Set<string> = new Set(
    res?.insightNewsletter?.newsletterSections
      ?.map((section: any) => sectionKeyMap[section.fieldGroupName])
      .filter((v: unknown): v is string => Boolean(v))
  )

  // Nav labels
  const navLabels: Record<string, string> = isUrdu
    ? {
        ceoMessage: 'سی ای او پیغام',
        newsFlash: 'نیوزفلیش',
        partnersInterview: 'ہمارے شراکت داروں کو جانیں',
        KRNPublications: 'کارانداز تحقیق و اشاعت',
        KRNBlogs: 'کارنداز بلاگز',
        successStories: 'ہماری کامیابی کی کہانیاں',
        KRNEvents: 'کارانداز کی تقریبات',
        lifeEvents: 'کارانداز میں زندگی',
      }
    : {
        ceoMessage: 'CEO Message',
        newsFlash: 'News Flash',
        partnersInterview: 'Know Our Partners',
        KRNPublications: 'Karandaaz Publications',
        KRNBlogs: 'Karandaaz Blogs',
        successStories: 'Success Stories',
        KRNEvents: 'Karandaaz Events',
        lifeEvents: 'Life at Karandaaz',
      }

  // Determine desired section order as rendered on the page
  const sectionOrder: string[] = (res?.insightNewsletter?.newsletterSections || [])
    .map((section: any) => sectionKeyMap[section.fieldGroupName])
    .filter((v: unknown): v is string => Boolean(v))

  // Original floating nav from API (may be unsorted)
  const originalFloatingNav: string[] = Array.isArray(res?.insightNewsletter?.floatingNav)
    ? res.insightNewsletter.floatingNav
    : []

  // Sort floating nav according to renderSection order, preserving only present keys
  const sortedFloatingNav: string[] = sectionOrder.filter((key) => originalFloatingNav.includes(key))

  // Generalized section renderer
  const renderSection = (section: any, idx: number) => {
    const sectionId = sectionKeyMap[section.fieldGroupName]
    const sectionTitle = navLabels[sectionId] || sectionId
    // CEO Message keeps its author card
    if (section.fieldGroupName === 'InsightNewsletterNewsletterSectionsCeoMessageLayout') {
      return (
        <section id={sectionId} className='newsletter-section ceo-message section-py-sm' key={idx}>
          <h4>{sectionTitle}</h4>
          <div dangerouslySetInnerHTML={{ __html: section.message }} />
          <a
            href={isUrdu ? `/${params.lang}${peopleAtKarandaazUrl}` : `${peopleAtKarandaazUrl}`}
            className='author-card mt-4 d-flex justify-content-end align-items-center gap-4'
          >
            <div className='text-end'>
              <div className='name'>{section.name}</div>
              {section.designation && <span className=''>{section.designation}</span>}
            </div>
            {section.picture?.node?.mediaItemUrl && (
              <div className='image-wrap'>
                <Image
                  className=''
                  src={section.picture.node.mediaItemUrl}
                  alt={section.name || ''}
                  width={0}
                  height={0}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  sizes='40px'
                />
              </div>
            )}
          </a>
        </section>
      )
    }
    // News Flash does not have bannerImage
    const hasBanner =
      section.bannerImage?.node?.mediaItemUrl &&
      section.fieldGroupName !== 'InsightNewsletterNewsletterSectionsNewsFlashLayout'
    return (
      <section id={sectionId} className={`newsletter-section section-py-sm ${sectionId}`} key={idx}>
        {section.heading?.node?.mediaItemUrl ? (
          <Image
            className='heading-tag'
            src={section.heading.node.mediaItemUrl}
            alt={sectionTitle}
            width={0}
            height={0}
            sizes='100vw'
          />
        ) : (
          <h4>{sectionTitle}</h4>
        )}
        {hasBanner && (
          <div className='mb-4'>
            <Image
              className='banner-image'
              src={section.bannerImage.node.mediaItemUrl}
              alt={`${sectionTitle} Banner`}
              width={0}
              height={0}
              sizes='100vw'
            />
          </div>
        )}
        <div>
          {section.contentElements?.map((el: any, i: number) => {
            switch (el.fieldGroupName) {
              case 'InsightNewsletterNewsletterSectionsContentElementsHeadingLayout': {
                const HeadingTag = (Array.isArray(el.headingType) && el.headingType[0]) || 'h5'
                const rawHeading = (el.headingText || '').trim()
                const limitedHeading = rawHeading.split(/\s+/).slice(0, 3).join(' ')
                const headingId = limitedHeading.toLowerCase().replace(/[^a-z]/g, '')
                return HeadingTag === 'h4'
                  ? React.createElement(HeadingTag, { key: i, className: 'mb-2', id: headingId }, el.headingText)
                  : React.createElement(HeadingTag, { key: i, className: 'mb-2' }, el.headingText)
              }
              case 'InsightNewsletterNewsletterSectionsContentElementsPictureLayout': {
                const imageSize = (Array.isArray(el.imageSize) && el.imageSize[0]) || ''
                let imgClass = ''
                if (imageSize === 'full') imgClass = 'img-full'
                else if (imageSize === 'half') imgClass = 'img-half'
                else if (imageSize === 'thumbnail') imgClass = 'img-thumbnail'
                return el.image?.node?.mediaItemUrl ? (
                  <Image
                    key={i}
                    src={el.image.node.mediaItemUrl}
                    alt='Section Image'
                    width={0}
                    height={0}
                    className={imgClass}
                    sizes='100vw'
                  />
                ) : null
              }
              case 'InsightNewsletterNewsletterSectionsContentElementsParagraphLayout':
                return <div key={i} className='mt-2' dangerouslySetInnerHTML={{ __html: el.content }} />
              case 'InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout':
                return (
                  <blockquote key={i} className='blockquote'>
                    {el.quote && (
                      <div
                        className='tx-grey100 bg-blue00 px-3 py-4 br-r20'
                        dangerouslySetInnerHTML={{ __html: el.quote }}
                      />
                    )}
                    <a
                      href={isUrdu ? `/${params.lang}${researchBlogsUrl}` : `${researchBlogsUrl}`}
                      className={`author-card mt-4 d-flex align-items-center justify-content-end gap-4 ${
                        section.fieldGroupName === 'InsightNewsletterNewsletterSectionsKarandaazBlogsLayout'
                          ? 'flex-row-reverse'
                          : ''
                      }`}
                    >
                      <div
                        className={`content-wrap ${
                          section.fieldGroupName === 'InsightNewsletterNewsletterSectionsKnowOurPartnersLayout'
                            ? 'text-end'
                            : ''
                        }`}
                      >
                        <div className='title'>
                          {section.fieldGroupName === 'InsightNewsletterNewsletterSectionsKarandaazBlogsLayout'
                            ? isUrdu
                              ? 'مصنف:'
                              : 'Authored by:'
                            : section.fieldGroupName === 'InsightNewsletterNewsletterSectionsKnowOurPartnersLayout'
                            ? isUrdu
                              ? 'انٹرویو کیا:'
                              : 'Interview conducted by:'
                            : ''}
                        </div>
                        <div className='name'>{el.name}</div>
                        {el.designation && <span className=''>{el.designation}</span>}
                      </div>
                      {el.image?.node?.mediaItemUrl && (
                        <div className='image-wrap'>
                          <Image
                            className=''
                            src={el.image.node.mediaItemUrl}
                            alt={el.name || ''}
                            width={0}
                            height={0}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '50%',
                            }}
                            sizes='40px'
                          />
                        </div>
                      )}
                    </a>
                  </blockquote>
                )
              case 'InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout':
                return (
                  <div key={i} className='ad-block'>
                    {el.adHyperlink?.url ? (
                      <a
                        href={el.adHyperlink.url}
                        target={el.adHyperlink.target || '_blank'}
                        rel='noopener noreferrer'
                        className='d-flex justify-content-center'
                        style={{
                          width: '100%',
                        }}
                      >
                        {el.adImage?.node?.mediaItemUrl && (
                          <Image
                            src={el.adImage.node.mediaItemUrl}
                            alt={el.adHyperlink.title || 'Ad'}
                            width={0}
                            height={0}
                            style={{ width: '90%', height: 'auto', margin: 'auto' }}
                            sizes='100vw'
                          />
                        )}
                        {el.adHyperlink.title && <div>{el.adHyperlink.title}</div>}
                      </a>
                    ) : (
                      el.adImage?.node?.mediaItemUrl && (
                        <Image
                          src={el.adImage.node.mediaItemUrl}
                          alt={el.adHyperlink?.title || 'Ad'}
                          width={0}
                          height={0}
                          style={{ width: '90%', height: 'auto', margin: 'auto' }}
                          sizes='100vw'
                        />
                      )
                    )}
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      </section>
    )
  }

  return (
    <div>
      {/* Smooth scroll style */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <HashScroll />
      <section className='section-py-md pb-0' dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <Breadcrumb lang={params.lang} />
              <h2 className='text-center mb-5'>{res?.title}</h2>
            </div>
            {/* Mobile Floating Navigation */}
            {Array.isArray(res?.insightNewsletter?.floatingNav) && (
              <div className='col-12 d-md-none'>
                <MobileFloatingNav
                  floatingNav={sortedFloatingNav}
                  availableSections={availableSections}
                  navLabels={navLabels}
                  isUrdu={isUrdu}
                />
              </div>
            )}
            <div id='main-section' className='col-sm-12 col-md-9 pr-md-4'>
              {res?.insightNewsletter?.bannerImage?.node?.mediaItemUrl && (
                <div className=''>
                  <Image
                    src={res.insightNewsletter.bannerImage.node.mediaItemUrl}
                    alt='Newsletter Banner'
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='main-image'
                  />
                </div>
              )}
              {res?.insightNewsletter?.subheading && <h5>{res?.insightNewsletter?.subheading}</h5>}
              {res?.insightNewsletter?.newsletterSections?.map(renderSection)}
              {/* <section className='row pt-5 newsletter-section'>
                <div className='col-sm-12 col-md-4'>
                  <h4 className='subtitle-style-1 pt-md-2'>Subscribe to our Newsletter</h4>
                </div>
                <div className='col-sm-12 col-md-8'>
                  <SubscribeForm formId='4e92e546-4df9-4130-a6ef-81a1827cbb8a' emailFieldId='email_address_0' />
                </div>
              </section> */}
              <a
                id='last-section'
                href={isUrdu ? `/${params.lang}/news-and-media/newsletters/` : '/news-and-media/newsletters/'}
                className='tx-krnblue'
              >
                <GoArrowLeft className='tx-large' /> {isUrdu ? 'پچھلے شمارے دیکھیں' : 'Explore Previous Issues'}
              </a>
            </div>
            <aside className='col-sm-12 col-md-3 mt-4 mt-md-0 d-none d-md-block'>
              {/* Floating Navigation */}
              {Array.isArray(res?.insightNewsletter?.floatingNav) && (
                <FloatingNav
                  floatingNav={sortedFloatingNav}
                  availableSections={availableSections}
                  navLabels={navLabels}
                  isUrdu={isUrdu}
                />
              )}
            </aside>
          </div>
        </div>
        <div className='mt-5'>
          <SponsorsFooter />
        </div>
      </section>
    </div>
  )
}
