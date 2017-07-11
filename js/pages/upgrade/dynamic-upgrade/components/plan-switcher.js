import React from 'react'

import dynamicPlanCopy from '../../data/dynamic-plan-copy'

export default function PlanSwitcher (props) {
  const { selectedPlan } = props

  return (
    <div className='c-plan-selector-card'>
      <h1>Plan for every need</h1>

      <div className='c-plan-selector-card__plan'>
        <a
          href='/upgrade?plan=essential'
          className='c-plan-selector-card__btn'>
          <div
            className={`c-radio c-radio--primary c-radio--large ${selectedPlan === 'essential' ? 'is-checked' : ''}`}
            name='essential' />
          <label />
            Personal
        </a>
        <p className='c-plan-selector-card__sub-text'>
          {dynamicPlanCopy.essential.planHighlight}
        </p>
      </div>

      <div className='c-plan-selector-card__plan'>
        <a
          href='/upgrade?plan=premium'
          className='c-plan-selector-card__btn'>
          <div
            className={`c-radio c-radio--primary c-radio--large ${selectedPlan === 'premium' ? 'is-checked' : ''}`}
            name='premium' />
          <label />
            Business
        </a>
        <p className='c-plan-selector-card__sub-text'>
          {dynamicPlanCopy.premium.planHighlight}
        </p>
      </div>

      <div className='c-plan-selector-card__plan'>
        <a
          href='/upgrade?plan=premium-plus'
          className='c-plan-selector-card__btn'>
          <div
            className={`c-radio c-radio--primary c-radio--large ${selectedPlan === 'premium-plus' ? 'is-checked' : ''}`}
            name='premium-plus' />
          <label />
            Get Financing
        </a>
        <p className='c-plan-selector-card__sub-text'>
          {dynamicPlanCopy['premium-plus'].planHighlight}
        </p>
      </div>
    </div>
  )
}
