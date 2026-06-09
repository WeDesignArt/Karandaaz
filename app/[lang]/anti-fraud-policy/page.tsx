import { Breadcrumb } from '../components/navigation/breadcrumb'
import './page.css'
import { getAdditionalPagesFields } from '../api/lib/additionalPages'

export async function generateMetadata() {
  const res = await getAdditionalPagesFields('home-antifraudandcorruptionpolicy') // Fetch SEO data dynamically from Yoast

  return {
    title: res?.seo?.title || 'Default Title',
    description: res?.seo?.metaDesc || 'Default Description',
    openGraph: {
      title: res?.seo?.title || 'Default OG Title',
      description: res?.seo?.metaDesc || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/`,
      siteName: res?.seo?.ogSiteName || 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: res?.seo?.ogLocale || 'en_US',
      type: res?.seo?.ogType || 'website',
    },
    twitter: {
      card: res?.seo?.twitterCard || 'summary_large_image',
      site: res?.seo?.twitterSite || '@defaultsite',
      title: res?.seo?.title || 'Default Twitter Title',
      description: res?.seo?.metaDesc || 'Default Twitter Description',
      image:
        res?.seo?.ogImage || 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function AntiFraudAndCorruptionPolicy() {
  const res = await getAdditionalPagesFields('home-antifraudandcorruptionpolicy')
  const information = res?.information
  return (
    <>
      <section className='section-py-md pb-0 subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb />
              <h2 className='pb-2 pb-md-2'>Anti Fraud and Corruption Policy</h2>
            </div>
          </div>
        </div>
      </section>
      <section className='section-py-sm'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <div className='terms-conditions'>
                {information.map((info: any, index: string) => (
                  <div key={index}>
                    {info.heading && <h5>{info.heading}</h5>}
                    <div dangerouslySetInnerHTML={{ __html: info.content }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
