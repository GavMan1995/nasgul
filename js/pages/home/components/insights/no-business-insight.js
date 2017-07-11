import React from 'react'

import Insight from './insight'

export default function NoBusinessInsight ({ insight, me }) {
  const config = {
    destination: '/app/settings',
    buttonText: 'Visit the settings page',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-business.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoBusinessInsight.isCurrentCode = function (code) {
  return code === 8
}
