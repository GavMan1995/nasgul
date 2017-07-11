import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'

import Accounts from './components/accounts'
import LoanRealityHeader from '../../components/loan-reality-header'

class AccountsPage extends Component {
  render () {
    const { accounts } = this.props

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />
        <Accounts
          accounts={accounts} />
      </div>
    )
  }

  componentDidMount () {
    const numberOfAccounts = this.props.accounts.length

    window.analytics.track('page_context', {
      category: 'loan_reality',
      label: 'accounts',
      name: 'accounts',
      properties: { numberOfAccounts }
    })
  }
}

function mapStateToProps (state) {
  const { accounts, report } = state

  return { accounts, report }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchReport (id) {
      dispatch({ type: 'FETCH_REPORT', id })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(AccountsPage))
module.exports.jsFilename = 'accounts'
