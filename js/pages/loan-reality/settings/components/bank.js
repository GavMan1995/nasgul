import React, { Component } from 'react'

import Account from './account'

export default class GoalCard extends Component {
  render () {
    const { bank } = this.props
    const { institutionName } = bank

    return (
      <div className='c-card c-loan-reality-card'>
        <div className='c-loan-reality-card__title--center'>
          <h3 style={{display: 'inline-block'}}>{institutionName}</h3>
          <div className='c-loan-reality-card__subtitle'>
            <a href={`/loan-reality/bank-enrollment/delete?enrollmentId=${bank.id}`}>
              Disconnect
            </a>
          </div>
        </div>
        <div>
          {bank.activeAccounts.map((account) => {
            return <Account key={account.id} account={account} />
          })}
          {bank.deletedAccounts.map((account) => {
            return <Account key={account.id} account={account} />
          })}
        </div>
      </div>
    )
  }
}
