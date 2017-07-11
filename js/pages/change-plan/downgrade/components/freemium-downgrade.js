import React from 'react'

export default function FreemiumDowngrade ({ currentPlan }) {
  const code = currentPlan.plan_code
  let creditGradesText = ''
  if (/^essential/.test(code)) {
    creditGradesText = 'credit grades'
  }

  return (
    <div className='o-site-container'>
      <h1>Are You Sure You Want To Downgrade Your Plan?</h1>
      <div className='c-downgrade-details__panel'>
        <h3 className='c-downgrade-details__panel-header'>
          Your current plan
        </h3>
        <div className='c-downgrade-details__image-container'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/downgrade__score-numbers-v2.svg' />
          <p><strong>Detailed Credit Reports</strong></p>
        </div>
        <p>
          Business {creditGradesText} & personal credit scores lenders use.
          See what's impacting your scores.
        </p>

        <div className='c-downgrade-details__image-container'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/monitoring_icon_120x120.svg' />
          <p><strong>Premium Credit Monitoring</strong></p>
        </div>
        <p>
          Your identity is guarded.
        </p>
      </div>

      <div className='c-downgrade-details__panel'>
        <h3 className='c-downgrade-details__panel-header c-downgrade-details__panel-header--poor'>
          Here's what will change
        </h3>
        <div className='c-downgrade-details__image-container'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/downgrade__score-grade-v2.svg' />
          <p><strong>Limited Summary Reports</strong></p>
        </div>
        <p>
          Business credit grades instead of actual scores.
          No details of what's impacting your credit.
        </p>

        <div className='c-downgrade-details__image-container'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/no-monitoring_icon_120x120.svg' />
          <p><strong>Limited Credit Monitoring</strong></p>
        </div>
        <p>
          Your identity is not fully protected.
        </p>
      </div>
    </div>
  )
}
