import React from 'react'

import Insight from './insight'

export default function AllTradelinesCurrentDandBInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View Your Dun & Bradstreet Business Report',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-thumbs-up.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

AllTradelinesCurrentDandBInsight.isCurrentCode = function (code) {
  return code === 22
}
