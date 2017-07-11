import React from 'react'

import Insight from './insight'

export default function NoLatePaymentsInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View Your Credit Report to continue monitoring',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-thumbs-up.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoLatePaymentsInsight.isCurrentCode = function (code) {
  return code === 24
}
