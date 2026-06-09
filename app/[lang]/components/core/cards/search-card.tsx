import Link from 'next/link'
import './search-card.css'

type Props = {
  title: string
  desc: string
  link: string
  postType: string
  postName: string
}
export const SearchCard = ({ title, desc, link, postType, postName }: Props) => {
  return (
    <Link href={link ? link : ''} className='search-card d-block'>
      <div>
        <h5 className={`tx-krnblue search-tag ${postType}`}>{postName ? postName : ''}</h5>
        <h5 className='tx-krnblue' dangerouslySetInnerHTML={{ __html: title }} />
        <p className='tx-small tx-grey60' dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </Link>
  )
}
