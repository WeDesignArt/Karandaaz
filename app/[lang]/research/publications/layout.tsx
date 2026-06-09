// app/publications/layout.tsx

import React from 'react'

export function generateMetadata({ params }: any) {
  const title = `Karandaaz Publications: In-depth Reports on Financial Inclusion`
  const description = `Access Karandaaz's publications for comprehensive reports and studies advancing financial inclusion efforts in Pakistan.`
  return {
    title: title || 'Default Title',
    description: description || 'Default Description',

    openGraph: {
      title: title || 'Default OG Title',
      description: description || 'Default OG Description',
      url: `${process.env.KRN_BASE_URL}/research/publications`,
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
      title: title || 'Default Twitter Title',
      description: description || 'Default Twitter Description',
      image: 'http://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/KRNwebsitethumbnail.png',
    },
  }
}
const publicationsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default publicationsLayout
