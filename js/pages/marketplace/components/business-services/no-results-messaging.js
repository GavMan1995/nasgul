import React from 'react'

export default function NoResultsMessaging () {
  return (
    <div className='o-full-width-container'>
      <div className='c-warning-box'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
          className='c-warning-box__image' />
        <div className='c-warning-box__copy'>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
            className='c-warning-box__image' />
          <h3>Sorry! Something went wrong.</h3>
          <div className='c-warning-box__cta'>
            <p>
              Go back to
              <a
                href='/business-services'
                onClick={() => track('Go to Dashboard - No Results')}>
                Business Services
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function track () {
  window.analytics.track('Feature Click',
    {
      category: 'Internal Link',
      label: 'No Results - Business Services',
      name: 'No Results - Business Services'
    }
  )
}
