import React from 'react'

export default function DiscountOption ({ currentPlan, show, showConfirm }) {
  if (!show) return null

  // For quarterly plans, we do not want to show the discount button
  let discountButton = null
  if (['essential_3_mon', 'premium_3_mon', 'premium_plus_3_mon'].indexOf(currentPlan.plan_code) === -1) {
    discountButton = (
      <div className='c-i-would-stay-panel__alert-container'>
        <a
          className='c-btn  c-btn--xl c-btn--gold c-btn--wrap-text'
          onClick={showConfirm}>
          I'd stay if I could get 20% off my {currentPlan.frequency} plan for a year
        </a>
      </div>
    )
  }

  return (
    <div className='o-site-container'>
      <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/bike-crash.svg' />

      <div className='c-i-would-stay-panel__warning'>

        <h2><strong>Immediate Downgrade</strong></h2>

        <p>
          <strong>
            There are no credits or refunds for the time remaining
            on your paid account
          </strong>
        </p>
      </div>

      {discountButton}

    </div>
  )
}
