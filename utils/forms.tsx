import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const namePattern = /^[a-zA-Z .]{1,20}$/
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const errorMessage = 'Please provide a valid value.'
export const fileErrorMessage = 'Please provide a valid file.'
export const phonePattern = /^[0-9]{11}$/
export const payPattern = /^(?:\d+(?:[KkMm])?)$/

export const TooltipComp = ({ id, children, title, select = false }: any) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <div className={select ? 'tooltip-icon-select' : 'tooltip-icon'}>{children}</div>
  </OverlayTrigger>
)
