import React from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import Header from '../components/header'
import UpgradeOption from './components/upgrade-option'

export function UpgradeCtaPage (props) {
  const { plans } = props

  const premiumPlan = plans.filter((plan) => {
    return plan['planCode'] === 'business'
  }).shift()

  const premiumPlusPlan = plans.filter((plan) => {
    return plan['planCode'] === 'business_plus'
  }).shift()

  return (
    <div className='c-full-page-card' >
      <Header icon='diamond_72x60.svg' title='Nav offers more than just free credit reports' />
      <h3>Premium offers:</h3>

      <UpgradeOption
        description='In-depth reports on how well you pay Vendors, and what risk you pose to SMB lenders.'
        plan={premiumPlan}
        planUrl={'premium'}
        valueProp='If you have a LOW Personal score, this is for you.' />
      <UpgradeOption
        description='Everything in our $29.99 account, as well as access to the FICO SBSS score.'
        plan={premiumPlusPlan}
        planUrl={'premium-plus'}
        valueProp='The one score that tells if your business is bank loan ready.' />

      <p>No thanks!</p>
      <a href='/home' className='c-btn c-btn--primary c-btn--outline'>Continue with Standard</a>
    </div>
  )
}

function mapStateToProps ({ plans }) {
  return { plans }
}

module.exports = exports.default = connect(mapStateToProps)(SignupPage(UpgradeCtaPage))
module.exports.jsFilename = 'upgrade-cta'
