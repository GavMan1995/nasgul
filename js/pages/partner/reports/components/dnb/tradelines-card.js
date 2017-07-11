import React from 'react'

import safeStringToNumber from '../../utils/safe-string-to-number'
import Tradeline from '../../components/dnb/tradeline'
import CDNIcon from '../../../../../common/components/cdn-icon'

export default function TradelinesCard ({ report }) {
  const {
    payment_experiences: tradelines
  } = report.attributes

  if (tradelines.length < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_exchange_24x24.svg' />
        </div>
        <h2>{safeStringToNumber(tradelines.length)} Active Trade Accounts</h2>
      </div>

      {tradelines.map((tradeline, index) => {
        return <Tradeline key={index} tradeline={tradeline} accountNumber={index + 1} />
      })}
    </div>
  )
}
