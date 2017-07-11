import React from 'react'

import Insight from './insight'

export default function NoScoreBusinessLauncherInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/business_launcher',
    buttonText: 'Go to BusinessLauncher',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-ghost.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoScoreBusinessLauncherInsight.isCurrentCode = function (code) {
  return code === 0
}
