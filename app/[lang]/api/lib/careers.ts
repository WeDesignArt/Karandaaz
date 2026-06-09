import { fetchAPI } from './lib'

// Careers
export async function getCareersPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query NewQuery {
    page(id: "careers", idType: URI) {
      title
      careerspage {
        headersection {
          buttontext
          heading
          subheading
        }
        marqueeimages {
          edges {
            node {
              id
              sourceUrl
            }
          }
        }
        valuessection {
          valuestopcard {
            buttontext
            description
            heading
          }
          valuessubsection {
            description
            heading
            image {
              node {
                id
                sourceUrl
              }
            }
          }
          valuesendcard {
            buttontext
            description
            heading
            image {
              node {
                sourceUrl
              }
            }
            
          }
        }
        benefitssection {
          description
          heading
          backgroundimage {
            node {
              id
              sourceUrl
            }
          }
          financialbullets {
            header
            bullets {
              bullettext
              bulletimage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
          nonfinancialbullets {
            header
            bullets {
              bullettext
              bulletimage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }
        alumsection {
          description
          title
          cards {
            description
            designation
            name
            image {
              node {
                id
                sourceUrl
              }
            }
          }
        }
        rolessection {
          cards {
            description
            heading
            image {
              node {
                id
                sourceUrl
              }
            }
          }
        }
          joinuscard {
          buttontext
          description
          heading
        }
      }
      
    }
  }
    `,
    {
      variables: {
        id: 'slug',
        idType: 'URI',
      },
    },
    url
  )

  return data?.page?.careerspage
}

export async function getJobPositions() {
  const data = await fetchAPI(
    `
    query NewQuery {
    ourpositions(first: 20) {
      edges {
        node {
          title
          jobposition {
            location
            jobTitle
            reportTo
            shiftCategory
            department
            payscale
            grade
            jobDeadline
  peopledepartment {
            edges {
              node {
                id
                taxonomyName
                slug
                name
              }
            }
          }
            }
          slug
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

  return data?.ourpositions?.edges
}

// For Pagination, offset &
export async function getJobPositionsByPage(offset: number, pageSize: number) {
  const data = await fetchAPI(
    `
    query NewQuery($offset: Int, $size: Int) {
    ourpositions(where: {offsetPagination: {offset: $offset, size: $size}}) {
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
      edges {
        node {
          title
          jobposition {
            location
            jobTitle
            reportTo
            shiftCategory
            department
            payscale
            grade
            jobDeadline
  peopledepartment {
            edges {
              node {
                id
                taxonomyName
                slug
                name
              }
            }
          }
            }
          slug
        }
      }
    }
  }
    `,
    {
      variables: {
        id: 'slug',
        idType: 'SLUG',
        offset: offset,
        size: pageSize,
      },
    }
  )

  return data?.ourpositions
}

export async function getAJobPosition(slug: string) {
  const data = await fetchAPI(
    `
    query NewQuery($id: ID!, $idType: OurpositionIdType!) {
    ourposition(id: $id, idType: $idType) {
      id
      title
      content
      jobposition {
        jobTitle
        location
        reportTo
        shiftCategory
        department
        payscale
        grade
        jobDeadline
        peopledepartment {
          edges {
            node {
              id
              name
              slug
            }
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

  return data?.ourposition
}

export async function getKrnPeopleByType(type: string) {
  // console.log(type);
  const data = await fetchAPI(
    `
  query Posts($type: [String]) {
  boardofdirectors(
    first: 4
    where: {taxQuery: {taxArray: {field: NAME, operator: AND, taxonomy: DEPARTMENTPAK, terms: $type}} orderby: { field: DATE, order: ASC }}
  ) {
      nodes {
        id
        title
        featuredImage {
        node {
          id
          sourceUrl
          caption
        }
      }
        content
        ourLeader {
        memberPosition
        profileimagetheme
      }
        departmentpaks {
          nodes {
            id
            name
          }
        }
    }
  }
}
  
    `,
    {
      variables: {
        type: type,
      },
    }
  )

  return data?.boardofdirectors?.nodes
}
