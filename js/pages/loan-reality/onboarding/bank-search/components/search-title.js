import React from 'react'

export default function SearchTitle ({ noInstitutionsFound }) {
  let title = "Let's add your Bank Account"
  let subtitle = (
    <p className='c-loan-reality-card__subtitle'>
      Nav will show you how lenders view your bank information.
    </p>
  )

  if (noInstitutionsFound) {
    title = "We couldn't find your bank."
    subtitle = ''
  }

  return (
    <h2 className='c-loan-reality-card__title--bold'>
      {title}
      {subtitle}
    </h2>
  )
}
