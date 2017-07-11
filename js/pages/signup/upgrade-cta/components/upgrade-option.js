import React from 'react'

import PrettyMoney from './pretty-money'

export default function UpgradeOption (props) {
  const { description, plan, planUrl, valueProp } = props

  return (
    <div className='c-full-page-card__upgrade-option'>
      <p className='c-full-page-card__upgrade-description'>
        {description}
        <strong>{valueProp}</strong>
      </p>
      <p className='c-full-page-card__price c-full-page-card__price--essential'>
        <PrettyMoney priceInCents={plan.price} /> /mo
      </p>
      <a href={`/billing/${planUrl}`} className='c-btn c-btn--primary'>Upgrade</a>
    </div>
  )
}
