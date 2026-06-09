import Head from 'next/head';

type SEOProps = {
  seoData: {
    title?: string;
    metaDesc?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterSite?: string;
    schemaJson?: string; // for handling structured data
  };
};

const SEO = ({ seoData }: SEOProps) => {
  console.log(seoData?.title);
  return (
    <Head>

      {/* Basic meta tags */}
      <title>{seoData?.title || 'Default Title'}</title>
      <meta name="description" content={seoData?.metaDesc || 'Default description'} />

      {/* OpenGraph tags */}
      {seoData?.ogTitle && <meta property="og:title" content={seoData.ogTitle} />}
      {seoData?.ogDescription && <meta property="og:description" content={seoData.ogDescription} />}
      {seoData?.ogUrl && <meta property="og:url" content={seoData.ogUrl} />}
      {seoData?.ogImage && <meta property="og:image" content={seoData.ogImage} />}

      {/* Twitter tags */}
      {seoData?.twitterCard && <meta name="twitter:card" content={seoData.twitterCard} />}
      {seoData?.twitterSite && <meta name="twitter:site" content={seoData.twitterSite} />}

      {/* Structured data (JSON-LD) */}
      {seoData?.schemaJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoData.schemaJson }} />
      )}
    </Head>
  );
};

export default SEO;