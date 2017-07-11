import React from 'react'

import Insight from './insight'

export default function NoDandBFileInsight ({ insight, me }) {
  const config = {
    destination: '/market',
    buttonText: 'View tradelines that build credit',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-no-score.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

NoDandBFileInsight.isCurrentCode = function (code) {
  return code === 10
}
