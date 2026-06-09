import { HomeCards } from './components/home/home-cards'
import CounterSection from './components/home/home-counter'
import HeroSection from './components/home/home-hero'
import { getHomePage } from './api/lib/lib'
import HomeBlogs from './components/home/home-blogs'
import HomeNewsTicker from './components/home/home-newsticker'
import SponsorsFooter from './components/navigation/sponsors-footer'
import { getDictionary } from '../../lib/dictionary'

export async function generateMetadata() {
  const res = await getHomePage() // Fetch SEO data dynamically from Yoast
  const title = `Karandaaz is driving inclusive growth & innovation through financial inclusion`
  const description = `Explore Karandaaz's initiatives. Learn how we empower businesses, expand financial services, and foster inclusive growth through strategic partnerships and innovative solutions.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',
    keywords: [
      'Karandaaz homepage',
      'Capital investment in Pakistan',
      'Digital finance initiatives',
      'Innovation funding',
      'Financial inclusion research',
      'Sustainable economic development',
    ],

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
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
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image:
        res?.seo?.ogImage || 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}
export default async function Home({ params }: any) {
  const res = await getHomePage(params.lang)
  const { mainHomePage } = await getDictionary(params.lang)
  return (
    <main className='home-page'>
      <HeroSection heading={mainHomePage.mainHeroSection} videoSrc={res?.video} />
      <HomeNewsTicker data={res.newsTicker} lang={params.lang} heading={mainHomePage.homeNewsTicker} />
      <HomeCards data={res.cardsSection} lang={params.lang} />
      <CounterSection data={res.counterSection} />
      <HomeBlogs data={res.newsSection} lang={params.lang} />
      <SponsorsFooter lang={params.lang} />
    </main>
  )
}
