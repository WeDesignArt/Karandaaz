// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// if (!URL.canParse(process.env.NEXT_PUBLIC_WORDPRESS_API_URL)) {
//     throw new Error(`
//     Please provide a valid WordPress instance URL.
//     Add to your environment variables WORDPRESS_API_URL.
//   `);
// }

if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL || !process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL) {
  throw new Error(`
    Please provide valid WordPress instance URLs.
    Add to your environment variables NEXT_PUBLIC_WORDPRESS_API_URL and NEXT_PUBLIC_WORDPRESS_UR_API_URL.
  `)
}

const { protocol, hostname, port, pathname } = new URL(process.env.NEXT_PUBLIC_WORDPRESS_API_URL)

const cspHeader = `default-src 'self';  https://krndevelop.wpenginepowered.com`

/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(); microphone=(); battery=(self); geolocation=();',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: 'default' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/about/about-karandaaz',
        destination: '/about-karandaaz',
        permanent: true,
      },
      {
        source: '/about/board-committees',
        destination: '/board-and-visionaries',
        permanent: true,
      },
      {
        source: '/about/board-committees/board-of-directors',
        destination: '/board-and-visionaries',
        permanent: true,
      },
      {
        source: '/about/people-at-karandaaz',
        destination: '/people-at-karandaaz',
        permanent: true,
      },
      {
        source: '/work-with-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital/direct-investments',
        destination: '/capital/direct-investments',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital/wholesale-investment',
        destination: '/capital/wholesale-investments',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital/strategic-investments',
        destination: '/capital/strategic-investments',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital/green-investments',
        destination: '/capital/green-investments',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/digital-public-infrastructure',
        destination: '/digital/digital-public-infrastructure',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/public-sector-engagements',
        destination: '/digital/public-sector-engagements',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/public-sector-engagements',
        destination: '/digital/public-sector-engagements',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/research-data-analytics',
        destination: '/digital/research-and-data-analysis',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/policy-and-regulation',
        destination: '/digital/policy-regulation',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-innovation/innovation-challenge-fund',
        destination: '/innovation-investments/innovation-challenge-fund',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-innovation/women-entreprenuership-challenge',
        destination: '/innovation-investments/women-ventures',
        permanent: true,
      },

      // Blog redirects
      {
        source: '/blog',
        destination: '/research/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/research/blogs/:slug',
        permanent: true,
      },

      // Publication
      {
        source: '/karandaaz_publication',
        destination: '/research/publications',
        permanent: true,
      },
      {
        source: '/karandaaz_publications',
        destination: '/research/publications',
        permanent: true,
      },
      {
        source: '/karandaaz_publications/page/:slug',
        destination: '/research/publications',
        permanent: true,
      },
      {
        source: '/news-media/karandaaz-press-releases',
        destination: '/news-and-media/press-releases',
        permanent: true,
      },
      {
        source: '/news-media/karandaaz-press-releases/:slug',
        destination: '/news-and-media/press-releases',
        permanent: true,
      },
      {
        source: '/media-center/news-events/:slug',
        destination: '/news-and-media/press-releases/:slug',
        permanent: true,
      },
      {
        source: '/news-media/newsletters',
        destination: '/news-and-media/newsletters',
        permanent: true,
      },
      {
        source: '/stories/',
        destination: '/news-and-media/karandaaz-stories',
        permanent: true,
      },
      {
        source: '/stories/:slug',
        destination: '/news-and-media/karandaaz-stories/:slug',
        permanent: true,
      },
      {
        source: '/media-enquire',
        destination: '/news-and-media#mediaform',
        permanent: true,
      },
      {
        source: '/about/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/karandaaz-research',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/karandaaz-research/:slug',
        destination: '/research/publications/:slug',
        permanent: true,
      },
      {
        source: '/news-media',
        destination: '/news-and-media',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-innovation',
        destination: '/innovation-investments',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital',
        destination: '/capital',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-capital',
        destination: '/capital',
        permanent: true,
      },
      {
        source: '/karandaaz-capital',
        destination: '/capital',
        permanent: true,
      },
      {
        source: '/karandaaz-capital/infrazamin-pakistan',
        destination: '/capital',
        permanent: true,
      },
      {
        source: '/karandaaz-capital/page/:slug',
        destination: '/capital',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital',
        destination: '/digital',
        permanent: true,
      },
      {
        source: '/policies',
        destination: '/anti-fraud-policy',
        permanent: true,
      },
      {
        source: '/about/financials',
        destination: '/annual-reports',
        permanent: true,
      },
      {
        source: '/about/financials',
        destination: '/annual-reports',
        permanent: true,
      },
      {
        source: '/auditor-legal-advisor',
        destination: '/auditor-and-legal',
        permanent: true,
      },
      {
        source: '/procurement/opportunities/:slug',
        destination: '/procurement/open/:slug',
        permanent: true,
      },
      {
        source: '/work-for-us',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/work-for-us/:slug',
        destination: '/careers/open-positions/:slug',
        permanent: true,
      },
      {
        source: '/policies',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/capital/wholesale-investments/usd-40-million-risk-participation-facility-orix-leasing-pakistan',
        destination:
          '/capital/wholesale-investments/risk-participation-facility-with-olp-financial-services-pakistan-limited',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/private-sector-engagements/digital-financing-agriculture',
        destination: '/digital/private-sector-engagements/challenge-rounds/dfa',
        permanent: true,
      },
      {
        source: '/our-programs/karandaaz-digital/private-sector-engagements/digitizing-cash-on-delivery',
        destination: '/digital/private-sector-engagements/challenge-rounds/dcod',
        permanent: true,
      },
      {
        source: '/digital/private-sector-engagements/challenge-rounds/dfac',
        destination: '/digital/private-sector-engagements/challenge-rounds/dfa',
        permanent: true,
      },
      {
        source: '/forms/utility-bills-qr-payments',
        destination: 'https://forms.gle/MKy67MoqKgwbkucE7',
        permanent: true,
      },
    ]
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: 'http',
        hostname: '0.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'krndevelop.wpenginepowered.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'krnur.wpenginepowered.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8888',
        pathname: '/karandaaz/wp-content/uploads/**',
      },
      {
        protocol: protocol.replace(':', ''),
        hostname,
        port: port || '',
        pathname: pathname === '/' ? '/**' : `${pathname}/**`,
      },
    ],
  },
}
