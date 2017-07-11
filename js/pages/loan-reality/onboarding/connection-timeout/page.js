import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import LoanRealityHeader from '../../components/loan-reality-header'

class ConnectionTimeoutPage extends Component {
  render () {
    return (
      <div className='o-site-container'>
        <LoanRealityHeader link='/loan-reality' name='Intro' />

        <div className='c-card c-loan-reality-card'>
          {/* TODO add some type of transistion here */}
          <h2 className='c-loan-reality-card__title--bold'>
            Connection Time Out

            <p className='c-loan-reality-card__subtitle'>
              It's taking too long to connect to your bank.
            </p>
          </h2>
          <p className='c-loan-reality-card__text'>
            Come back later or try again.
          </p>
          <div className='c-loan-reality-card__form-button-container'>
            <a
              href='/loan-reality/bank-search'
              className='c-btn c-btn--l'>
              Try Again
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(ConnectionTimeoutPage))
module.exports.jsFilename = 'connection-timeout'
