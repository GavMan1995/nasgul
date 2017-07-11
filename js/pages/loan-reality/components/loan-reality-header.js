import React from 'react'

export default function LoanRealityHeader ({ link, name }) {
  return (
    <div className='c-page-header'>
      <div className='c-loan-reality-card__breadcrumb'>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
        <a onClick={() => goBack(link, name)}>
          {name}
        </a>
      </div>

      <h2>
        Loan Reality Check
      </h2>
    </div>
  )
}

function goBack (link, name) {
  const trackName = name.toLowerCase().replace(' ', '_')

  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `loan_reality_header:${trackName}`,
    name: `loan_reality_header:${trackName}`
  })

  if (!link) {
    window.location.href = document.referrer

    return
  }

  window.location.href = link
}
