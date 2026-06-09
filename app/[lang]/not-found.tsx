import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='container py-5 text-center'>
      <h2>Not Found!</h2>
      <p className='mt-4'>The page you are looking for is not found!</p>
      <Link className='mt-3 d-block tx-krnblue' href='/'>
        Click here to return to Karandaaz
      </Link>
    </div>
  )
}
