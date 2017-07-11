import React from 'react'

import Insight from './insight'

export default function HighAccountUsageInsight ({ insight, me }) {
  const config = {
    destination: '',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-30-percent.svg'
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

HighAccountUsageInsight.isCurrentCode = function (code) {
  return code === 17
}
