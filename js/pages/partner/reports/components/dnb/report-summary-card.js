import React from 'react'

import prettyMoneyString from '../../utils/pretty-money-string'
import safeStringToNumber from '../../utils/safe-string-to-number'
import CDNIcon from '../../../../../common/components/cdn-icon'

export default function ReportSummaryCard ({ report }) {
  const {
    executive_summary: summary,
    payment_experiences: tradelines,
    judgments,
    tax_liens: taxLiens,
    suits
  } = report.attributes

  // TODO make this not suck by calculating it on the backend
  const totalTradelineBalance = tradelines.reduce((acc, tradeline) => {
    return safeStringToNumber(tradeline.now_owes) + acc
  }, 0)
  const tradelineBalances = tradelines.map((tradeline) => {
    return safeStringToNumber(tradeline.now_owes)
  }, 0)
  // If the array is empty Math.max returns -Infinity
  const highestTradelineBalance = tradelineBalances.length < 1 ? 0 : Math.max(...tradelineBalances)
  const totalJudgmentsBalance = judgments.reduce((acc, item) => {
    return safeStringToNumber(item.award) + acc
  }, 0)
  const totalSuitsBalance = suits.reduce((acc, item) => {
    return safeStringToNumber(item.amount) + acc
  }, 0)
  const totalTaxliensBalance = taxLiens.reduce((acc, item) => {
    return safeStringToNumber(item.amount) + acc
  }, 0)
  const sumOfLegalFilings = totalJudgmentsBalance + totalSuitsBalance + totalTaxliensBalance

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_more_24x24.svg' />
        </div>
        <h2>Summary</h2>
      </div>

      <div className='o-enterprise-card'>
        <div className='o-enterprise-card__section-container'>
          <div className='c-horizontal-list-card-section'>
            <h4>{safeStringToNumber(summary.payment_experiences.total_payment_experience_received)}</h4>
            <small>Active Payment Tradelines</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{prettyMoneyString(totalTradelineBalance)}</h4>
            <small>Balance of All Tradelines</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{prettyMoneyString(highestTradelineBalance)}</h4>
            <small>High Balance of All Tradelines</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{prettyMoneyString(summary.total_asset_amount)}</h4>
            <small>Total Assets</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{prettyMoneyString(summary.total_liabilities_amount)}</h4>
            <small>Total Liabilities</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{safeStringToNumber(summary.tax_liens.total_count)}</h4>
            <small>Tax Lien Filings</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{safeStringToNumber(summary.judgments.total_count)}</h4>
            <small>Judgment Filings</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{safeStringToNumber(summary.suits.total_count)}</h4>
            <small>Lawsuit Filings</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{prettyMoneyString(sumOfLegalFilings)}</h4>
            <small>Sum of Legal Filings</small>
          </div>
          <div className='c-horizontal-list-card-section'>
            <h4>{safeStringToNumber(summary.ucc_filings.total_count)}</h4>
            <small>UCC Filings</small>
          </div>
        </div>
      </div>
    </div>
  )
}
