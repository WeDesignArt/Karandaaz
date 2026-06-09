import { fetchAPI } from './lib'

export async function getInnovationPageFields(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query GetInnovationPageFields {
    page(id: "innovation", idType: URI) {
      innovationpage {
        heading
        subheading
        fundsSection {
          navitem1 {
            navlabel
            sections {
              section1 {
                description
                title
                nextPath
                image {
                  node {
                    id
                    sourceUrl
                  }
                }
              }
            }
          }
          navitem2 {
            navlabel
            sections {
              section1 {
                description
                title
                nextPath
                image {
                  node {
                    id
                    sourceUrl
                  }
                }
              }
            }
          }
          navitem3 {
            navlabel
            sections {
              section1 {
                description
                title
                nextPath
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
        footerHeading
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

  return data?.page?.innovationpage
}

export async function getInnovationChallengePageFields(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query GetInnovationChallengePageFields {
    page(id: "innovation-challengefund", idType: URI) {
      innovationchallengefundpage {
        card1 {
          description
          heading
        }
        card2 {
          closedDate
          openDate
        }
        image1 {
          node {
            id
            sourceUrl
          }
        }
        image2 {
          node {
            id
            sourceUrl
          }
        }
        sections {
          navitem1 {
            description
            navlabel
            title
            image {
              node {
                id
                sourceUrl
              }
            }
          }
          navitem2 {
            description
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
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.innovationchallengefundpage
}

export async function getInnovationWomenVentures(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
  page(id: "innovation-womenventures", idType: URI) {
    singlecardpage {
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
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.singlecardpage
}
