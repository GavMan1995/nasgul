import React from 'react'

import Insight from './insight'

export default function SummaryHasDerogatoriesInsight ({ insight, me }) {
  const config = {
    destination: '/app/change_plan',
    buttonText: 'Upgrade your reports',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-search.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

SummaryHasDerogatoriesInsight.isCurrentCode = function (code) {
  return code === 27
}
