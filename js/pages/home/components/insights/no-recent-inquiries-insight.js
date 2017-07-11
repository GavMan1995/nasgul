import React from 'react'

import Insight from './insight'

export default function NoRecentInquiriesInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View your recent credit inquiries',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-search.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoRecentInquiriesInsight.isCurrentCode = function (code) {
  return code === 25
}
