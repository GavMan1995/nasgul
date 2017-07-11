import React from 'react'

import TradeAccountCard from './trade-account-card'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function ActiveTradeAccountsCard ({ report }) {
  const { tradelines } = report.attributes

  if (tradelines.length < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_exchange_24x24.svg' />
        </div>
        <h2>{tradelines.length} Active Trade Accounts</h2>
      </div>

      {tradelines.map((account, index) => {
        return <TradeAccountCard key={index} account={account} accountNumber={index} />
      })}
    </div>
  )
}
