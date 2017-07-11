import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import CDNAsset from '../../../../common/components/cdn-asset'

import LoanRealityHeader from '../../components/loan-reality-header'
import LearnMoreLink from '../../components/learn-more-link'

class AgreementPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      agreedToTerms: false,
      warning: ''
    }
  }

  render () {
    return (
      <div className='o-site-container'>
        <LoanRealityHeader link='/loan-reality' name='Intro' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <CDNAsset
              className='c-loan-reality-card__small-image'
              directory='images/loan-reality'
              filename='shield.svg' />
            <p className='c-loan-reality-card__text'>
              In order to estimate your company's borrowing power, we'll ask you
              to enter your online banking credentials so we can connect to your
              primary business bank account.
            </p>
            <div className='c-loan-reality-card__agreement'>
              <div>
                <input
                  className='c-check c-check--medium'
                  id='agree-to-terms'
                  name='agreeToTerms'
                  type='checkbox'
                  value={this.state.agreedToTerms}
                  onChange={this.updateState.bind(this)}
                />
                <label htmlFor='agree-to-terms' />
              </div>
              <p className='c-loan-reality-card__agreement-text'>
                I agree to let this app connect to my primary business operating
                account information.
              </p>
            </div>
            <div className='c-loan-reality-card__agreement-error'>
              {this.state.warning}
            </div>
            <div data-flex--item='full' data-flex--container='true'>
              <button
                data-flex--item='pull--center'
                onClick={this.agreeToTerms.bind(this)}
                className='c-btn c-btn--l'>
                Continue
              </button>
            </div>

            <LearnMoreLink />
          </div>
        </div>
      </div>
    )
  }

  agreeToTerms () {
    // Probably need to set a cookie here so we can check for it on the other pages
    if (this.state.agreedToTerms) {
      window.analytics.track('feature_click', {
        category: 'internal_link',
        label: 'continue',
        name: 'continue'
      })

      window.location = '/loan-reality/bank-search'
    } else {
      this.setState({ warning: 'You must agree to the terms to continue.' })
    }
  }

  updateState () {
    let agreedToTerms = !this.state.agreedToTerms
    this.setState({agreedToTerms})
  }
}

function mapStateToProps (state) {
  return state
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(AgreementPage))
module.exports.jsFilename = 'agreement'
