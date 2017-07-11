import React from 'react'

import Insight from './insight'

export default function DerogatoryItemsInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/credit_sweeper',
    buttonText: 'Verify your Experian business report',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-alert.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

DerogatoryItemsInsight.isCurrentCode = function (code) {
  return code === 3
}
