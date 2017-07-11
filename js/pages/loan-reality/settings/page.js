import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CustomerSupport from '../components/customer-support'
import LoanRealityHeader from '../components/loan-reality-header'

import Bank from './components/bank'

class SettingsPage extends Component {
  render () {
    const { crumb, enrollments } = this.props

    let noAccountMessage = ''

    if (enrollments.length === 0) {
      noAccountMessage = (
        <p className='c-loan-reality-card__subtitle'>
          It looks like you don't have any connected banks,
          <a href='/loan-reality/bank-search'> click here </a> to add one.
        </p>
      )
    }

    return (
      <div className='o-site-container'>
        <LoanRealityHeader link='/loan-reality/accounts' name='Back to Summary' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title--center'>
              Settings
              {noAccountMessage}
            </h2>
          </div>

          {enrollments.map((enrollment, index) => {
            return <Bank key={index} bank={enrollment} crumb={crumb} />
          })}

          <CustomerSupport />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ crumb, enrollments }) {
  return { crumb, enrollments }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(SettingsPage))
module.exports.jsFilename = 'settings'
