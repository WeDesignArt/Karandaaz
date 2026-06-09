import { GetUrlsArray } from '../../../utils/images'
import { getFooter } from '../api/lib/lib'
import { ImagesSwiper } from '../components/extra/swiper'

export default async function CapitalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
  const footerRes = await getFooter('financial-partners', params.lang)
  const swiperImages = footerRes?.image?.edges
  return (
    <div>
      <div>{children}</div>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center mb-5'>{footerRes?.title}</h2>
              <ImagesSwiper urls={GetUrlsArray(swiperImages)} />
            </div>
          </div>
        </div>
      </section>

      {/* <SponsorsFooter /> */}
    </div>
  )
}
