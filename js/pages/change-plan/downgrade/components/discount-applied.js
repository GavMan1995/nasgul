import React from 'react'

export default function DiscountApplied ({ show }) {
  if (!show) return null

  return (
    <div className='o-site-container'>
      <div className='c-i-would-stay-panel__warning'>
        <p>
          <strong>
            Success! The discount has been applied to your current Nav
            subscription!
          </strong>
        </p>
      </div>
      <div className='c-i-would-stay-panel__alert-container'>
        <a className='c-btn c-btn--xl c-btn--gold'
          onClick={() => { window.location.href = '/dashboard' }} >
          Back to the Dashboard
        </a>
      </div>
    </div>
  )
}
