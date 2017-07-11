import React from 'react'

import Insight from './insight'

export default function NoExperianFileInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/business_launcher',
    buttonText: 'Go to BusinessLauncher',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-no-score.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoExperianFileInsight.isCurrentCode = function (code) {
  return code === 9
}
