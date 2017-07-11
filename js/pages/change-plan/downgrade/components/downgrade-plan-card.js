import React from 'react'

export default function DowngradePlanCard ({ plan }) {
  return (
    <div className='c-change-plan-card'>
      <div className='c-change-plan-card__header'>
        <h3>{plan.name}</h3>
      </div>
      <div className='c-change-plan-card__info'>
        <h1>{(plan.price ? `$${plan.price / 100}` : 'FREE')}</h1>
        <p>{plan.description}</p>
      </div>
      <div className='c-change-plan-card__benefits-container'>
        <div className='c-change-plan-card__benefits'>
          {plan.features.map((feature) => {
            return (
              <div
                key={`${plan.id}_${feature.name}`}
                className={`c-benefit-status ${feature.active ? '' : 'c-benefit-status--inactive'}`} >
                <span />
                <p>{feature.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
