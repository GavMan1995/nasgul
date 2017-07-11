import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import CDNIllustration from '../../../common/components/cdn-illustration'
import LoadingOverlay from '../components/loading-overlay'

class TryAgainPage extends Component {
  constructor () {
    super()

    this.state = { isLoading: false }
  }

  render () {
    const { isLoading } = this.state

    let loader = null

    if (isLoading) loader = <LoadingOverlay />

    return (
      <div className='c-warning-box'>
        <CDNIllustration
          className='c-warning-box__image'
          filename='computer-to-computer_320x156_not-working.svg' />
        <div className='c-warning-box__copy'>
          <CDNIllustration
            className='c-warning-box__image'
            filename='computer-to-computer_320x156_not-working.svg' />
          <h1 className='h0'>We couldn't confirm your identity</h1>

          <p className='c-large-copy'>
            <em>
              Your answers didn't match what the credit bureaus have on file.
              You can try again, though!
            </em>
          </p>

          <div className='c-warning-box__cta c-warning-box__cta--align-right'>
            <a
              href='/verification'
              className='c-btn c-btn--primary'
              onClick={this.setLoading.bind(this)}>
              Verify My Identity
            </a>
          </div>
        </div>

        {loader}
      </div>
    )
  }

  setLoading () {
    this.setState({ isLoading: true })
  }
}

function mapStateToProps (state) {
  return {}
}

module.exports = exports.default = connect(mapStateToProps)(SignupPage(TryAgainPage))
module.exports.jsFilename = 'try-again'
