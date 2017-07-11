import React from 'react'

import EssentialPaymentForm from '../../components/essential-payment-form'
import PremiumPaymentForm from '../../components/premium-payment-form'
import PremiumPlusPaymentForm from '../../components/premium-plus-payment-form'

export default function DynamicPaymentForm (props) {
  const { address, copy, crumb, location, me, selectedPlan } = props

  let PaymentForm = null
  if (selectedPlan === 'essential') {
    PaymentForm = (
      <EssentialPaymentForm
        address={address}
        crumb={crumb}
        me={me}
        queryParams={location.query}
        offerName='Essential General' />
    )
  } else if (selectedPlan === 'premium-plus') {
    PaymentForm = (
      <PremiumPlusPaymentForm
        address={address}
        crumb={crumb}
        me={me}
        queryParams={location.query}
        offerName='Premium Plus Reports' />
    )
  } else {
    PaymentForm = (
      <PremiumPaymentForm
        address={address}
        crumb={crumb}
        me={me}
        queryParams={location.query}
        offerName='Premium General' />
    )
  }

  return (
    <div className='c-dynamic-upgrade-page__payment-form'>
      <div className='c-dynamic-upgrade-page__header'>
        <h1>Nav's {copy.planName} Account</h1>
        <p>{copy.planHighlight}</p>
      </div>
      <div className='c-upgrade-form'>
        {PaymentForm}
      </div>
    </div>
  )
}
