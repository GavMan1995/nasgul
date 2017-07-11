import React from 'react'

import prettyMoneyString from '../../../../utils/pretty-money-string'
import safeStringToNumber from '../../../../utils/safe-string-to-number.js'
import dbtColor from '../../../../components/dbt-color'

export default function CreditUtilizationSection ({ report }) {
  const { payment_experiences: tradelinesSummary } = report.attributes.executive_summary
  const { payment_experiences: tradelines } = report.attributes

  const totalBalance = tradelines.reduce((acc, tradeline) => {
    return safeStringToNumber(tradeline.now_owes) + acc
  }, 0)
  const totalCredit = tradelines.reduce((acc, tradeline) => {
    return safeStringToNumber(tradeline.high_credit) + acc
  }, 0)
  const totalCreditAmounts = tradelines.map((tradeline) => {
    return safeStringToNumber(tradeline.high_credit)
  }, 0)
  const highestCreditAmount = Math.max(...totalCreditAmounts)
  const utilitzation = safeStringToNumber(Math.floor((totalBalance / totalCredit) * 100))

  return (
    <div className='c-enterprise-score'>
      <div className='c-enterprise-score__section'>
        <div className='c-utilization-bar-section'>
          <h1>{utilitzation}%</h1>
          <h3>Credit Utilization</h3>
          <div
            className='c-credit-utilization-bar'
            style={{ borderColor: borderColor(utilitzation) }}>
            <span style={{
              width: `${utilitzation}%`,
              backgroundColor: dbtColor(utilitzation)
            }} />
          </div>
        </div>
      </div>

      <div className='c-enterprise-score__section c-enterprise-score__section--align-center'>
        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(totalBalance)}</h4>
          <small>Total Balance (Current)</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(tradelinesSummary.average_high_credit)}</h4>
          <small>Average Credit Line</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(highestCreditAmount)}</h4>
          <small>Highest Credit Line</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(totalCredit)}</h4>
          <small>Total Credit (High)</small>
        </div>
      </div>
    </div>
  )

  function borderColor (util) {
    if (util > 80) {
      return 'rgba(237, 25, 63, 0.2)'
    } else if (util > 60) {
      return 'rgba(249, 160, 0, 0.2)'
    } else if (util > 40) {
      return 'rgba(255, 199, 9, 0.2)'
    } else if (util > 20) {
      return 'rgba(129, 234, 172, 0.2)'
    } else if (util >= 0) {
      return 'rgba(0, 187, 123, 0.2)'
    } else {
      return '#8A9097'
    }
  }
}
