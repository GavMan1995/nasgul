import React from 'react'

import PaymentForm from './payment-form'

const _premiumPlusPlan = {
  icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/diamond-premium-blue.svg',
  callbackUrl: '/app/welcome/premium_plus',
  level: 'premium_plus',
  description: 'Premium Plus',
  basePriceInCents: 4999,
  baseDiscountPercent: 30,
  plans: {
    monthly: {
      planCode: 'business_plus',
      priceInCents: 4999
    },
    quarterly: {
      planCode: 'premium_plus_3_mon',
      priceInCents: 14997
    }
  }
}

export default function PremiumPlusPaymentForm (props) {
  const { me, queryParams, offerName, address, crumb } = props

  return (
    <PaymentForm
      crumb={crumb}
      me={me}
      address={address}
      queryParams={queryParams}
      offerName={offerName}
      targetPlan={_premiumPlusPlan} />
  )
}
