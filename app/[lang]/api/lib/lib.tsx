export async function fetchAPI(
  query = '',
  { variables }: Record<string, any> = {},
  url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
) {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 60,
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getHomePage(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  const data = await fetchAPI(
    `
  query NewQuery {
  page(id: "home", idType: URI) {
    id
    seo {
      fullHead
      metaDesc
      title
    }
    homepage {
      video
      newsTicker {
        news
        readMoreUrl
        readMoreText
      }
      cardsSection {
        content
        title
        cards1 {
          content
          links
          title
          image {
            node {
              id
              sourceUrl
            }
          }
        }
        cards2 {
          content
          links
          title
          image {
            node {
              id
              sourceUrl
            }
          }
        }
        cards3 {
          content
          links
          title
          image {
            node {
              id
              sourceUrl
            }
          }
        }
        cards4 {
          content
          links
          title
          image {
            node {
              id
              sourceUrl
            }
          }
        }
      }
      
      counterSection {
        notes
        title
        counters {
          counter1 {
            description
            number
            prefix
          }
          counter2 {
            description
            number
            prefix
          }
          counter3 {
            description
            number
            prefix
          }
          counter4 {
            description
            number
            prefix
          }
          counter5 {
            description
            number
            prefix
          }
          counter6 {
            description
            number
            prefix
          }
        }
        image {
          node {
            id
            sourceUrl
          }
        }        
      }
      newsSection {
        title
      }
    }
  }
}
  `,
    {},
    url
  )
  return data?.page?.homepage
}

export async function getFooter(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query PartnersQuery($id: ID!) {
  partner(id: $id, idType: URI) {
    partners {
      title
      image {
        edges {
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
        id: slug,
        idType: 'SLUG',
      },
    },
    url
  )

  return data?.partner?.partners
}
