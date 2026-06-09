import { fetchAPI } from './lib'

export async function getResearchPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
      page(id: "research", idType: URI) {
        researchpage {
          heading
          subheading
          countersSection {
            number1
            number2
            prefix1
            prefix2
          }
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
              ctatext
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
              ctatext
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
              ctatext
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
              ctatext
            } 
          }
        }
        seo {
          fullHead
          metaDesc
          title
        }
      }
    }`,
    {
      variables: {
        idType: 'URI',
      },
    },
    url
  )

  return data?.page
}

export async function getAllPublicationsCategories() {
  const data = await fetchAPI(
    `
    {
    allTopics(first:30) {
      edges {
        node {
          id
          name
          parent {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
    `
  )

  return data?.allTopics?.edges
}
export async function getPublications() {
  const data = await fetchAPI(
    ` 
    query NewQuery {
    karandaazresearchs(first:1) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        publicationsoptions {
          reportfile {
            node {
              id
              mediaItemUrl
            }
          }
        }
        slug
        date
      }
    }
  }
    `
  )

  return data?.karandaazresearchs?.nodes
}

export async function getPublicationsByPage(
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
      karandaazresearchs(where: {offsetPagination:  {offset: $id, size: $size},dateQuery: {year: $yearVal}, search: $searchText, taxQuery: {taxArray: {taxonomy: TOPICS, field: NAME, operator: NOT_IN, terms: $topic}}}) {
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
        date
        slug
        publicationsoptions {
          reportfile {
            node {
              id
              mediaItemUrl
            }
          }
        }
        topics {
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
          id: offset,
          size: pageSize,
          yearVal: year,
          searchText: search,
          topic: topic,
        },
      }
    )
    return data?.karandaazresearchs
  } else {
    let data = await fetchAPI(
      `
       query NewQuery($id:Int, $size:Int, $yearVal: Int, $topic: [String], $searchText: String! ) {
      karandaazresearchs(where: {offsetPagination:  {offset: $id, size: $size},dateQuery: {year: $yearVal}, search: $searchText, taxQuery: {taxArray: {taxonomy: TOPICS, field: NAME, operator: IN, terms: $topic}}}) {
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
        date
        slug
        publicationsoptions {
          reportfile {
            node {
              id
              mediaItemUrl
            }
          }
        }
        topics {
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
          id: offset,
          size: pageSize,
          yearVal: year,
          searchText: search,
          topic: topic,
        },
      }
    )
    return data?.karandaazresearchs
  }
}

export async function getPublicationsBySlug(slug: string) {
  const data = await fetchAPI(
    ` 
    query NewQuery($id: ID!, $idType: KarandaazresearchIdType!) {
    karandaazresearch(id: $id, idType: $idType) {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
      slug
      date
      publicationsoptions {
          subheading
          reportfile {
            node {
              id
              mediaItemUrl
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
    }
  )

  return data?.karandaazresearch
}

// Blogs

export async function getAllBlogsCategories() {
  const data = await fetchAPI(
    `
  query NewQuery {
      categories(first:30) {
        edges {
          node {
            name
            parent {
              node {
                name
              }
            }
          }
        }
      }
  }
    `
  )

  return data?.categories?.edges
}

export async function getBlogs(number: number) {
  const data = await fetchAPI(
    ` 
    query NewQuery($number: Int) {
    blogs(first:$number) {
      nodes {
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        date
        author {
          node {
            id
            name
          }
        }
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

  return data?.blogs?.nodes
}

export async function getBlogsByPage(
  offset: number,
  pageSize: number,
  year: number,
  topic: string,
  searchText: string
) {
  const data = await fetchAPI(
    ` 
    query Posts($offset:Int, $size:Int, $yearVal: Int, $topic:String!, $searchText:String!) {
    blogs(
      where: {offsetPagination: {size: $size, offset: $offset}, dateQuery: {year: $yearVal}, search: $searchText, categoryName: $topic}
    ) {
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
        author {
          node {
            id
            name
          }
        }
        slug
        categories {
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
        offset: offset,
        size: pageSize,
        yearVal: year,
        searchText: searchText,
        topic: topic,
      },
    }
  )

  return data?.blogs
}

export async function getBlogsBySlug(slug: string) {
  const data = await fetchAPI(
    ` 
   query NewQuery($id: ID!, $idType: BlogIdType!) {
   blog(id: $id, idType: $idType) {
    id
    title
    date
    content
    featuredImage {
      node {
        id
        sourceUrl
      }
    }
    author {
      node {
        name
      }
    }
    blogpost {
        citations {
          allCitations 
        }
        summary
        authorcustom {
        nodes {
          name
        }
      }
        magazinefeature {
          article {
            description
            heading
          }
        }
      }
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

  return data?.blog
}
