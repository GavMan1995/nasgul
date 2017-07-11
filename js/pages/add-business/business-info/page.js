import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthWrapper from '../../../common/containers/auth-wrapper'

import AuthLayout from '../../../common/containers/auth-layout'
import SignupLayout from '../../../common/containers/signup-layout'

import BusinessAlreadyAdded from './components/business-already-added'
import BusinessInfoForm from './components/business-info-form'

class BusinessInfoPage extends Component {
  render () {
    const { businesses, plan, signupPlan } = this.props
    const allowedFollowCount = plan.followedBusinessCount

    let component = <BusinessInfoForm />
    let Layout = AuthLayout

    if (signupPlan && signupPlan !== 'freemium') Layout = SignupLayout

    if (businesses.length >= allowedFollowCount) {
      component = (
        <BusinessAlreadyAdded
          allowedFollowCount={plan.followedBusinessCount}
          plan={plan.name} />
      )
    }

    return (
      <Layout>
        {component}
      </Layout>
    )
  }
}

function mapStateToProps ({ businesses, plan, signupPlan }) {
  return { businesses, plan, signupPlan }
}

module.exports = exports.default = connect(mapStateToProps)(AuthWrapper(BusinessInfoPage))
module.exports.jsFilename = 'business-info'
