import React from 'react'

import FinancingOfferCta from './financing-offer-cta'
import UpgradeCta from './upgrade-cta'
import CallAgentCta from './call-agent-cta'

export default function AlertCtaHighUtilization (props) {
  const { alertOffer, personalScores, planCode } = props

  const scores = personalScores.map((report) => report.score)
  const lowestScore = Math.min.apply(Math, scores)

  if (!alertOffer) {
    props.getAlertOffer()
    return null
  } else {
    if (alertOffer.relevance > 70) {
      return (
        <FinancingOfferCta offer={alertOffer} />
      )
    } else if (lowestScore <= 620 && planCode === 'freemium') {
      return (
        <UpgradeCta
          copy='Your utilization and credit score need some work. Nav Premium provides in-depth reports and insights, so you can get on the right track.'
          trackingLabel='High Utilization'
          trackingClassForOptimizely='js-alert-cta__upgrade--high-utilization' />
      )
    } else {
      return <CallAgentCta />
    }
  }
}
