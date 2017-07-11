import React from 'react'

import Insight from './insight'

export default function RevolvingWithoutLimitInsight ({ insight, me }) {
  const config = {
    destination: '',
    additionalInfoTemplate: '/templates/dashboard/account_insight_details.html',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-alert.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

RevolvingWithoutLimitInsight.isCurrentCode = function (code) {
  return code === 16
}
