import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CopySection from './components/copy-section'
import DynamicUpgradeHeader from '../components/dynamic-upgrade-header'
import DynamicPaymentForm from './components/dynamic-payment-form'
import PlanSwitcher from './components/plan-switcher'
import Testimonials from './components/testimonials'
import Faqs from './components/faqs'

import dynamicPlanCopy from '../data/dynamic-plan-copy'
import upgradeContextCopy from '../data/upgrade-context-copy'

class DynamicUpgradePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedPlan: this.props.location.query.plan || 'premium'
    }
  }
  render () {
    const {
      crumb,
      me,
      address,
      location
    } = this.props
    const { selectedPlan } = this.state

    const context = upgradeContextCopy[location.query.context]

    const copy = dynamicPlanCopy[selectedPlan]

    return (
      <div className='c-dynamic-upgrade-page'>

        <DynamicUpgradeHeader context={context} />

        <PlanSwitcher selectedPlan={selectedPlan} />

        <CopySection copy={copy} />

        <DynamicPaymentForm
          address={address}
          copy={copy}
          crumb={crumb}
          location={location}
          me={me}
          selectedPlan={selectedPlan} />

        <Testimonials copy={copy} />

        <Faqs copy={copy} />

      </div>
    )
  }
}

function mapStateToProps ({ crumb, me, address, location }) {
  return { crumb, me, address, location }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(DynamicUpgradePage))
module.exports.jsFilename = 'dynamic-upgrade'
