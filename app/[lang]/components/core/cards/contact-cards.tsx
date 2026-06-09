import Image from 'next/image'

type ContactCardsComponentProps = {
  heading: string
  paragraph: string
  imageSrc: string
  nextPath: string
  isUrdu: boolean
}

const ContactCardsComponent = ({ heading, paragraph, imageSrc, nextPath, isUrdu }: ContactCardsComponentProps) => {
  return (
    <div className='col-md-6'>
      <div className='work-card'>
        <div className='wk-upper'>
          <Image
            src={imageSrc}
            width={0}
            height={0}
            style={{ width: '100%', height: '248px' }}
            sizes='100vw'
            alt={heading}
          />
        </div>
        <div className='wk-lower'>
          <h4 className='mb-2 mb-md-3'>{heading}</h4>
          <div className='mb-2 mb-md-4' dangerouslySetInnerHTML={{ __html: paragraph }} />
          <a className='butn butn-solid' href={nextPath}>
            {isUrdu ? 'مزید جانیں' : 'Learn more'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactCardsComponent
