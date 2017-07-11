import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import Header from '../components/header'
import PersonalInfoForm from './components/personal-info-form'
import Footer from './components/footer'

class PersonalInfoPage extends Component {
  render () {
    const { address, crumb, displayError, me } = this.props

    return (
      <div className='c-signup-page'>
        <div className='c-signup-page__container'>
          <Header icon='users_72x72.svg' title='Welcome to Nav' />

          <p className='c-signup-page__info-box'>
            In order to build your Nav profile, and give you access to your
            credit reports and scores, we need some of your personal
            information. <span>*Required fields</span>
          </p>

          <PersonalInfoForm
            address={address}
            crumb={crumb}
            displayError={displayError}
            me={me} />
        </div>

        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ address, affiliateOwner, crumb, me, plan, plans }) {
  return { address, affiliateOwner, crumb, me, plan, plans }
}

function mapDispatchToProps (dispatch) {
  return {
    showError (body) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE', body, isDismissable: true })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(SignupPage(PersonalInfoPage))
module.exports.jsFilename = 'personal-info'
