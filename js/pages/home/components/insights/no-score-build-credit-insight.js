import React from 'react'

import Insight from './insight'

export default function NoScoreBuildCreditInsight ({ insight, me }) {
  const config = {
    destination: '/market?traits[]=Credit%20Builder:Credit%20Builder',
    buttonText: 'View tradelines that build credit',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-ghost.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoScoreBuildCreditInsight.isCurrentCode = function (code) {
  return code === 4
}
