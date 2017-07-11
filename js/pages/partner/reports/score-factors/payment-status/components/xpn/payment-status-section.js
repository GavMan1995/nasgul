import React from 'react'

import prettyMoneyString from '../../../../utils/pretty-money-string'

export default function PaymentStatusSection ({ report }) {
  const {
    tradelines: tradelinesSummary
  } = report.attributes.executive_summary

  const activeTradelines = tradelinesSummary.active_tradelines
  const totalBalance = tradelinesSummary.current_total_balance

  return (
    <div className='c-enterprise-score'>
      <div className='c-enterprise-score__section c-enterprise-score__section--align-center'>
        <div className='c-horizontal-list-card-section'>
          <h4>{activeTradelines}</h4>
          <small>Active Accounts</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(totalBalance)}</h4>
          <small>Balance of Accounts</small>
        </div>
      </div>
    </div>
  )
}
