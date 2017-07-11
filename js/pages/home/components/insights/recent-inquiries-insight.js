import React from 'react'

import Insight from './insight'

export default function RecentInquiriesInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View recent inquiries',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-eye.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

RecentInquiriesInsight.isCurrentCode = function (code) {
  return code === 13
}
