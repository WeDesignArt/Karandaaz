import { fetchAPI } from './lib'

// Portfolios
export async function getDigitalPortfolios(limit: number, type: string) {
  const data = await fetchAPI(
    `
   query NewQuery($limit: Int, $type: [String]) {
  karandaazdigitals(
    where: {taxQuery: {taxArray: {field: NAME, operator: IN, taxonomy: KDTYPE, terms: $type}}}
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
      kdtypes {
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
    }
  )
  return data?.karandaazdigitals
}

export async function getADigitalPortfolio(slug: string) {
  const data = await fetchAPI(
    `
    query NewQuery($id: ID!) {
    karandaazdigital(id: $id, idType: SLUG) {
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

  return data?.karandaazdigital
}

export async function getDigitalPageFields(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query GetDigitalPageFields($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
      id
      digitalpage {
        heading
        subheading
        btntitle
        countersSection {
          number1
          number2
          number3
          number4
          number5
          prefix1
          prefix2
          prefix3
          prefix4
          prefix5
          suffix1
          suffix2
          suffix3
          suffix4
          suffix5
        }
        title
        digitalSection {
          navItem1 {
            navlabel
            description
            title
            image {
              node {
                id
                sourceUrl
              }
            }
            nextPath
          }
          navItem2 {
            navlabel
            description
            title
            image {
              node {
                id
                sourceUrl
              }
            }
            nextPath
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
            nextPath
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
            nextPath
          }
          navItem5 {
            navlabel
            description
            title
            image {
              node {
                id
                sourceUrl
              }
            }
            nextPath
          }
          navItem6 {
            navlabel
            description
            title
            image {
              node {
                id
                sourceUrl
              }
            }
            nextPath
          }
          navItem7 {
            navlabel
            description
            title
            image {
              node {
                id
                sourceUrl
              }
            }
            nextPath
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

  return data?.page?.digitalpage
}

export async function getStories(number: number) {
  const data = await fetchAPI(
    ` 
  query NewQuery($number:Int) {
  storiess(first:$number) {
    nodes {
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      slug
    }
  }
}
  `,
    {
      variables: {
        number: number,
      },
    }
  )

  return data?.storiess?.nodes
}

export async function getDigitalResearchPageFields(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query GetDigitalResearchPageFields {
    page(id: "digital-research", idType: URI) {
      digitalresearchpage{
        heading
        subheading
        cardSection {
          initiative {
            description
            heading
            buttonText
            image {
              node {
                id
                sourceUrl
              }
            }
            buttonlink {
              node {
                id
                mediaItemUrl
              }
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

  return data?.page?.digitalresearchpage
}

export async function getDigitalSubUrlField(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
      digitalsuburlpagesfield {
      heading
      subheading
      btntitle
      termSheet {
        node {
          mediaItemUrl
        }
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
      information
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

  return data?.page?.digitalsuburlpagesfield
}

// export async function getDigitalExtraSection(slug: string, language = 'en') {
//   const data = await fetchAPI(
//     `query Page($id: ID!, $idType: PageIdType!) {
//       page(id: $id, idType: $idType) {
//         matchingGrants {
//           headingnew
//           description
//       }
//     }
//   }`,
//     {
//       variables: {
//         id: slug,
//         idType: 'URI',
//       },
//     }
//   )

//   return data?.page?.matchingGrants
// }

export async function getDigitalRelatedMedia(slug: string, language = 'en') {
  // const url =
  //   language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
      digitalrelatedmedia {
        relatedMedia {
          heading
          relatedPosts{
            title
            link
            thumbnail{
              node{
                mediaItemUrl
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
    }
    // url
  )
  return data?.page?.digitalrelatedmedia
}

export async function getRaastRelatedMedia(slug: string, language = 'en') {
  // const url =
  //   language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
      raastrelatedmedia {
        relatedMedia {
          heading
          relatedPosts{
            title
            link
            thumbnail{
              node{
                mediaItemUrl
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
    }
    // url
  )
  return data?.page?.raastrelatedmedia
}

export async function getChallangeRoundSubUrlField(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        challengeRoundsInner {
          contentBoxSection {
            heading
            subHeading
            contentBox {
              content
            }
          }
          contentCardSection {
            boxSection
            buttonTitle
            buttonLink
            card1 {
              leftPart
              rightPart
            }
            card2 {
              leftPart
              rightPart
            }
            image {
              node {
                mediaItemUrl
              }
            }
          }
          pageBanner {
            desktopBanner {
              node {
                mediaItemUrl
              }
            }
            mobileBanner {
              node {
                mediaItemUrl
              }
            }
            videoBanner
          }
          thematicAreas {
            heading
            subHeading
            cardSection {
              cardHeading
              cardImage {
                node {
                  mediaItemUrl
                }
              }
              cardSubheading
            }
          }
          kayDatesSection {
            heading
            noteText
            buttonText
            deadlineText
            termSheet {
              node {
                mediaItemUrl
              }
            }
            keyCards {
              date
              description
              month
            }
          }
          videoSection {
            heading
            videoEditor
            description
          }
          faqsSection {
            heading
            faqs {
              title
              content
            }
          }
          highlights {
            card1 {
              title
              description
              image {
                node {
                  mediaItemUrl
                }
              }
              link {
                url
              }
            }
            description
            title
            card2 {
              description
              title
              link {
                url
              }
              image {
                node {
                  mediaItemUrl
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

  return data?.page?.challengeRoundsInner
}

export async function getDigitalPolicyRegulation(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
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
    }`,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.singlecardpage
}

export async function getDigitalDiscoveryChall(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
  page(id: "digital-research-discoverychallenge", idType: URI) {
    digitaldiscoverychallenge {
      heading
      subheading
      thematicSection {
        heading
        subheading
        thematicCard {
          heading
          subheading
        }
      }
      applySection {
        heading
        subheading
        imageOne {
          node {
            sourceUrl
          }
        }
        imageTwo {
          node {
            sourceUrl
          }
        }
        openDate
        closeDate
      }
      faqsSection {
        heading
        subheading
        questionSection {
          question
          answer
        }
      }
    }
  }
}`,
    {},
    url
  )

  return data?.page?.digitaldiscoverychallenge
}

export async function getWomenEconomicDigitalInclusionInitiative(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
        page(id: "digital-womeneconomicdigitalinclusioninitiative", idType: URI) {
          digitalwomeneconomicdigitalinclusioninitiative {
            headingSection
            subheadingSection
            countersSection{
              prefix1
              prefix2
              prefix3
              number1
              number2
              number3
              suffix1
              suffix2
              suffix3
            }
            winnersSpotlight {
              navItem1 {
                navlabel
                directionalSection {
                  title
                  description
                  image {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
              navItem2 {
                navlabel
                directionalSection {
                  title
                  description
                  image {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
              navItem3 {
                navlabel
                directionalSection {
                  title
                  description
                  image {
                    node {
                      mediaItemUrl
                    }
                  }
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

  return data?.page?.digitalwomeneconomicdigitalinclusioninitiative
}
