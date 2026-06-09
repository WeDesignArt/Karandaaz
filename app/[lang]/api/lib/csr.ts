import { fetchAPI } from './lib'

export async function getCsrPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  try {
    const data = await fetchAPI(
      `query NewQuery {
        page(id: "csr-and-outreach", idType: URI) {
          csrpage {
            headersection {
              heading
              subheading
              buttontext
            }
            marqueeimages {
              edges {
                node {
                  id
                  sourceUrl
                }
              }
            }
            alumsection {
              title
              description
            }
            directionalSection {
              title
              description
              buttontitle
              buttonLinkSlug
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            faqs {
              heading
              content
            }
          }
        }
      }`,
      {
        variables: {
          id: 'slug',
          idType: 'URI',
        },
      },
      url
    )
    return data?.page?.csrpage
  } catch (error) {
    console.error('getCsrPageFields error:', error)
    return null
  }
}
