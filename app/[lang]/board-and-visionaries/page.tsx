import SponsorsFooter from '../components/navigation/sponsors-footer'
import { KrnBoardSection } from '../components/sections/krnboard-section'
import { TopHeaderSection } from '../components/sections/top-header-section'

export async function generateMetadata() {
  return {
    title: `Leadership that Drives Purpose: Karandaaz Advisory Bodies`,
    description: `Explore Karandaaz's advisory bodies and learn about their roles in guiding strategic decisions and fostering purpose-driven leadership.`,
    keywords: [
      'Karandaaz leadership',
      'Advisory bodies',
      'Board of Directors',
      'DFS Advisory Committee',
      'Investment Committee',
      'Audit & Risk Committee',
      'HR & Nominations Committee',
    ],

    openGraph: {
      title: `Leadership that Drives Purpose: Karandaaz Advisory Bodies`,
      description: `Explore Karandaaz's advisory bodies and learn about their roles in guiding strategic decisions and fostering purpose-driven leadership.`,
      url: `${process.env.KRN_BASE_URL}/board-and-visionaries`,
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
      title: `Leadership that Drives Purpose: Karandaaz Advisory Bodies`,
      description: `Explore Karandaaz's advisory bodies and learn about their roles in guiding strategic decisions and fostering purpose-driven leadership.`,
      image: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}

export default async function BoardVisionaries({ params }: any) {
  const isUrdu = params.lang === 'ur'
  return (
    <main>
      <section className='section-py-md'>
        <TopHeaderSection
          heading={isUrdu ? '<h2>بورڈ اور مشیران سے ملیں</h2>' : '<h2>Meet the board and advisers</h2>'}
          lang={params.lang}
        />
        <div className='container mt-5' dir='ltr'>
          <div className='row'>
            <div className='col-md-12'>
              <KrnBoardSection />
            </div>
          </div>
        </div>
      </section>
      <SponsorsFooter />
    </main>
  )
}
