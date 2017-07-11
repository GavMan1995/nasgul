import React from 'react'

import Insight from './insight'

export default function LatePaymentsInsight ({ insight, me }) {
  const config = {
    destination: '/app/build/credit_sweeper',
    buttonText: 'Verify your report information',
    icon: 'https://dxkdvuv3hanyu.cloudfront.net/icons/nav-tears.svg'
  }

  return <Insight config={config} insight={insight} me={me} />
}

LatePaymentsInsight.isCurrentCode = function (code) {
  return code === 12
}
