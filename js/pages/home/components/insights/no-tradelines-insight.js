import React from 'react'

import Insight from './insight'

export default function NoTradelinesInsight ({ insight, me }) {
  const config = {
    destination: '/market',
    buttonText: 'View tradelines that build credit',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-tradelines.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoTradelinesInsight.isCurrentCode = function (code) {
  return code === 1
}
