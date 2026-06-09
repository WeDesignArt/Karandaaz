import { fetchAPI } from './lib'

export async function getNewsAndMediaPageFields() {
  const data = await fetchAPI(
    ` 
  query NewQuery {
  page(id: "newsandmedia", idType: URI) {
    newsandmediapage {
      formheading
      heading
      marqueeimages {
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
        id: 'slug',
        idType: 'SLUG',
      },
    }
  )

  return data?.page?.newsandmediapage
}

export async function getNewsletters(number: number, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    ` 
  query NewQuery($number: Int) {
  newsletters(first: $number) {
    edges {
      node {
        title
        slug
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        insightNewsletter {
          downloadPublication
          uploadThePublication {
            node {
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
        id: 'slug',
        idType: 'SLUG',
        number: number,
      },
    },
    url
  )

  return data?.newsletters?.edges
}

// Search for year - year is newsletter year & not publication date
export async function getNewslettersByPage(offset: number, pageSize: number, searchText: string, lang = 'en') {
  const url = lang === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `
query NewQuery($id:Int, $size:Int, $searchText: String!) {
  newsletters(where: {offsetPagination: {offset: $id, size: $size},  search: $searchText}) {
    pageInfo {
        offsetPagination {
            hasMore
            hasPrevious
            total
        	}
        }
        nodes {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          	insightNewsletter {
              downloadPublication
              uploadThePublication {
              node {
                mediaItemUrl
              }
          	}
          }
      	}
    }
  }    
`,
    {
      variables: {
        id: offset,
        size: pageSize,
        searchText: searchText,
      },
    },
    url
  )

  return data?.newsletters
}

export async function getPressReleases(number: number) {
  const data = await fetchAPI(
    ` 
  query NewQuery($number: Int) {
  pressreleases(first:$number) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        excerpt
        date
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

  return data?.pressreleases?.nodes
}

export async function getPressReleaseBySlug(slug: string) {
  const data = await fetchAPI(
    ` 
  query NewQuery($id: ID!, $idType: PressreleaseIdType!) {
  pressrelease(id: $id, idType: $idType) {
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
    author {
      node {
        id
        username
        name
      }
    }
    date
    content
    slug
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

  return data?.pressrelease
}
export async function getPressByPage(
  offset: number,
  pageSize: number,
  year: number,
  topic: string,
  search: string,
  topicOperator: any
) {
  let data: any = ''
  if (topicOperator == 'EXISTS') {
    data = await fetchAPI(
      `
      query NewQuery($id:Int, $size:Int, $yearVal: Int, $topic: [String], $searchText: String! ) {
    pressreleases(where: {offsetPagination:  {offset: $id, size: $size},dateQuery: {year: $yearVal}, search: $searchText, taxQuery: {taxArray: {taxonomy: CATEGORY_NE, field: NAME, operator: EXISTS, terms: $topic}}}) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        excerpt
        date
        categoryNes {
          edges {
            node {
              id
              name
            }
          }
        }
        slug
      }
    }
  }    
  `,
      {
        variables: {
          id: offset,
          size: pageSize,
          yearVal: year,
          searchText: search,
          topic: topic,
        },
      }
    )
    return data?.pressreleases
  } else {
    let data = await fetchAPI(
      `
      query NewQuery($id:Int, $size:Int, $yearVal: Int, $topic: [String], $searchText: String! ) {
    pressreleases(where: {offsetPagination:  {offset: $id, size: $size},dateQuery: {year: $yearVal}, search: $searchText, taxQuery: {taxArray: {taxonomy: CATEGORY_NE, field: NAME, operator: IN, terms: $topic}}}) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categoryNes {
          edges {
            node {
              id
              name
            }
          }
        }
        slug
      }
    }
  }    
  `,
      {
        variables: {
          id: offset,
          size: pageSize,
          yearVal: year,
          searchText: search,
          topic: topic,
        },
      }
    )
    return data?.pressreleases
  }
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

export async function getStoryBySlug(slug: string) {
  const data = await fetchAPI(
    ` 
  query NewQuery($id: ID!, $idType: StoryIdType!) {
  story(id: $id, idType: $idType) {
    id
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
    date
    content
    slug
    stories {
      videoLink
    }
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

  return data?.story
}

export async function getStoryByPage(offset: number, pageSize: number, year: number, searchText: string) {
  const data = await fetchAPI(
    `
   query NewQuery($id:Int, $size:Int, $yearVal: Int, $searchText:String!) {
   storiess(where: {offsetPagination: {offset: $id, size: $size}, dateQuery: {year: $yearVal}, search:$searchText }) {
        pageInfo {
            offsetPagination {
                hasMore
                hasPrevious
                total
            }
        }
        nodes {
          content
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          slug
        }
    }
}  
  `,
    {
      variables: {
        id: offset,
        size: pageSize,
        yearVal: year,
        searchText: searchText,
      },
    }
  )

  return data?.storiess
}

export async function getMedia(offset: number, pageSize: number) {
  const data = await fetchAPI(
    `
   query NewQuery($id:Int, $size:Int) {
   inmedias(where: {offsetPagination: {offset: $id, size: $size} }) {
        pageInfo {
            offsetPagination {
                hasMore
                hasPrevious
                total
            }
        }
        nodes {
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          slug
        }
    }
}  
  `,
    {
      variables: {
        id: offset,
        size: pageSize,
      },
    }
  )

  return data?.inmedias
}

export async function getMediaByPage(offset: number, pageSize: number, lang = 'en') {
  const url = lang === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `
   query NewQuery($id:Int, $size:Int) {
   inmedias(where: {offsetPagination: {offset: $id, size: $size} }) {
        pageInfo {
            offsetPagination {
                hasMore
                hasPrevious
                total
            }
        }
        nodes {
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          slug
        }
    }
}  
  `,
    {
      variables: {
        id: offset,
        size: pageSize,
      },
    },
    url
  )

  return data?.inmedias
}

export async function getNewslettersByYear(year: number) {
  const data = await fetchAPI(
    `
   query NewQuery($year:Int) {
  newsletters(where: {search: $year}) {
    edges {
      node {
        id
      }
    }
  }
}
  `,
    {
      variables: {
        year: year,
      },
    }
  )

  return data
}

export async function getNewsletterBySlug(slug: string, lang = 'en') {
  const url = lang === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const lifeAtKarandaazFragment = lang !== 'ur' ? `
        ... on InsightNewsletterNewsletterSectionsLifeAtKarandaazLayout {
          fieldGroupName
          bannerImage {
            node {
              mediaItemUrl
            }
          }
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              quote
              name
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adImage {
                node {
                  mediaItemUrl
                }
              }
              adHyperlink {
                url
                title
                target
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }` : ''
  const data = await fetchAPI(
    `
query NewQuery($id: ID!, $idType: NewsletterIdType!) {
  newsletter(id: $id, idType: $idType) {
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
    date
    content
    slug
    insightNewsletter {
      downloadPublication
      uploadThePublication {
        node {
          mediaItemUrl
        }
      }
      bannerImage {
        node {
          mediaItemUrl
        }
      }
      floatingNav
      newsletterSections {
        ... on InsightNewsletterNewsletterSectionsCeoMessageLayout {
          designation
          fieldGroupName
          message
          name
          heading {
            node {
              mediaItemUrl
            }
          }
          picture {
            node {
              mediaItemUrl
            }
          }
        }
        fieldGroupName
        ... on InsightNewsletterNewsletterSectionsNewsFlashLayout {
          fieldGroupName
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              imageSize
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              name
              quote
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adHyperlink {
                url
                title
                target
              }
              adImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }
        ... on InsightNewsletterNewsletterSectionsKnowOurPartnersLayout {
          fieldGroupName
          contentElements {
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              name
              quote
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adHyperlink {
                target
                title
                url
              }
              adImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
          bannerImage {
            node {
              mediaItemUrl
            }
          }
        }
        ... on InsightNewsletterNewsletterSectionsSuccessStoriesLayout {
          fieldGroupName
          bannerImage {
            node {
              mediaItemUrl
            }
          }
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              name
              quote
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adHyperlink {
                url
                title
                target
              }
              adImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }
        ... on InsightNewsletterNewsletterSectionsKarandaazEventsLayout {
          fieldGroupName
          bannerImage {
            node {
              mediaItemUrl
            }
          }
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              name
              quote
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adHyperlink {
                url
                title
                target
              }
              adImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }
        ... on InsightNewsletterNewsletterSectionsKarandaazPublicationsLayout {
          fieldGroupName
          bannerImage {
            node {
              mediaItemUrl
            }
          }
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              name
              quote
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adHyperlink {
                url
                title
                target
              }
              adImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }
        ... on InsightNewsletterNewsletterSectionsKarandaazBlogsLayout {
          fieldGroupName
          bannerImage {
            node {
              mediaItemUrl
            }
          }
          contentElements {
            fieldGroupName
            ... on InsightNewsletterNewsletterSectionsContentElementsHeadingLayout {
              fieldGroupName
              headingText
              headingType
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsPictureLayout {
              fieldGroupName
              image {
                node {
                  mediaItemUrl
                }
              }
              imageSize
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsBlockquoteLayout {
              designation
              fieldGroupName
              quote
              name
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsParagraphLayout {
              content
              fieldGroupName
            }
            ... on InsightNewsletterNewsletterSectionsContentElementsAdBlockLayout {
              fieldGroupName
              adImage {
                node {
                  mediaItemUrl
                }
              }
              adHyperlink {
                url
                title
                target
              }
            }
          }
          heading {
            node {
              mediaItemUrl
            }
          }
        }
        ${lifeAtKarandaazFragment}
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

  return data?.newsletter
}

export async function getAllPressCategories() {
  const data = await fetchAPI(
    `
   query NewQuery {
  categoryNes {
    edges {
      node {
        id
        name
      }
    }
  }
}
  `
  )

  return data?.categoryNes?.edges
}
