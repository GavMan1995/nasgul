import React from 'react'

import prettyMoneyString from '../../../../utils/pretty-money-string'
import safeStringToNumber from '../../../../utils/safe-string-to-number'

export default function PaymentStatusSection ({ report }) {
  const {
    payment_experiences: paymentExperiencesSummary
  } = report.attributes.executive_summary
  const {
    payment_experiences: paymentExperiences
  } = report.attributes

  const activeTradelines = safeStringToNumber(paymentExperiencesSummary.total_payment_experience_received)
  const totalBalance = paymentExperiences.reduce((acc, tradeline) => {
    return safeStringToNumber(tradeline.now_owes) + acc
  }, 0)

  return (
    <div className='c-enterprise-score'>
      <div className='c-enterprise-score__section c-enterprise-score__section--align-center'>
        <div className='c-horizontal-list-card-section'>
          <h4>{activeTradelines}</h4>
          <small>Active Accounts</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(totalBalance)}</h4>
          <small>Balance of Accounts</small>
        </div>
      </div>
    </div>
  )
}
