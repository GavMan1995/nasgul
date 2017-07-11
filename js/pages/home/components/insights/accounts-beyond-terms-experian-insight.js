import React from 'react'

import Insight from './insight'

export default function AccountsBeyondTermsExperianInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View your Experian Business Report',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-cash-money.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

AccountsBeyondTermsExperianInsight.isCurrentCode = function (code) {
  return code === 2
}
