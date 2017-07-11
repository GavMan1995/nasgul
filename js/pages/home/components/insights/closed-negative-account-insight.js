import React from 'react'

import Insight from './insight'

export default function ClosedNegativeAccountInsight ({ insight, me }) {
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

ClosedNegativeAccountInsight.isCurrentCode = function (code) {
  return code === 18
}
