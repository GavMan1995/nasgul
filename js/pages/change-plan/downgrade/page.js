import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import DiscountDisplay from './components/discount-display'
import DowngradeDisplay from './components/downgrade-display'
import ReportsAffected from './components/reports-affected'

class DowngradePage extends Component {
  constructor (props) {
    super(props)

    const { plan, plans, location } = props

    // get all information for the user's current plan
    this.currentPlan = plans.filter((thisPlan) => {
      return thisPlan.id === plan.id
    })[0]

    // get info about the plan we are downgrading to
    this.downgradePlan = props.plans.filter((thisPlan) => {
      return thisPlan.id === parseInt(location.query.newPlan)
    })[0]
  }

  render () {
    const { crumb, showError } = this.props

    return (
      <div className='o-new-page o-new-page--white'>
        <div className='c-downgrade-details'>
          <DowngradeDisplay
            currentPlan={this.currentPlan}
            downgradePlan={this.downgradePlan} />
        </div>

        <ReportsAffected />

        <DiscountDisplay
          crumb={crumb}
          currentPlan={this.currentPlan}
          showError={showError} />

        <div className='o-site-container'>
          <div className='c-downgrade-anyways-link'>
            <a
              className='c-btn c-btn--xl c-btn--primary'
              onClick={() => downgrade(this.props, this.downgradePlan)}>
              I understand. Downgrade anyway
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function downgrade (props, downgradePlan) {
  const {
    crumb,
    businesses,
    me,
    showError,
    showNotice,
    showSuccess
  } = props

  showNotice('Downgrading plan...')

  // downgrade to another paid plan
  if (downgradePlan.price > 0) {
    window.fetch('/client/billing/change_plan', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': crumb
      },
      credentials: 'include',
      body: JSON.stringify({
        plan_id: downgradePlan.id
      })
    }).then((response) => {
      if (response.ok) {
        window.analytics.track(
          'General Downgrade ' + downgradePlan.plan_code,
          {
            userId: me.email,
            category: 'ChangePlan:GeneralDowngradePlan',
            action: 'ClickGeneralDowngradePlanButton',
            label: 'General Downgrade Plan Button',
            source: 'webapp'
          }
        )

        // TODO: implement this once the facehugger dashboard is complete
        // Cookies.set('message', 'Your account has been successfully downgraded!')
        // window.location.href = '/app/dashboard'
        showSuccess('Your account has been successfully downgraded!')

        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 3500)
      } else {
        if (response.status === 401) {
          window.location.reload(true)
        } else {
          showError('There was an error with downgrading your plan. Go ahead and try it again. If that doesn\'t work please call Member Services at 855-226-8388.')
        }
      }
    })

  // downgrade to free
  } else {
    // if any businesses are set up, set the first as active
    const activeBusiness = (businesses.length) ? businesses[0].id : null

    window.fetch('/client/billing/downgrade_to_freemium', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': crumb
      },
      credentials: 'include',
      body: JSON.stringify({
        business_id: activeBusiness
      })
    }).then((response) => {
      if (response.ok) {
        window.analytics.track(
          'Downgraded freemium',
          {
            userId: me.email,
            category: 'ChangePlan:DowngradedFreemiumPlan',
            action: 'ClickDowngradedFreemiumPlanButton',
            label: 'Downgraded Freemium Plan Button',
            source: 'webapp'
          }
        )

        // TODO: implement this once the facehugger dashboard is complete
        /*
        Cookies.set('message', 'Your account has been successfully downgraded!')
        window.location.href = '/app/alerts'
        */
        showSuccess('Your account has been successfully downgraded!')

        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 3500)
      } else {
        if (response.status === 401) {
          window.location.reload(true)
        } else {
          showError('There was an error with downgrading your plan. Go ahead and try it again. If that doesn\'t work please call Member Services at 855-226-8388.')
        }
      }
    })
  }
}

function mapStateToProps (state) {
  const {
    crumb,
    businesses,
    location,
    me,
    plan,
    plans
  } = state

  return {
    crumb,
    businesses,
    location,
    me,
    plan,
    plans
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showError (body) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE', body })
    },
    showNotice (body) {
      dispatch({ type: 'SHOW_NOTICE_MESSAGE', body, isDismissable: false })
    },
    showSuccess (body) {
      dispatch({ type: 'SHOW_SUCCESS_MESSAGE', body })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(DowngradePage))
module.exports.jsFilename = 'downgrade'
