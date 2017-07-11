import React from 'react'

import Insight from './insight'

export default function SharedNegativeAccountInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/credit_sweeper',
    buttonText: 'View Disputes',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-alert.svg'
  }
  const account = insight.insightable.account

  return (
    <Insight config={config} insight={insight} me={me}>
      <p>
        {account.account_number} - {account.institution} - {account.type}
      </p>
    </Insight>
  )
}

SharedNegativeAccountInsight.isCurrentCode = function (code) {
  return code === 19
}
