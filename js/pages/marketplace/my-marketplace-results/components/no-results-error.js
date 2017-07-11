import React from 'react'
import trackClick from '../../track-click'

export default function NoResultsError () {
  return (
    <div className='c-warning-box'>
      <img
        src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
        className='c-warning-box__image' />
      <div className='c-warning-box__copy'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
          className='c-warning-box__image' />
        <h3>We have hundreds of options, but none fit your criteria.</h3>
        <p>Refine your search and we'll match you to the best.</p>
        <p>Or call one of our Credit and Lending experts who can help:</p>
        <div className='c-warning-box__cta'>
          <a
            href='https://app.hubspot.com/meetings/nav/business-financing-consultation-lse'
            target='_blank'
            onClick={() => {
              trackClick(
                'No Offer Results',
                'Feature Click',
                'Schedule a Call - Lending')
            }}
            className='c-btn c-btn--primary'>
            Schedule A Call
          </a>
          <p>
            or call now
            <a
              href='tel:8446362445'
              onClick={() => {
                trackClick(
                  'No Offer Results',
                  'Feature Click',
                  'Call Now - Lending'
                )
              }}>
              844-636-2445
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
