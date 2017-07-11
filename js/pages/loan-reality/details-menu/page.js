import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CustomerSupport from '../components/customer-support'
import LoanRealityHeader from '../components/loan-reality-header'

import MenuItem from './components/menu-item'

class DetailsMenuPage extends Component {
  render () {
    const { location, reportSections } = this.props
    const { accountId } = location.query

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link={`/loan-reality/borrowing-power?accountId=${accountId}`}
          name='Back to Dashboard' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h3 className='c-loan-reality-card__title'>
              Reality Check
            </h3>
            <p className='c-loan-reality-card__text'>
              Lenders look at 4 main factors when evaluating your business bank
              records. Some are more important than others.
            </p>
          </div>
          <CustomerSupport />

          {reportSections.map((section, index) => {
            return (
              <MenuItem key={index} accountId={accountId} section={section} />
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ location, reportSections }) {
  return { location, reportSections }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(DetailsMenuPage))
module.exports.jsFilename = 'details-menu'
