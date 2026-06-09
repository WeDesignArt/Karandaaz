import { fetchAPI } from './lib'

export async function getProcurementsByPage(
  offset: number,
  pageSize: number,
  year: number,
  opportunity: string,
  program: string,
  searchText: string,
  status: string
) {
  const data = await fetchAPI(
    ` 
  query Posts($offset:Int, $size:Int, $yearVal: Int, $searchText:String!, $program: [String], $opportunity: [String], $status:[String]) {
  requestforproposals(
    where: {taxQuery: {taxArray: [{field: NAME, operator: AND, taxonomy: OPPORTUNITY, terms: $opportunity}, {field: NAME, operator: AND, taxonomy: PROGRAM, terms: $program}, {field: NAME, operator: AND, taxonomy: STATUS, terms: $status}], relation: AND}, dateQuery: {year: $yearVal}, search: $searchText, offsetPagination: {offset: $offset, size: $size}}
  ) {
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      id
      title
      date
      slug
      opportunitys {
        edges {
          node {
            id
            name
          }
        }
      }
      programs {
        edges {
          node {
            id
            name
          }
        }
      }
      statuses {
        edges {
          node {
            id
            name
          }
        }
      }
      procurementoptions {
        applicationdeadline
        closingDate
        location
        reportTo
        rfpToEoi
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
        opportunity: opportunity,
        program: program,
        searchText: searchText,
        status: status,
      },
    }
  )

  return data?.requestforproposals
}

export async function getProcurementBySlug(slug: string) {
  const data = await fetchAPI(
    ` 
  query NewQuery($id: ID!, $idType: RequestforproposalIdType!) {
  requestforproposal(id: $id, idType: $idType) {
    id
    title
    date
    slug
    content
    procurementoptions {
      applicationdeadline
      closingDate
      location
      reportTo
      rfpToEoi
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

  return data?.requestforproposal
}

export async function getOpportunitiesOptions() {
  const data = await fetchAPI(
    ` 
 query NewQuery {
  opportunitys {
    nodes {
      id
      name
    }
  }
}
  `
  )

  return data?.opportunitys?.nodes
}

export async function getProgramOptions() {
  const data = await fetchAPI(
    ` 
 query NewQuery {
  programs {
    nodes {
      id
      name
    }
  }
}
  `
  )

  return data?.programs?.nodes
}

export async function getProcurementPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        procurementmainpage {
          procurementComplaintEmail
          procurementComplaintText
          procurementHeading
          procurementContent
          procurementSubheading
          procurementCards {
            procurementCardHeading
            procurementCardSubheading
            procurementCardImage {
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
        id: 'procurementmain',
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.procurementmainpage
}

export async function getOpenProcurements(limit: number) {
  const data = await fetchAPI(
    ` 
  query Posts($limit: Int) {
  requestforproposals(
    where: {taxQuery: {taxArray: {field: NAME, operator: AND, taxonomy: STATUS, terms: "Open"}}}
    first: $limit
  ) {
    nodes {
      id
      title
      date
      slug      
      statuses {
        edges {
          node {
            id
            name
          }
        }
      }
      procurementoptions {
        applicationdeadline
        closingDate
        location
        reportTo
        rfpToEoi
      }
    }
  }
}
    `,
    {
      variables: {
        limit: limit,
      },
    }
  )

  return data?.requestforproposals
}

export async function getProcurementGeneralTermsAndConditionFeilds(slug: string, language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
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
