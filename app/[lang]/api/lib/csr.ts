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
      title: 'Partnership with TCF',
      description:
        '<p>Karandaaz has partnered with The Citizens Foundation (TCF) to support their literacy and education programs in remote areas of Pakistan. Through this collaboration, we help provide quality education and learning opportunities to underprivileged children, empowering them with the knowledge and skills needed for a brighter future.</p>',
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
      title: 'Sponsoring Student at NUST',
      description:
        '<p>Karandaaz has been sponsoring deserving students at the National University of Sciences and Technology (NUST) since 2015. Selected purely on merit, these students represent some of the brightest minds in the country. Karandaaz supports them through their undergraduate degrees, covering tuition fees and living expenses, enabling them to focus on their education and achieve their full potential.</p>',
      buttontitle: 'Learn More',
      buttonLinkSlug: 'sponsoring-student-at-nust',
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
