import { fetchAPI } from './lib'

export async function getAdditionalPagesFields(slug: string, language = 'en') {
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
          legalpages {
            information {
              content
              heading
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

  return data?.page?.legalpages
}

export async function getReports() {
  const data = await fetchAPI(
    ` 
    query NewQuery {
    reports(first:1) {
      nodes {
        id
        title
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        date
        reportsfields {
          reportfile {
            node {
              id
              mediaItemUrl
            }
          }
        }
      }
    }
  }
    `
  )

  return data?.reports?.nodes
}

export async function getReportsByPage(offset: number, pageSize: number, year: number, searchText: string) {
  const data = await fetchAPI(
    ` 
query Posts($offset:Int, $size:Int, $yearVal: Int, $searchText:String!) {
  reports(
    where: {offsetPagination: {size: $size, offset: $offset}, dateQuery: {year: $yearVal}, search: $searchText}
  ) {
    nodes {
      id
      title
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
      date
      reportsfields {
        reportfile {
          node {
            id
            mediaItemUrl
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}  `,
    {
      variables: {
        offset: offset,
        size: pageSize,
        yearVal: year,
        searchText: searchText,
      },
    }
  )

  return data?.reports
}
