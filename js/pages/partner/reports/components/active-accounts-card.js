import React, { Component } from 'react'

import TradelineCard from './tradeline-card'
import CDNIcon from '../../../../common/components/cdn-icon'

export default class ActiveAccountsCard extends Component {
  render () {
    const { report } = this.props
    const { executive_summary: summary, tradelines } = report.attributes

    if (tradelines.length < 1) return null

    return (
      <div className='o-enterprise-info-container'>
        <div className='c-enterprise__info-header'>
          <div className='c-enterprise__info-header-img'>
            <CDNIcon filename='icon_ent_money_24x24.svg' />
          </div>
          <h2>{summary.tradelines.active_tradelines} Active Accounts</h2>
        </div>

        {tradelines.map((tradeline, index) => {
          return (
            <TradelineCard
              key={index}
              tradeline={tradeline}
              creditUtil={this.creditUtilCalc(tradeline)}
              accountNumber={index + 1} />
          )
        })}
      </div>
    )
  }

  creditUtilCalc (tradeline) {
    if (tradeline.highest_credit_last_six_months === 0) {
      return 0
    }
    return Math.round((parseInt(tradeline.balance) / parseInt(tradeline.highest_credit_last_six_months)) * 100)
  }
}
