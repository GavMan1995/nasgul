import React from 'react'

import prettyMoneyString from '../../../../utils/pretty-money-string'
import safeStringToNumber from '../../../../utils/safe-string-to-number'
import dbtColor from '../../../../components/dbt-color'

export default function CreditUtilizationSection ({ report }) {
  const { tradelines } = report.attributes.executive_summary
  const utilization = safeStringToNumber(Math.round(tradelines.total_utilization_ratio))

  return (
    <div className='c-enterprise-score'>
      <div className='c-enterprise-score__section'>
        <div className='c-utilization-bar-section'>
          <h1>{utilization}%</h1>
          <h3>Credit Utilization</h3>
          <div
            className='c-credit-utilization-bar'
            style={{ borderColor: borderColor(utilization) }}>
            <span style={{
              width: `${utilization}%`,
              backgroundColor: dbtColor(utilization)
            }} />
          </div>
        </div>
      </div>

      <div className='c-enterprise-score__section c-enterprise-score__section--align-center'>
        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(tradelines.current_total_balance)}</h4>
          <small>Total Balance (Current)</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(tradelines.single_line_high_credit)}</h4>
          <small>Highest Credit Line</small>
        </div>

        <div className='c-horizontal-list-card-section'>
          <h4>{prettyMoneyString(tradelines.highest_balance_last_six_months)}</h4>
          <small>Total Balance (High)</small>
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
