import { fetchAPI } from './lib'

export async function getBlogsBySearch(offset: number, pageSize: number, searchText: string) {
  const data = await fetchAPI(
    ` 
  query Posts($offset:Int, $size:Int, $searchText:String!) {
  blogs(
    where: {offsetPagination: {size: $size, offset: $offset}, search: $searchText}
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
        searchText: searchText,
      },
    }
  )

  return data?.blogs
}

export async function getPublicationsBySearch(offset: number, pageSize: number, search: string) {
  const data = await fetchAPI(
    `
      query NewQuery($id:Int, $size:Int, $searchText: String! ) {
    karandaazresearchs(where: {offsetPagination:  {offset: $id, size: $size}, search: $searchText}) {
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
      slug
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
        searchText: search,
      },
    }
  )
  return data?.karandaazresearchs
}

export async function getPressBySearch(offset: number, pageSize: number, search: string) {
  const data = await fetchAPI(
    `
      query NewQuery($id:Int, $size:Int, $searchText: String! ) {
    pressreleases(where: {offsetPagination:  {offset: $id, size: $size}, search: $searchText}) {
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
        searchText: search,
      },
    }
  )
  return data?.pressreleases
}

export async function getStoriesBySearch(offset: number, pageSize: number, searchText: string) {
  const data = await fetchAPI(
    `
   query NewQuery($id:Int, $size:Int, $searchText:String!) {
   storiess(where: {offsetPagination: {offset: $id, size: $size}, search:$searchText }) {
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
          excerpt
          slug
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
    }
  )

  return data?.storiess
}

export async function getNewslettersBySearch(offset: number, pageSize: number, searchText: string) {
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
            excerpt
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
    }
  )

  return data?.newsletters
}
