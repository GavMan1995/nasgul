import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import IdentificationForm from './components/identification-form'
import Header from '../components/header'

class IdentificationPage extends Component {
  render () {
    const { address, crumb, showError, me } = this.props

    return (
      <div className='c-signup-page'>
        <div className='c-signup-page__container'>
          <Header
            icon='vault_72x72.svg'
            title='Secure Personal Information' />

          <p className='c-signup-page__info-box'>
            This information is used to access your free personal credit report.
            This process will not affect your credit score. <strong>It is safe
            and secure, and uses 256-bit encryption.</strong>
            <span>*Required fields</span>
          </p>

          <IdentificationForm
            address={address}
            crumb={crumb}
            displayError={showError}
            me={me} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ address, crumb, me }) {
  return { address, crumb, me }
}

function mapDispatchToProps (dispatch) {
  return {
    showError (body) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE', body, isDismissable: true })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(SignupPage(IdentificationPage))
module.exports.jsFilename = 'identification'
