import { fetchAPI } from './lib'

export async function getCapitalPageFields(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query GetCapitalPageFields {
  page(id: "capital-2", idType: URI) {
    id
    seo {
      fullHead
      metaDesc
      title
    }
    capitalpage {
      heading
      subheading
      countersSection {
        prefix1
        prefix2
        prefix3
        prefix4
        number1
        number2
        number3
        number4
        suffix1
        suffix2
        suffix3
        suffix4
        description
      }
      investmentSection {
        navitem1 {
          navlabel
          description
          title
          image {
            node {
              id
              sourceUrl
            }
          }
          nextPagePath
        }
        navitem2 {
          navlabel
          description
          title
          image {
            node {
              id
              sourceUrl
            }
          }
          nextPagePath  
        }
        navItem3 {
          navlabel
          description
          title
          image {
            node {
              id
              sourceUrl
            }
          }
          nextPagePath
        }
        navItem4 {
          navlabel
          description
          title
          image {
            node {
              id
              sourceUrl
            }
          }
          nextPagePath
        }
      }
      entities {
        sectionTitle
        cards {
          card1 {
          heading1
          heading2
          heading3
          mainHeading
          value1
          value2
          value3
        }
        card2 {
          heading1
          heading2
          heading3
          mainHeading
          value1
          value2
          value3
        }
        card3 {
          heading1
          heading2
          heading3
          mainHeading
          value1
          value2
          value3
        }
        }
      }
    }
  }
}
  `,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.capitalpage
}

// Capital suburls

export async function getCapitalDirectInvestment(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
  page(id: "capital-directinvestment", idType: URI) {
    seo {
      fullHead
      metaDesc
      title
    }
    capitaldirectinvestmentpage {
      heading
      subheading
      investmentSection {
        navitem1 {
          navlabel
          title
          section {
            description
            subheading
          }
        }
        navitem2 {
          navlabel
          title
        }
        navitem3 {
          navlabel
          title
        }
      }
    }
  }
}
  `,
    {
      variables: {
        id: 'slug',
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.capitaldirectinvestmentpage
}

export async function getCapitalInvestWithUs() {
  const data = await fetchAPI(
    `query NewQuery {
  page(id: "capital-investwithus", idType: URI) {
    capitalinvestwithuspage {
      heading
      subheading
      card {
        description
        title
        image {
          node {
            id
            sourceUrl
          }
        }
      }
    }
  }
}
  `,
    {
      variables: {
        id: 'slug',
        idType: 'URI',
      },
    }
  )

  return data?.page?.capitalinvestwithuspage
}

export async function getWholesaleInvestment(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          id
          capitalwholesaleinvestmentpage {
            heading
            subheading
            investmentSection {
                portfolioNavItem {
                  title
              }
            }
          }
        }
      }`,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.capitalwholesaleinvestmentpage
}

export async function getStrategicInvestment(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          id
          capitalstrategicinvestmentpage {
            heading
            subheading
            investmentSection {
              portfolioNavItem {
                title
              }
            }
          }
        }
      }`,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.capitalstrategicinvestmentpage
}

export async function getGreenInvestment(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          id
          seo {
            fullHead
            metaDesc
            title
          }
          capitalgreeninvestment {
            heading
            subheading
            investmentSection {
              greenApplicationNavItem {
                title
              }
              portfolioNavItem {
                title
              }
            }
          }
        }
      }`,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.capitalgreeninvestment
}

// Capital
// Portfolios
export async function getCapitalPortfolios(limit: number, type: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `
  query NewQuery($limit: Int, $type: [String]) {
  karandaazcapitals(
    where: {taxQuery: {taxArray: {field: NAME, operator: IN, taxonomy: KCTYPE, terms: $type}}}
    first: $limit
  ) {
    nodes {
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      title
      content
      slug
      excerpt
      kctypes {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
  `,
    {
      variables: {
        limit: limit,
        type: type,
      },
    },
    url
  )
  return data?.karandaazcapitals
}

export async function getAPortfolio(slug: string) {
  const data = await fetchAPI(
    `
  query NewQuery($id: ID!) {
  karandaazcapital(id: $id, idType: SLUG) {
    id
    title
    featuredImage {
      node {
        id
        sourceUrl
      }
    }
    content
  }
  
}

  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  )

  return data?.karandaazcapital
}
