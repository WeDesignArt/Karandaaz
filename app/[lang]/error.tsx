'use client'

export default function Error({ error, reset }: any) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
      <p className='text-center tx-krnblue'>Oops! Please hang tight while our development team resolves the issue.</p>
      <a className='butn butn-solid' href='/'>
        Back to Home
      </a>
    </div>
  )
}
