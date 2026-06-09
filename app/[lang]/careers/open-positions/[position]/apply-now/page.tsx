import { Breadcrumb } from '../../../../components/navigation/breadcrumb'
import { CareersForm } from '../../../../components/forms/careers-form'

export default async function Apply({ params }: { params: { position: string } }) {
  const position = params.position
    .split('-') // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ')
  return (
    <main>
      <section className='section-py-md'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Breadcrumb />
            </div>
            <div className='col-sm-12 col-md-8 mx-auto'>
              <h2 className='mb-4 text-center'>Apply Now</h2>
              <CareersForm position={position} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
