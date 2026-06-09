export const CounterSection = ({ data }: any) => {
  return (
    <section className='counter-section'>
      <div className='container'>
        <div className='col-sm-12 col-md-12 text-center'>
          <div dangerouslySetInnerHTML={{ __html: data?.title }} />
        </div>
        <div className='counter row mt-5'>
          <div className='counter-grid'>
            {Object.values(data.counters).map((counter: any, index) => {
              return (
                <div className='grid-item' key={index}>
                  <h6 className='tx-blue20 mb-0' style={{ height: '1.5rem' }}>
                    {counter?.prefix}
                  </h6>
                  <h1 className='tx-krnblue num-stats'>
                    <span className='counter-val'>
                      {counter?.number}
                    </span>
                  </h1>
                  <p>{counter?.description}</p>
                </div>
              )
            })}
          </div>

          <div className='text-center mt-5'>
            <p className='tx-grey50 mb-0'>*{data?.notes?.split('=')[0]}</p>
            <p className='tx-grey50 mb-0'>**{data?.notes?.split('=')[1]}</p>
            <p className='tx-grey50'>*** {data?.notes?.split('=')[2]}</p>
          </div>
        </div>
      </div>
      <div
        className='text-center mt-5'
        style={{
          background: `url(${data?.image?.node?.sourceUrl}) no-repeat center center/cover`,
          height: '600px', // Adjust as needed
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover', // Ensures the image covers the entire div
          backgroundPosition: '26%',
        }}
      >
        {/* <Image
          src='/images/prosperity.png'
          width={0}
          height={0}
          style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          sizes='100vw'
          alt='propsperity'
          className='display-image'
        /> */}
      </div>
    </section>
  )
}
export default CounterSection
