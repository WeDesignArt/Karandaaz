import { fetchAPI } from './lib'

export async function getCsrPageFields(language = 'en') {
  const url =
    language === 'ur' ? process.env.NEXT_PUBLIC_WORDPRESS_UR_API_URL : process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  try {
    const data = await fetchAPI(
      `query NewQuery {
        page(id: "csr-and-outreach", idType: URI) {
          csrpage {
            headersection {
              heading
              subheading
              buttontext
            }
            marqueeimages {
              edges {
                node {
                  id
                  sourceUrl
                }
              }
            }
            alumsection {
              title
              description
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
            faqs {
              heading
              content
            }
          }
        }
      }`,
      {
        variables: {
          id: 'slug',
          idType: 'URI',
        },
      },
      url
    )
    return data?.page?.csrpage
  } catch (error) {
    console.error('getCsrPageFields error:', error)
    return MOCK_CSR_DATA
  }
}

const MOCK_CSR_DATA = {
  headersection: {
    // heading: 'CSR & Outreach',
    subheading: 'Driving sustainable impact through community engagement and responsible business practices.',
    buttontext: 'Learn More',
  },
  marqueeimages: {
    edges: [
      { node: { id: '1', sourceUrl: 'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/careersMarquee-5-e1729598952412.jpeg' } },
      { node: { id: '2', sourceUrl: 'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/careersMarquee-4-e1729598886679.jpeg' } },
      { node: { id: '3', sourceUrl: 'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/careersMarquee-3-e1729598807890.jpeg' } },
      { node: { id: '4', sourceUrl: 'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/careersMarquee-2-e1729598741612.jpeg' } },
      { node: { id: '5', sourceUrl: 'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/10/careersMarquee-1-e1729598618862.jpeg' } },
     
    ],
  },
  alumsection: {
    title: 'Our CSR Mission',
    description:
      'Karandaaz is committed to fostering financial inclusion and economic empowerment across Pakistan through targeted CSR initiatives and community outreach programs.',
  },
  directionalSection: [
    {
      title: 'Community Financial Literacy',
      description:
        '<p>We empower communities with financial knowledge and tools to achieve economic independence. Our programs reach underserved populations across Pakistan.</p>',
      buttontitle: 'Learn More',
      buttonLinkSlug: 'financial-literacy',
      image: {
        node: {
          mediaItemUrl:
            'https://krndevelop.wpenginepowered.com/wp-content/uploads/2024/07/women_financial_inclusion.png',
        },
      },
    },
    {
      title: 'Women Economic Empowerment',
      description:
        '<p>Through targeted outreach and support programs, we help women entrepreneurs access financial services and grow their businesses sustainably.</p>',
      buttontitle: 'Learn More',
      buttonLinkSlug: 'women-empowerment',
      image: {
        node: {
          mediaItemUrl:
            'https://krndevelop.wpenginepowered.com/wp-content/uploads/2025/10/Blog_Blog-header-women.jpg',
        },
      },
    },
   
  ],
  faqs: [
    {
      heading: 'What is Karandaaz CSR initiative?',
      content:
        '<p>Karandaaz CSR initiative focuses on promoting financial inclusion, digital literacy, and economic empowerment for underserved communities across Pakistan.</p>',
    },
    {
      heading: 'How can organizations partner with us?',
      content:
        '<p>Organizations can partner with Karandaaz through our outreach programs. Contact our team to explore collaboration opportunities that align with your CSR goals.</p>',
    },
    {
      heading: 'What areas do the outreach programs cover?',
      content:
        '<p>Our programs cover major urban and rural areas across Pakistan, with a special focus on financially underserved regions and communities.</p>',
    },
  ],
}
