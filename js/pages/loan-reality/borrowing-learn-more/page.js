import React, { Component } from 'react'

import AuthPage from '../../../common/containers/auth-page'

import LoanRealityHeader from '../components/loan-reality-header'

class BorrowingLearnMorePage extends Component {
  render () {
    return (
      <div className='o-site-container'>
        <LoanRealityHeader name='Back to Dashboard' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <p className='c-loan-reality-card__text'>
              Your estimated borrowing power is based on an evaluation of several
              key variables within your bank records, including your company's
              revenue from the last quarter. To understand how this calculation
              works, see <a href='/loan-reality/learn-more'>here</a>.
            </p>
            <p className='c-loan-reality-card__text'>
              Please note that there are several other important factors that
              will impact your ability to access capital, including:
            </p>
            <p className='c-loan-reality-card__text'>
              (1) Your personal and business credit scores.
              (2) Your company's time-in-business.
              (3) Bank records from the last year.
            </p>
            <p className='c-loan-reality-card__text'>
              To see what financing options you're likely to qualify for, visit
              the <a href='/market/lending-offers'>marketplace</a>.
            </p>
            <button
              data-flex--item='pull--center'
              onClick={track}
              className='c-btn c-btn--l'>
              Back to Dashboard
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
    label: 'learn_more:back_to_dashboard',
    name: 'learn_more:back_to_dashboard'
  })

  window.location.href = document.referrer
}

module.exports = exports.default = AuthPage(BorrowingLearnMorePage)
module.exports.jsFilename = 'borrowing-learn-more'
