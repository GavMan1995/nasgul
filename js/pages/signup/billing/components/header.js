import React from 'react'

import CDNIcon from '../../../../common/components/cdn-icon'

import PrettyMoney from './pretty-money'

export default function Header (props) {
  const { finalPrice, selectedPlan } = props

  return (
    <div className='c-signup-page__header'>
      <CDNIcon width='80' height='80' filename='users_72x72.svg' />
      <h1>
        { selectedPlan.name }
        <p><PrettyMoney priceInCents={finalPrice} /> every month</p>
      </h1>
    </div>
  )
}
