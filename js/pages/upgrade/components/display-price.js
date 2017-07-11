import React from 'react'

import PrettyMoney from './pretty-money'

export default function DisplayPrice ({ targetPlan, interval, coupon }) {
  const { priceInCents } = targetPlan.plans[interval]

  let regularPrice
  let todaysPrice = <h6><PrettyMoney priceInCents={priceInCents} /></h6>

  if (interval === 'monthly' && coupon && coupon.discount.rate) {
    regularPrice = <p><PrettyMoney priceInCents={priceInCents} /></p>

    todaysPrice = <h6><PrettyMoney priceInCents={priceInCents - Math.round(priceInCents * coupon.discount.rate)} /></h6>
  }

  if (interval === 'quarterly') {
    regularPrice = <p><PrettyMoney priceInCents={priceInCents} /></p>

    todaysPrice = <h6><PrettyMoney priceInCents={priceInCents - Math.round(priceInCents * (targetPlan.baseDiscountPercent / 100))} /></h6>
  }

  return (
    <div>
      {regularPrice}
      {todaysPrice}
    </div>
  )
}
