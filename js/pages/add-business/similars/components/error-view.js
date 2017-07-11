import React from 'react'

export default function ErrorView ({ bureauLogo }) {
  return (
    <div className='c-floating-card'>
      <div className='c-floating-card__header'>{bureauLogo}</div>

      <div className='c-floating-card__content'>
        <h4>We were unable to save to your profile</h4>
      </div>

      <div className='c-floating-card__footer'>
        <div className='c-btn-group-on-mobile-wrapper'>
          <a href='/add-business' className='c-btn c-btn--primary'>
            Please Try Again
          </a>
        </div>
      </div>
    </div>
  )
}
