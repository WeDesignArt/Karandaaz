import { fetchAPI } from './lib'

export async function getContactFeilds(slug: string, language = 'ur') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          contactpage {
            address
            cardsHeading
            email
            heading
            phoneNumber
            engagementCards {
                subheading
                cardOne {
                heading
                paragraph
                image {
                    node {
                        sourceUrl
                    }
                }
                }
                cardTwo {
                heading
                paragraph
                image {
                    node {
                        sourceUrl
                    }
                }
                }
            }
            investmentCards {
                subheading
                cardOne {
                heading
                paragraph
                image {
                    node {
                        sourceUrl
                    }
                }
                }
                cardTwo {
                heading
                paragraph
                image {
                    node {
                        sourceUrl
                    }
                }
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

  return data?.page?.contactpage
}
