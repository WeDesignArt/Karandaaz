'use client'
import { event } from '../../../../lib/gtag'
interface newsItem {
  news: string
  readMoreUrl: string
  readMoreText: string
}

export const HomeNewsTicker = ({ data, lang, heading }: { data: newsItem[]; lang: string; heading: string }) => {
  // Determine if the language is Urdu
  const isUrdu = lang === 'ur'

  // Conditional classes based on language direction
  const textAlignmentClass = isUrdu ? 'text-end' : 'text-start'
  const flexDirectionClass = isUrdu ? 'flex-row-reverse' : 'flex-row'
  const marqueeDirectionClass = isUrdu ? 'rtl' : 'ltr'

  const handleReadMoreClick = (targetUrl: string) => {
    event({
      action: 'news_ticker_click',
      category: 'News Ticker Click',
      label: targetUrl,
      value: 1,
    })
  }

  return data ? (
    <section className='newsticker-section overflow-hidden'>
      <div className='bg-blue00'>
        <div className='position-relative'>
          <div className={`latest-news`}>
            <a href='/research/publications' className='mb-0 tx-blue80 p-md-3 p-2 d-block'>
              {heading}
            </a>
          </div>
          <div className={`marquee-wrapper p-md-3 p-2 d-flex ${flexDirectionClass}`}>
            <div className={`marquee ${marqueeDirectionClass}`}>
              {data.map((newsItem, index) => (
                <a
                  key={index}
                  href={newsItem.readMoreUrl}
                  onClick={() => handleReadMoreClick(newsItem.readMoreUrl)}
                  className='me-4 tx-krngrey'
                >
                  {newsItem.news} <span className='tx-krnblue'>{isUrdu ? 'مزید پڑھیں' : newsItem.readMoreText}</span>
                </a>
              ))}
            </div>
            <div className={`marquee ${marqueeDirectionClass}`}>
              {data.map((newsItem, index) => (
                <a
                  key={index}
                  href={newsItem.readMoreUrl}
                  onClick={() => handleReadMoreClick(newsItem.readMoreUrl)}
                  className='me-4 tx-krngrey'
                >
                  {newsItem.news} <span className='tx-krnblue'>{isUrdu ? 'مزید پڑھیں' : newsItem.readMoreText}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null
}

export default HomeNewsTicker
