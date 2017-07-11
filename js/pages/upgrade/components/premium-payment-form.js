import React from 'react'

import PaymentForm from './payment-form'

const _premiumPlan = {
  icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/diamond-premium-blue.svg',
  callbackUrl: '/app/welcome/premium',
  level: 'premium',
  description: 'Premium',
  basePriceInCents: 2999,
  baseDiscountPercent: 20,
  plans: {
    monthly: {
      planCode: 'business',
      priceInCents: 2999
    },
    quarterly: {
      planCode: 'premium_3_mon',
      priceInCents: 8997
    }
  }
}

export default function PremiumPaymentForm (props) {
  const { me, queryParams, offerName, address, crumb } = props

  return (
    <PaymentForm
      crumb={crumb}
      me={me}
      address={address}
      queryParams={queryParams}
      offerName={offerName}
      targetPlan={_premiumPlan} />
  )
}
