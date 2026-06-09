import { PaginationProps } from 'antd'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

// Styles Previous & Next For Antd Pagination Comp
export const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return (
      <a className='pagination-link tx-krnblue body2'>
        <GoArrowLeft /> <span className='d-none d-md-inline'>Previous</span>
      </a>
    )
  }
  if (type === 'next') {
    return (
      <a className='pagination-link tx-krnblue body2'>
        <span className='d-none d-md-inline'>Next</span> <GoArrowRight />
      </a>
    )
  }
  return originalElement
}
