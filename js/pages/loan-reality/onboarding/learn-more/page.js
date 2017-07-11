import React, { Component } from 'react'

import AuthPage from '../../../../common/containers/auth-page'
import CDNAsset from '../../../../common/components/cdn-asset'

import LoanRealityHeader from '../../components/loan-reality-header'

class LearnMorePage extends Component {
  render () {
    return (
      <div className='o-site-container'>
        <LoanRealityHeader name='Back' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <CDNAsset
              className='c-loan-reality-card__small-image'
              directory='images/loan-reality'
              filename='lock.svg' />
            <p className='c-loan-reality-card__text'>
              Nav is EI3PA compliant which meets the requirements for the
              highest level of security a business can offer. We adhere to
              Bank-Level security procedures and use multi-factor authentication,
              designed to protect access to your account.
            </p>
            <p className='c-loan-reality-card__text'>
              Connecting your business bank account allows Nav to analyze what
              your business looks like in the eyes of small business lenders,
              what you can do about it, and how much money you would qualify for
              today.
            </p>
            <button
              data-flex--item='pull--center'
              onClick={track}
              className='c-btn c-btn--l'>
              Continue with Sign Up
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function track () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'learn_more:continue_with_signup',
    name: 'learn_more:continue_with_signup'
  })

  window.location.href = document.referrer
}

module.exports = exports.default = AuthPage(LearnMorePage)
module.exports.jsFilename = 'learn-more'
