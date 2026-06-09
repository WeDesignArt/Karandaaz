import { fetchAPI } from './lib'

export async function getBoardVisionaryTypes() {
  const data = await fetchAPI(
    ` 
  query Posts {
  typebovs(where: {orderby: TERM_ORDER, order: ASC}) {
  	nodes {
  	  id
      name
  	}
  }
}
    `
  )

  return data?.typebovs?.nodes
}

export async function getPeopleDepartmentTypes() {
  const data = await fetchAPI(
    ` 
    query Posts {
  departmentpaks(first: 99, where: {orderby: TERM_ORDER, order: ASC}) {
      nodes {
        id
        name
      }
  }
}
    `
  )

  return data?.departmentpaks?.nodes
}

export async function getBoardVisionaries(type: string) {
  const data = await fetchAPI(
    `
  query Posts($type: [String]) {
  boardofdirectors(
    first: 100
    where: {taxQuery: {taxArray: {field: NAME, operator: EXISTS, taxonomy: TYPEBOV, terms: $type}}orderby: { field: DATE, order: ASC }
}
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
        typebovs {
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

export async function getBoardVisionariesByType(type: string) {
  const data = await fetchAPI(
    `
  query Posts($type: [String]) {
  boardofdirectors(
    first: 100
    where: {taxQuery: {taxArray: {field: NAME, operator: AND, taxonomy: TYPEBOV, terms: $type}}orderby: { field: DATE, order: ASC }}
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
        departmentPosition
        profileimagetheme
        }
        typebovs {
          nodes {
            id
            name
          }
          edges {
            isPrimary
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

export async function getKrnPeopleByType(type: string) {
  const data = await fetchAPI(
    `
  query Posts($type: [String]) {
  boardofdirectors(
    first: 100
    where: {taxQuery: {taxArray: {field: NAME, operator: AND, taxonomy: DEPARTMENTPAK, terms: $type}}orderby: { field: DATE, order: ASC }}
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
        partOfPeople
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

// About
export async function getAboutPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType! ) {
  page(id: $id, idType: $idType) {
    id
    seo {
      fullHead
      metaDesc
      title
    }
    aboutmainpage {
      heading
      imagesmarquee {
        edges {
          node {
            id
            sourceUrl
          }
        }
      }
      whosection {
        description
        sectionHeading
        subHeading
        visionBackgroundImage {
          node {
            id
            sourceUrl
          }
        }
        image {
          node {
            id
            sourceUrl
          }
        }
        visioncard {
          heading
          subheading
          image {
            node {
              id
              sourceUrl
            }
          }
        }
        missionCard {
          heading
          subheading
          image {
            node {
              id
              sourceUrl
            }
          }
        }
      }
      whatsection {
        sectionHeading
        subheading
        cards {
          navigateto
          description
          theme
          headerImage {
            node {
              id
              sourceUrl
            }
          }
          backgroundImage {
            node {
              id
              sourceUrl
            }
          }
        }
        
      }
      strategyReport {
        description
        sectionHeading
        subHeading
        image {
          node {
            id
            sourceUrl
          }
        }
        report {
          node {
              id
              mediaItemUrl
            }
        }
      }
      lastSection {
        heading
      }
    }
  }
}
  `,
    {
      variables: {
        id: 'about',
        idType: 'URI',
      },
    },
    url
  )

  return data?.page
}
