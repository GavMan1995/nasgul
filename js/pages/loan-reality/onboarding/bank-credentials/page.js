import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'

import CredentialInput from './components/credential-input'
import LoanRealityHeader from '../../components/loan-reality-header'
import LearnMoreLink from '../../components/learn-more-link'

class BankCredentialsPage extends Component {
  render () {
    const { crumb, institution, credentials, enrollment } = this.props

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title'>
              {institution.name}

              <p className='c-loan-reality-card__subtitle'>
                Securely connect to your bank.
              </p>
            </h2>
            {this.errorMessage(enrollment)}
            <div className='c-loan-reality-card__form-wrapper'>
              <form
                data-flex--container='true'
                data-flex--item='full'
                action={this.formAction(enrollment)}
                method='POST'>
                <input type='hidden' name='crumb' value={crumb} />
                <input type='hidden' name='institutionId' value={institution.id} />
                <input type='hidden' name='enrollmentId' value={enrollment.id} />
                <input type='hidden' name='institutionName' value={institution.name} />
                <div className='form-container c-loan-reality-card__item'>
                  {credentials.map((cred, index) => {
                    return <CredentialInput key={index} params={cred} />
                  })}
                </div>
                <div className='c-loan-reality-card__form-button-container'>
                  <button
                    type='submit'
                    className='c-btn c-btn--l'
                    onClick={track}>
                    Connect
                  </button>
                </div>
              </form>
            </div>
            <LearnMoreLink />
          </div>
        </div>
      </div>
    )
  }

  formAction (enrollment) {
    if (enrollment.status === 'DENIED') {
      return '/loan-reality/bank-enrollment/update'
    }

    return '/loan-reality/bank-enrollment'
  }

  errorMessage (enrollment) {
    if (enrollment.status === 'DENIED') {
      return (
        <div className='c-loan-reality-card__answer-error'>
          <h2 className='c-loan-reality-card__answer-error-title'>
            Incorrect Answer
          </h2>
          <p className='c-loan-reality-card__answer-error-text'>
            Your answer does not match the answer you set up with the bank.
          </p>
        </div>
      )
    }

    return null
  }
}

function track () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'bank_credentials:connect',
    name: 'bank_credentials:connect'
  })
}

function mapStateToProps ({ crumb, credentials, institution, enrollment }) {
  return { crumb, credentials, institution, enrollment }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BankCredentialsPage))
module.exports.jsFilename = 'bank-credentials'
