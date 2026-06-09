import React from 'react'
import './button.css'
import Link from 'next/link'

type ButtonProps = {
  text: string
  onClick?: any
  outline?: boolean
  size?: string // large?
}

type LinkProps = {
  text: string
  link: string
  outline?: boolean
  size?: string
}
// Header Button
export const OutlinedButton = ({ text, link }: LinkProps) => {
  return (
    <div>
      <Link href={link} className='p-0 m-0 border border-light rounded-pill px-3 py-2 tx-grey00 hoverBtn'>
        {text}
      </Link>
    </div>
  )
}

// for forms
export const SubmitButton = ({ text }: ButtonProps) => {
  return (
    <button type='submit' className='btn btn-primary mb-3 rounded-pill body2 tx-grey00'>
      {text}
    </button>
  )
}

// For Outlined/Filled button
export const PrimaryButton = ({ text, onClick, outline = false, size }: ButtonProps) => {
  const classVar = outline ? 'butn-outline' : 'butn-solid'
  const sizeClass = size == 'large' ? 'butn-large' : ''
  return (
    <a className={`butn ${classVar} ${sizeClass}`} onClick={onClick}>
      {text}
    </a>
  )
}

// For Outlined/Filled Link
export const PrimaryLink = ({ text, link, outline = false, size }: LinkProps) => {
  const sizeClass = size == 'large' ? 'butn-large' : ''
  const classVar = outline ? 'butn-outline' : 'butn-solid'
  return (
    <Link href={link} className={`butn ${classVar} ${sizeClass}`}>
      {text}
    </Link>
  )
}
