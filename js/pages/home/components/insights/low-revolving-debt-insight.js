import React from 'react'

import Insight from './insight'

export default function LowRevolvingDebtInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View Your Credit Report',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-scale.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

LowRevolvingDebtInsight.isCurrentCode = function (code) {
  return code === 23
}
