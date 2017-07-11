import React from 'react'

import PaymentForm from './payment-form'

const _essentialPlan = {
  icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/essential-gem-18x18.svg',
  callbackUrl: '/app/welcome/essential',
  level: 'essential',
  description: 'Essential',
  basePriceInCents: 1499,
  baseDiscountPercent: 15,
  plans: {
    monthly: {
      planCode: 'essential',
      priceInCents: 1499
    },
    quarterly: {
      planCode: 'essential_3_mon',
      priceInCents: 4497
    }
  }
}

export default function EssentialPaymentForm (props) {
  const { me, queryParams, offerName, address, crumb } = props

  return (
    <PaymentForm
      crumb={crumb}
      me={me}
      address={address}
      queryParams={queryParams}
      offerName={offerName}
      targetPlan={_essentialPlan} />
  )
}
