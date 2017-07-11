import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import BillingCycleToggle from './components/billing-cycle-toggle'
import FicoHeader from './components/fico-header'
import PlanCard from './components/plan-card'

class SelectPlanPage extends Component {
  render () {
    const {
      frequency,
      me,
      location,
      plans,
      toggleDropdown,
      toggleFrequency
    } = this.props
    const hasFico = location.query.fico

    // get the full information about the user's current plan (member plan info is not complete)
    // this will also grab inactive plans, if the user is on a depreciated plan
    const currentPlan = plans.filter((plan) => {
      return plan.id === this.props.currentPlan.id
    }).shift()

    // filter the plans so that we can cleanly display only the ones we need
    const filteredPlans = filterPlans(currentPlan, plans, frequency, hasFico)

    return (
      <div className='o-new-page o-new-page--white'>
        <div className='o-site-container'>
          <FicoHeader hasFico={hasFico} />

          <BillingCycleToggle toggleFrequency={toggleFrequency} />

          <div className='o-container'>
            {filteredPlans.map((plan) => {
              return (
                <PlanCard
                  key={plan.plan_code}
                  currentPlan={currentPlan}
                  frequency={frequency}
                  email={me.email}
                  plan={plan}
                  toggleDropdown={toggleDropdown} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

function filterPlans (currentPlan, plans, frequency, fico) {
  // get the active plans for the selected frequency (ie. "monthly")
  return plans.filter((plan) => {
    // exclude trial plans (is_trial) and plans that aren't public (is_public)
    const isPublicNonTrial = plan.is_public && !plan.is_trial

    // fico does not show the freemium plans
    if (fico === 'fico') {
      return isPublicNonTrial && plan.frequency === frequency && plan.plan_code !== 'freemium'
    } else {
      return isPublicNonTrial && (plan.frequency === frequency || plan.plan_code === 'freemium')
    }
  }).map((plan) => {
    // if the user is on a depreciated plan, show the one they are on, replacing the related active one
    // this assumes that there was a new plan created with the same plan_code as the one they were on
    if (currentPlan.plan_code === plan.plan_code) {
      plan = Object.assign({}, currentPlan)
    // the personal plan was replaced by essential (exception to the plan_code remapping)
    } else if (plan.plan_code === 'essential' && currentPlan.plan_code === 'personal') {
      plan = Object.assign({}, currentPlan)
    }
    return plan
  }).sort((a, b) => {
    // sort by price, ascending
    return parseFloat(a.price) - parseFloat(b.price)
  })
}

function mapStateToProps ({ me, frequency, plan, plans, location }) {
  return { me, frequency, currentPlan: plan, plans, location }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleDropdown (plan) {
      dispatch({ type: 'TOGGLE_DROPDOWN', plan })
    },
    toggleFrequency (frequency) {
      dispatch({ type: 'TOGGLE_FREQUENCY', frequency })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(SelectPlanPage))
module.exports.jsFilename = 'select-plan'
