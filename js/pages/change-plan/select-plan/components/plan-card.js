import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PrettyMoney from '../../../upgrade/components/pretty-money'

export default class PlanCard extends Component {
  render () {
    const { currentPlan, email, plan, frequency } = this.props

    const isCurrentPlan = currentPlan.plan_code === plan.plan_code
    const isRecommended = currentPlan.plan_code !== 'business' &&
      ['business', 'premium_3_mon'].indexOf(plan.plan_code) > -1 &&
      ['freemium', 'essential', 'personal'].indexOf(currentPlan.plan_code) > -1

    const selectPlanText = isCurrentPlan ? 'CURRENT PLAN' : 'SELECT THIS PLAN'

    let currentPlanClass = ''
    let selectPlanClass = 'c-btn c-btn--xl c-btn--block c-btn--primary'

    if (isRecommended) {
      currentPlanClass = 'c-recommended-top-bar c-recommended-top-bar--white is-inactive'
      selectPlanClass += ' c-btn--upgrade'
    } else {
      if (isCurrentPlan) {
        currentPlanClass = 'c-change-plan-card__top-bar'
      } else {
        currentPlanClass = 'c-change-plan-card__top-bar is-inactive'
      }
    }

    let regularPrice = plan.price ? `$${plan.price / 100}` : 'FREE'
    let todaysPrice
    let percentSaved
    let quarterlyDisclaimer

    if (plan.frequency === 'monthly') {
      regularPrice = <h2 className='c-change-plan-card__price'>{regularPrice}</h2>
    }

    if (plan.plan_code === 'freemium' && frequency === 'quarterly') {
      percentSaved = <h3> &nbsp; </h3>
    }

    if (plan.frequency === 'quarterly') {
      let baseDiscountPercent = 0
      switch (plan.plan_code) {
        case 'essential_3_mon':
          baseDiscountPercent = 15
          break
        case 'premium_3_mon':
          baseDiscountPercent = 20
          break
        case 'premium_plus_3_mon':
          baseDiscountPercent = 30
          break
      }

      quarterlyDisclaimer = (
        <small className='c-change-plan-card__disclaimer'>
          {baseDiscountPercent}% discount applies only to first quarter. Plan cost thereafter is&nbsp; <PrettyMoney priceInCents={plan.price} /> &nbsp;per quarter.
        </small>
      )

      regularPrice = <h2 className='c-change-plan-card__price is-inactive'>{regularPrice}</h2>
      todaysPrice = (
        <h2 className='c-change-plan-card__price'>
          {plan.price ? `$${(plan.price - Math.round(plan.price * (baseDiscountPercent / 100))) / 100}` : 'FREE'}
        </h2>
      )
      percentSaved = <h3>{`Save ${baseDiscountPercent}%`}</h3>
    }

    return (
      <div className='c-change-plan-card'>
        { isRecommended &&
          <div className='c-recommended-top-bar'>
            Recommended
          </div>
        }
        <div className={currentPlanClass}>
          Your Current Plan
        </div>
        <div className='c-change-plan-card__header'>
          <h3>{plan.name}</h3>
        </div>
        <div className='c-change-plan-card__info'>
          {percentSaved}
          {regularPrice}
          {todaysPrice}
          <p>{plan.description}</p>
        </div>
        <div
          className='c-change-plan-card__benefits-container c-change-plan-card__benefits-container--max-height-on-mobile'
          style={{maxHeight: plan.maxHeight}}>
          <a
            className={selectPlanClass}
            onClick={(event) => this.handleSelectPlan(plan.plan_code, planActionUrl(plan, currentPlan), email, event)}
            disabled={isCurrentPlan}>
            {selectPlanText}
          </a>
          <div
            className={`c-benefit-status__expand-btn${plan.expanded ? ' is-open' : ''}`}
            onClick={() => this.expandBenefits(plan)}>
            <strong>See Details</strong>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg'
              height='24' width='16' />
          </div>
          <div className='c-change-plan-card__benefits'>
            {
              plan.features.map((feature) => {
                return (
                  <div
                    key={`${plan.id}_${feature.name}`}
                    className={`c-benefit-status ${feature.active ? '' : 'c-benefit-status--inactive'}`}>
                    <span />
                    <p>{feature.name}</p>
                  </div>
                )
              })
            }
            {quarterlyDisclaimer}
          </div>
          <a
            className={selectPlanClass + ' bottomBtn'}
            onClick={(event) => this.handleSelectPlan(plan.plan_code, planActionUrl(plan, currentPlan), email, event)}
            disabled={isCurrentPlan}>
            {selectPlanText}
          </a>
        </div>
      </div>
    )
  }

  handleSelectPlan (planCode, planActionUrl, email, event) {
    // disable for the currently selected plan
    if (planActionUrl === null) {
      event.preventDefault()
    } else {
      window.analytics.track(`Select Plan ${planCode}`, {
        userId: email,
        category: 'ChangePlan:SelectPlan',
        action: `ClickChangePlanButton ${planCode}`,
        label: `Change Plan Button ${planCode}`
      })

      window.location = planActionUrl
    }
  }

  expandBenefits (plan) {
    const element = findDOMNode(this)
    const benefit = element.querySelector('.c-change-plan-card__benefits')
    const container = element.querySelector('.c-change-plan-card__benefits-container')
    const btn = element.querySelector('.bottomBtn')
    const maxHeight = outerHeight(benefit) + outerHeight(container) + outerHeight(btn)

    plan = Object.assign({}, plan, { maxHeight: maxHeight })

    this.props.toggleDropdown(plan)
  }
}

function planActionUrl (plan, currentPlan) {
  // downgrade
  if (currentPlan.price > plan.price) {
    return `/app/change-plan/downgrade?newPlan=${plan.id}`
  // upgrade to a more expensive paid plan
  } else if (plan.plan_code !== currentPlan.plan_code) {
    // decide which upgrade page and frequency to direct to
    switch (plan.plan_code) {
      case 'essential':
        return '/app/upgrade/essential?frequency=monthly#upgrade'
      case 'essential_3_mon':
        return '/app/upgrade/essential#upgrade'
      case 'business':
        return '/app/upgrade/premium?frequency=monthly'
      case 'premium_3_mon':
        return '/app/upgrade/premium'
      case 'business_plus':
        return '/app/upgrade/premium-plus?frequency=monthly#upgrade'
      case 'premium_plus_3_mon':
        return '/app/upgrade/premium-plus#upgrade'
    }
  }

  return null
}

function outerHeight (element) {
  if (!element) return 0

  const styles = window.getComputedStyle(element)
  const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)

  return Math.ceil(element.offsetHeight + margin)
}
