import React from 'react'

import DowngradePlanCard from '../components/downgrade-plan-card'

export default function PriceChangeDowngrade ({ currentPlan, downgradePlan }) {
  return (
    <div className='o-site-container'>
      <h1>Are You Sure You Want To Downgrade Your Plan?</h1>
      <div className='c-downgrade-details__panel'>
        <h3 className='c-downgrade-details__panel-header'>
          Your current plan
        </h3>
        <DowngradePlanCard plan={currentPlan} />
      </div>

      <div className='c-downgrade-details__panel'>
        <h3 className='c-downgrade-details__panel-header c-downgrade-details__panel-header--poor'>
          Here's what will change
        </h3>
        <DowngradePlanCard plan={downgradePlan} />
      </div>
    </div>
  )
}
