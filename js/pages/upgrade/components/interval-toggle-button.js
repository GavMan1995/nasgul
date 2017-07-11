import React from 'react'

import PrettyMoney from './pretty-money'

export default function IntervalToggleButton ({ targetPlan, targetInterval, currentInterval, onClick, coupon }) {
  let text = <PrettyMoney priceInCents={targetPlan.plans[targetInterval].priceInCents} />

  if (targetInterval === 'monthly' && coupon && coupon.discount.rate) {
    text = `Save ${coupon.discount.rate * 100}%`
  }

  if (targetInterval === 'quarterly') {
    text = `Save ${targetPlan.baseDiscountPercent}%`
  }

  return (
    <button
      data-flex--item='basis--50 grow--1'
      className={(targetInterval === currentInterval) ? 'btn -outline' : 'btn'}
      data-group='plan-code-btn'
      data-plan-interval={targetInterval}
      onClick={onClick}>
      <p>{`${targetInterval.charAt(0).toUpperCase()}${targetInterval.slice(1)}`}</p>
      <span>{text}</span>
    </button>
  )
}
