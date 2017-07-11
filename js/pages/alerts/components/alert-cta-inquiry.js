import React from 'react'

import UpgradeCta from './upgrade-cta'
import ViewInquiriesCta from './view-inquiries-cta'

export default function AlertCtaInquiry (props) {
  const { alertCode, planCode } = props

  if (planCode === 'freemium') {
    return (
      <UpgradeCta
        copy='Use Nav’s Premium account to track inquiries and get detailed insights to better manage your credit.'
        trackingLabel='Inquiry'
        trackingClassForOptimizely='js-alert-cta__upgrade--inquiry' />
    )
  } else {
    return (
      <ViewInquiriesCta alertCode={alertCode} />
    )
  }
}
