import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import LoanRealityHeader from '../../components/loan-reality-header'

class TooManyAttemptsPage extends Component {
  render () {
    return (
      <div className='o-site-container'>
        <LoanRealityHeader link='/loan-reality' name='Intro' />

        <div className='c-card c-loan-reality-card'>
          {/* TODO add some type of transistion here */}
          <h2 className='c-loan-reality-card__title--bold'>
            Too Many Login Attempts

            <p className='c-loan-reality-card__subtitle'>
              You've had too many login attempts.
            </p>
          </h2>
          <p className='c-loan-reality-card__text'>
            Please check your online banking account and make sure you have
            the correct login and password.
          </p>
          <p className='c-loan-reality-card__text'>
            If you need help please contact your bank or
            <a href='https://www.nav.com/contact/'> send us a message.</a>
          </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(TooManyAttemptsPage))
module.exports.jsFilename = 'too-many-attempts'
