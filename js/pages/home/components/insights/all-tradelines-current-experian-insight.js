import React from 'react'

import Insight from './insight'

export default function AllTradelinesCurrentExperianInsight ({ insight, me }) {
  const config = {
    destination: `/app/reports/${insight.insightable.report.report_pull.id}/analyze`,
    buttonText: 'View Your Experian Business Report',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-stopwatch.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

AllTradelinesCurrentExperianInsight.isCurrentCode = function (code) {
  return code === 20
}
