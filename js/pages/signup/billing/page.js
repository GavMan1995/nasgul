import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import BillingInfoForm from './components/billing-info-form'
import Header from './components/header'

class BillingPage extends Component {
  constructor (props) {
    super(props)
    const planCode = props.signupPlan || 'business'

    this.selectedPlan = this.props.plans.filter((plan) => {
      return plan['planCode'] === planCode
    }).shift()

    this.state = {
      finalPrice: this.selectedPlan.price
    }
  }

  render () {
    const { me } = this.props
    const { finalPrice } = this.state

    return (
      <div className='c-signup-page'>
        <div className='c-signup-page__container'>

          <Header
            finalPrice={finalPrice}
            selectedPlan={this.selectedPlan} />

          <p className='c-signup-page__info-box'>
            You're all ready to go! Now we just need your payment info.
          </p>

          <BillingInfoForm
            me={me}
            selectedPlan={this.selectedPlan}
            updatePrice={this.updatePrice.bind(this)} />

        </div>
      </div>
    )
  }

  updatePrice (discountPercent) {
    const newPrice = Math.round(this.selectedPlan.price * (1 - discountPercent))

    this.setState({ finalPrice: newPrice })
  }

  componentDidMount () {
    const {
      attemptedBusinessSimilars,
      businesses,
      showError,
      showSuccess
    } = this.props

    // This assumes they will not be following more than one business during the signup flows
    const business = (businesses[0]) ? businesses[0] : {}

    if (attemptedBusinessSimilars === 'true' && (business.dunsNumber || business.experianFileNumber)) {
      showSuccess('Your business info has been saved')
    } else if (attemptedBusinessSimilars) {
      showError('Thanks, but we couldn\'t find a business. Get started with your personal scores.')
    }
  }
}

function mapStateToProps ({ attemptedBusinessSimilars, businesses, me, plans, signupPlan }) {
  return { attemptedBusinessSimilars, businesses, me, plans, signupPlan }
}

function mapDispatchToProps (dispatch) {
  return {
    showSuccess (body) {
      dispatch({ type: 'SHOW_SUCCESS_MESSAGE', body })
    },
    showError (body) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE', body })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(SignupPage(BillingPage))
module.exports.jsFilename = 'billing'
