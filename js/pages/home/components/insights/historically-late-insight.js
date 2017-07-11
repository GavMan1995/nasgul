import React from 'react'

import Insight from './insight'

export default function HistoricallyLateInsight ({ insight, me }) {
  const config = {
    destination: '',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-alert.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

HistoricallyLateInsight.isCurrentCode = function (code) {
  return code === 14
}
