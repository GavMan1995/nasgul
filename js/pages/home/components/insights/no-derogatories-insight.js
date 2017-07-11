import React from 'react'

import Insight from './insight'

export default function NoDerogatoriesInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/credit_sweeper',
    buttonText: 'Verify your Experian Business Report information',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-sparkle.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoDerogatoriesInsight.isCurrentCode = function (code) {
  return code === 21
}
