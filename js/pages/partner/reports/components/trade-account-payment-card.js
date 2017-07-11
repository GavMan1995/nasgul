import React from 'react'

import prettyMoneyString from '../utils/pretty-money-string'
import safeStringToNumber from '../utils/safe-string-to-number'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function TradeAccountPaymentCard ({ report }) {
  const { executive_summary: summary } = report.attributes
  const { payment_totals: paymentTotals } = summary.tradelines

  if (!paymentTotals) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_money_24x24.svg' />
        </div>
        <h2>Trade Account Payment Totals</h2>
      </div>

      <div className='o-enterprise-card o-enterprise-card--table'>
        <table className='c-table-card-section'>
          <thead>
            <tr className='c-table-card-section__header'>
              <th>Type</th>
              <th>Liens</th>
              <th>Recent High Credit</th>
              <th>Balance</th>
              <th>Cur</th>
              <th>1-30</th>
              <th>31-60</th>
              <th>61-90</th>
              <th>91+</th>
            </tr>
          </thead>

          <tbody>
            <tr className='c-table-card-section__row'>
              <td>Newly Reported</td>
              <td>{safeStringToNumber(paymentTotals.newly_reported.total_count)}</td>
              <td>{prettyMoneyString(paymentTotals.newly_reported.highest_credit_last_six_months)}</td>
              <td>{prettyMoneyString(paymentTotals.newly_reported.balance)}</td>
              <td>{`${safeStringToNumber(paymentTotals.newly_reported.current_payment_percent)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.newly_reported.days_beyond_terms_30_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.newly_reported.days_beyond_terms_60_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.newly_reported.days_beyond_terms_90_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.newly_reported.days_beyond_terms_over_90_days)}%`}</td>
            </tr>

            <tr className='c-table-card-section__row'>
              <td>Continuously Reported</td>
              <td>{safeStringToNumber(paymentTotals.continuously_reported.total_count)}</td>
              <td>{prettyMoneyString(paymentTotals.continuously_reported.highest_credit_last_six_months)}</td>
              <td>{prettyMoneyString(paymentTotals.continuously_reported.balance)}</td>
              <td>{`${safeStringToNumber(paymentTotals.continuously_reported.current_payment_percent)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.continuously_reported.days_beyond_terms_30_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.continuously_reported.days_beyond_terms_60_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.continuously_reported.days_beyond_terms_90_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.continuously_reported.days_beyond_terms_over_90_days)}%`}</td>
            </tr>

            <tr className='c-table-card-section__row'>
              <td>Total Reported</td>
              <td>{safeStringToNumber(paymentTotals.total_reported.total_count)}</td>
              <td>{prettyMoneyString(paymentTotals.total_reported.highest_credit_last_six_months)}</td>
              <td>{prettyMoneyString(paymentTotals.total_reported.balance)}</td>
              <td>{`${safeStringToNumber(paymentTotals.total_reported.current_payment_percent)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.total_reported.days_beyond_terms_30_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.total_reported.days_beyond_terms_60_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.total_reported.days_beyond_terms_90_days)}%`}</td>
              <td>{`${safeStringToNumber(paymentTotals.total_reported.days_beyond_terms_over_90_days)}%`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
