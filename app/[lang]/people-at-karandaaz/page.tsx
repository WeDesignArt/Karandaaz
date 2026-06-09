import SponsorsFooter from '../components/navigation/sponsors-footer'
import { KrnPeopleSection } from '../components/sections/krnpeople-section'
import { TopHeaderSection } from '../components/sections/top-header-section'

export async function generateMetadata() {
  return {
    title: `A Diverse Workforce Driving Karandaaz's Success`,
    description: `Discover the diverse teams at Karandaaz. Learn about their roles in driving innovation and success at Karandaaz.`,
    keywords: [
      'Karandaaz workforce diversity',
      'Chief Executive Office team',
      'Karandaaz Capital team',
      'Karandaaz Digital team',
      'Karandaaz Innovation team',
      'Research and Communications team',
      'Finance department',
      'Admin team',
      'Procurement and IT',
      'People Services team',
      'Risk and Compliance',
      'Legal team',
      'Internal Audit',
    ],

    openGraph: {
      title: `A Diverse Workforce Driving Karandaaz's Success`,
      description: `Discover the diverse teams at Karandaaz. Learn about their roles in driving innovation and success at Karandaaz.`,
      url: `${process.env.KRN_BASE_URL}/people-at-karandaaz`,
      siteName: 'Karandaaz',
      images: [
        {
          url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          secure_url: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
          width: 1200,
          height: 630,
          alt: 'Karandaaz',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@defaultsite',
      title: `A Diverse Workforce Driving Karandaaz's Success`,
      description: `Discover the diverse teams at Karandaaz. Learn about their roles in driving innovation and success at Karandaaz.`,
      image: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function PeopleAtKarandaaz({ params }: any) {
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection heading='<h2>People at Karandaaz</h2>' lang={params.lang} />
        <KrnPeopleSection />
      </section>
      <SponsorsFooter />
    </main>
  )
}
