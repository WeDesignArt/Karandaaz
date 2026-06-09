import { getDigitalSubUrlField, getDigitalRelatedMedia } from '@/[lang]/api/lib/digital'
import { getFooter } from '@/[lang]/api/lib/lib'
import { PrivateSectorProvider } from './PrivateSectorProvider'

export async function generateMetadata({ params }: any) {
  const res = await getDigitalSubUrlField('digital-privatesectorengagements', params.lang)
  const title = `Private Sector Engagements for Digital and Financial Inclusion`
  const description = `Explore Karandaaz’s initiatives in partnering with commercial service providers, private firms, and FinTechs to develop innovative digital solutions. Learn about our programs.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz private sector engagements',
      'Digital financial inclusion',
      'FinTech partnerships',
      'Financial Inclusion of Women Challenge',
      'WeHub Karandaaz',
      'Digitising Cash on Delivery (DCOD)',
      'Digital Financing for Agriculture (DFA)',
      'Pilot to Scale Grants Programme',
      'Design Thinking as a Service Programme',
      'Digital Experiments with DFS Providers',
      'FinTech Disrupt Challenge Pakistan',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/digital/private-sector-engagements`,
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
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image:
        res?.seo?.ogImage || 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}
export default async function privateSectorLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
  const res = await getDigitalSubUrlField('digital-privatesectorengagements', params.lang)
  const resRelatedmedia = await getDigitalRelatedMedia('digitalrelatedmedia', params.lang)
  const footerRes = await getFooter('digitalpartners2', params.lang)
  const swiperImages = footerRes?.image?.edges
  return (
    <div>
      <PrivateSectorProvider value={{ res, swiperImages, footerRes, resRelatedmedia }}>
        {children}
      </PrivateSectorProvider>
    </div>
  )
}
