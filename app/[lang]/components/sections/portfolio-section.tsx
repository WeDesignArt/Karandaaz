'use client'
import React, { useEffect, useState } from 'react'
import PortfolioCard from '../core/cards/portfolio-card'
import PortfolioCardNew from '../core/cards/portfolio-card-new'
import { Loader } from '../states/loader'
import { getCapitalPortfolios } from '../../api/lib/capital'
import { getDigitalPortfolios } from '../../api/lib/digital'

type Props = {
  sectionID?: string
  title: string
  path: string
  type: string
  sectionType: 'capital' | 'digital'
  isUrdu?: boolean
  lang?: string
}

export default function PortfolioSection({ sectionType, sectionID, title, path, type, isUrdu, lang }: Props) {
  const [limit, setLimit] = useState(4) // Set initial limit
  const [portfolios, setPortfolios] = useState<any[]>([]) // State to store fetched portfolios
  const [hasMore, setHasMore] = useState(true) // State to track if more portfolios exist
  const [loading, setLoading] = useState(false) // State to track loading status

  useEffect(() => {
    async function fetchData() {
      setLoading(true) // Set loading to true when fetching starts
      try {
        let res
        if (sectionType === 'capital') {
          res = await getCapitalPortfolios(limit, type, lang)
        } else if (sectionType === 'digital') {
          res = await getDigitalPortfolios(limit, type)
        }

        const fetchedPortfolios = res?.nodes || []

        // Ensure only unique portfolios are added
        setPortfolios((prevPortfolios) => {
          const uniquePortfolios = fetchedPortfolios.filter(
            (newPortfolio: any) =>
              !prevPortfolios.some((existingPortfolio) => existingPortfolio.slug === newPortfolio.slug)
          )
          return [...prevPortfolios, ...uniquePortfolios]
        })

        // Stop fetching if fewer portfolios are returned than the limit (indicating no more)
        setHasMore(fetchedPortfolios.length === limit)
      } catch (e) {
        console.error(e)
      }
      setLoading(false) // Set loading to false after fetching
    }

    fetchData()
  }, [limit, sectionType, type, lang]) // Re-fetch when limit or other params change

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 4) // Increase the limit when "View more" is clicked
  }

  return (
    <section className='section-py-md bg-grey' id={sectionID ? sectionID : ''}>
      <div className='container'>
        <h2 className='mb-4 mb-md-5 text-center'>{title}</h2>

        <div className='row gy-4'>
          {portfolios.length === 0 && !loading ? (
            <div className='text-center'>
              <Loader />
            </div>
          ) : (
            portfolios.map((portfolio: any, index: number) => {
              // Set column class based on section type
              const columnClass = sectionType === 'capital' ? 'col-md-6' : 'col-md-12'

              return (
                <div
                  className={`${columnClass} col-sm-12`} // Use dynamic class here
                  key={portfolio?.slug}
                  data-aos='fade-up'
                  data-aos-offset='200'
                  data-aos-delay='50'
                  data-aos-duration='1000'
                  data-aos-easing='ease-in-out'
                  data-aos-mirror='true'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                >
                  {/* Conditionally render the card based on sectionType */}
                  {sectionType === 'capital' ? (
                    <PortfolioCard
                      title={portfolio?.title}
                      imgLink={portfolio?.featuredImage?.node?.mediaItemUrl}
                      link={path + '/' + portfolio?.slug}
                      description={portfolio?.excerpt}
                      isUrdu={isUrdu}
                    />
                  ) : (
                    <PortfolioCardNew
                      title={portfolio?.title}
                      imgLink={portfolio?.featuredImage?.node?.mediaItemUrl}
                      link={path + '/' + portfolio?.slug}
                      description={portfolio?.excerpt}
                      index={index} // Pass index to PortfolioCardNew for conditional class application
                    />
                  )}
                </div>
              )
            })
          )}

          {hasMore && !loading && (
            <div className='text-center mt-3 mt-md-5'>
              <a className='butn butn-solid butn-large' onClick={loadMore}>
                {isUrdu ? 'تمام دیکھیں' : 'View more'}
              </a>
            </div>
          )}

          {loading && (
            <div className='text-center'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
