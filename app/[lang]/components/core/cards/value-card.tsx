import Image from 'next/image'
import './value-card.css'
type CardProps = {
  imageUrl: string
  heading: string
  subheading: string
  logoHeight: string
}
// Value Card used in Procurement & Careers Module
const ValueCard = ({ imageUrl, heading, subheading, logoHeight }: CardProps) => {
  return (
    <div className='value-card bg-grey p-4 br-r20'>
      <Image
        src={imageUrl}
        className='mb-2 mb-md-4'
        width={0}
        height={0}
        style={{ width: 'auto', height: logoHeight }}
        sizes='100vw'
        alt=''
      />
      <h5 className='tx-grey100'>{heading}</h5>
      <p className='tx-grey70 fs-6 mb-0'>{subheading}</p>
    </div>
  )
}

export default ValueCard
