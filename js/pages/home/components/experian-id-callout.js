import React from 'react'

export default function ExperianIdCallout () {
  return (
    <div className='c-experian-id-callout'>
      <div className='c-experian-id-callout__section'>
        <h2>Good News!</h2>
        <p>
          We're now providing you with Experian personal credit summary
          reports--the most widely used credit reports. For security, we
          need to verify your identity.
        </p>

        <div className='c-experian-id-callout__btn-container'>
          <a
            href='/identification'
            className='c-btn c-btn--white c-btn--vertical-center'
            onClick={() => {
              window.analytics.track('Feature Click', {
                category: 'Internal Link',
                label: 'Experian Id Callout: Primary',
                name: 'Experian Id Callout: Primary'
              })
            }}>
            Verify My Identity
          </a>
          <a
            href='https://www.nav.com/ppq/'
            target='_blank'
            className='c-experian-id-callout__white-link'
            onClick={() => {
              window.analytics.track('Feature Click', {
                category: 'Internal Link',
                label: 'Experian Id Callout: Secondary',
                name: 'Experian Id Callout: Secondary'
              })
            }}>
            Learn More
          </a>
        </div>
      </div>

      <div className='c-experian-id-callout__section'>
        <span className='c-experian-id-callout__radiating-circle' />
        <div className='c-experian-id-callout__img'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/exp_report_ppq_267x264.svg' />
        </div>
      </div>
    </div>
  )
}
