import React from 'react'

import Insight from './insight'

export default function NoTradelinesBuildCreditInsight ({ insight, me }) {
  const config = {
    destination: '/market?traits[]=Credit%20Builder:Credit%20Builder',
    buttonText: 'View tradelines that build credit',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-tradelines.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoTradelinesBuildCreditInsight.isCurrentCode = function (code) {
  return code === 5
}
