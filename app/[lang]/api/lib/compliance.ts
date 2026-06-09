import { fetchAPI } from './lib'

// Compliance
export async function getCompliancePageFields() {
  const data = await fetchAPI(
    `
query Page($id: ID!, $idType: PageIdType! ) {
  page(id: $id, idType: $idType) {
    title
    compliancepage {
      status {
        content
        heading
      }
      auditor {
        content
        heading
      }
      secp {
        content
        heading
      }
    }
  }
}
    `,
    {
      variables: {
        id: 'compliance',
        idType: 'URI',
      },
    }
  )

  return data?.page?.compliancepage
}
