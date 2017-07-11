import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import LoanRealityHeader from '../../components/loan-reality-header'
import LearnMoreLink from '../../components/learn-more-link'
import MfaInput from './components/mfa-input'
import MfaOptions from './components/mfa-options'

class BankMfaPage extends Component {
  render () {
    const { crumb, enrollment } = this.props
    const mfaCredentials = enrollment.mfaCredentials[0]

    if (enrollment.status !== 'CHALLENGED') {
      window.location.href = `/loan-reality/connecting?enrollmentId=${enrollment.id}`
      return
    }

    let mfaField = <MfaInput params={mfaCredentials} />
    let mfaImage = (
      <div className='c-loan-reality-card__mfa-image-container'>
        <img
          className='c-loan-reality-card__mfa-image'
          src={mfaCredentials.attachment} />
      </div>
    )

    if (mfaCredentials.inputType === 'OPTIONS') {
      mfaField = <MfaOptions params={mfaCredentials} />
    }

    if (mfaCredentials.inputType !== 'IMAGE_DATA') {
      mfaImage = ''
    }

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />

        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title'>
              {enrollment.institutionName}

              <p className='c-loan-reality-card__subtitle'>
                Security question from your bank.
              </p>
            </h2>
            <div className='c-loan-reality-card__form-wrapper'>
              <form
                className='c-loan-reality-card__item'
                action='/loan-reality/bank-mfa'
                method='POST'>

                <input type='hidden' name='crumb' value={crumb} />
                <input type='hidden' name='enrollmentId' value={enrollment.id} />
                {mfaImage}

                <div className='form-container c-loan-reality-card__item'>
                  {mfaField}
                </div>

                <div className='c-loan-reality-card__form-button-container'>
                  <button
                    type='submit'
                    className='c-btn c-btn--l'
                    onClick={() => track(enrollment)}>
                    Continue
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
}

function track (enrollment) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'bank_mfa:continue',
    name: 'bank_mfa:continue',
    properties: enrollment
  })
}

function mapStateToProps ({ crumb, enrollment }) {
  return { crumb, enrollment }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BankMfaPage))
module.exports.jsFilename = 'bank-mfa'
