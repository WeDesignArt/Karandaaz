import { BootstrapClient } from './components/bootstrap-client'
import { FixedHeader } from './components/navigation/fixed-header'
import { Footer } from './components/navigation/footer'
import { NavHeader } from './components/navigation/nav-header'
import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { Locale, i18n } from '../../i18n.config'
import Script from 'next/script' // Import the Script component
import { GA_TRACKING_ID } from '../../lib/gtag'

import './globals.scss'
import './globals.css'
import { getDictionary } from '../../lib/dictionary'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Karandaaz Pakistan',
  description: 'Non-Profit Company Promoting Access to Finance for SMEs',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) {
  const { navigation, footer } = await getDictionary(params.lang)
  const dir = i18n.defaultLocale === params.lang ? 'ltr' : 'rtl'

  return (
    <html lang={params.lang} dir={dir}>
      <body>
        {/* Google Analytics Script */}
        {/* <Script id='google-analytics' strategy='afterInteractive'>
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-67183624-1', 'auto');
            ga('send', 'pageview');
          `}
        </Script> */}
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} // Replace with your GA4 ID
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}'); // Replace with your GA4 Measurement ID
          `,
          }}
        />
        <BootstrapClient />
        <GoogleAnalytics />
        <FixedHeader />
        <NavHeader trans={navigation} lang={params.lang} />

        {/* For pagination */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '08628b',
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>

        <Footer trans={footer} lang={params.lang} />
      </body>
    </html>
  )
}
