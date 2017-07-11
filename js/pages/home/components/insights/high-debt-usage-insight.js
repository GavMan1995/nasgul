import React from 'react'

import Insight from './insight'

export default function HighDebtUsageInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View your credit report for more information',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-30-percent.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

HighDebtUsageInsight.isCurrentCode = function (code) {
  return code === 11
}
