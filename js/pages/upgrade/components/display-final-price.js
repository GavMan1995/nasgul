import React from 'react'

import PrettyMoney from './pretty-money'

export default function DisplayFinalPrice ({ targetPlan, interval, coupon }) {
  const { priceInCents } = targetPlan.plans[interval]

  if (interval === 'monthly' && coupon && coupon.discount.rate) {
    return <PrettyMoney priceInCents={priceInCents - Math.round(priceInCents * coupon.discount.rate)} />
  }

  if (interval === 'quarterly') {
    return <PrettyMoney priceInCents={priceInCents - Math.round(priceInCents * (targetPlan.baseDiscountPercent / 100))} />
  }

  return <PrettyMoney priceInCents={priceInCents} />
}
