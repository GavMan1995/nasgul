import React from 'react'

export default function ConfirmDiscount ({ applyDiscount, currentPlan, show }) {
  if (!show) return null

  let discountPrice = ((currentPlan.price - (currentPlan.price * 0.20)) / 100).toFixed(2)
  return (
    <div className='o-site-container'>
      <div className='c-i-would-stay-panel__warning'>
        <p>
          <strong>
            Awesome! We&rsquo;d love to have you stay. <br />
            Just click below to apply the discount for 20% off of
            your {currentPlan.frequency} Nav subscription for one year.<br />
            Your new {currentPlan.frequency} cost will be
            ${discountPrice}
          </strong>
        </p>
      </div>
      <div className='c-i-would-stay-panel__alert-container'>
        <a
          className='c-btn c-btn--xl c-btn--gold c-btn--wrap-text'
          onClick={applyDiscount}>
          Apply Discount
        </a>
      </div>
    </div>
  )
}
