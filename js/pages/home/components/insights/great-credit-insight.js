import React from 'react'

import Insight from './insight'

export default function GreatCreditInsight ({ insight, me }) {
  const config = {
    destination: '/app/upgrade/premium_plus',
    buttonText: 'Check your SBSS score now',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-search.svg' // TODO replace with correct svg!
  }

  return <Insight config={config} insight={insight} me={me} />
}

GreatCreditInsight.isCurrentCode = function (code) {
  return code === 28
}
