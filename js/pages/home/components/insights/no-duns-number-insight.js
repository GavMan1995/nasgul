import React from 'react'

import Insight from './insight'

export default function NoDunsNumberInsight ({ insight, me }) {
  const config = {
    destination: `/app/businesses/${insight.insightable.business.id}/duns_registration`,
    buttonText: 'Register for a D-U-N-S&reg; number',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-question.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoDunsNumberInsight.isCurrentCode = function (code) {
  return code === 7
}
