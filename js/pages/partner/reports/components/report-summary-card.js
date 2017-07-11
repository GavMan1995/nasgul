import React from 'react'

import prettyMoneyString from '../utils/pretty-money-string'
import safeStringToNumber from '../utils/safe-string-to-number'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function ReportSummaryCard ({ report }) {
  const {
    bankruptcies,
    collections,
    executive_summary: summary,
    judgments,
    tax_liens: taxLiens,
    ucc_filings: uccFilings
  } = report.attributes

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_more_24x24.svg' />
        </div>
        <h2>Summary</h2>
      </div>

      <div className='o-enterprise-card'>
        <div className='o-enterprise-card__section o-enterprise-card__section--full-width-mobile'>
          <h4><strong>
            Days Beyond Terms
          </strong></h4>
        </div>
        <div className='o-enterprise-card__section-container o-enterprise-card__section-container--beyond-terms-summary'>
          <div className='c-beyond-terms-summary-card-section'>
            <h3>{safeStringToNumber(summary.tradelines.current_days_beyond_terms)}</h3>
            <p>Current Days Beyond Terms</p>
          </div>

          <div className='c-beyond-terms-summary-card-section'>
            <h3>{safeStringToNumber(summary.tradelines.average_days_beyond_terms)}</h3>
            <p>Monthly Average DBT</p>
          </div>

          <div className='c-beyond-terms-summary-card-section'>
            <h3>{safeStringToNumber(summary.tradelines.highest_days_beyond_terms_last_six_months)}</h3>
            <p>Highest DBT Previous 6 Months</p>
          </div>

          <div className='c-beyond-terms-summary-card-section'>
            <h3>{safeStringToNumber(summary.tradelines.highest_days_beyond_terms_last_five_quarters)}</h3>
            <p>Highest DBT Previous 5 Quarters</p>
          </div>
        </div>
      </div>

      <div className='o-enterprise-card'>
        <div className='o-enterprise-card__section o-enterprise-card__section--full-width-mobile'>
          <h4><strong>
            Tradelines
          </strong></h4>
        </div>
        <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
          <div className='c-tradelines-card-section'>
            <p><strong>Active Payment Tradelines</strong></p>
            <span>{safeStringToNumber(summary.tradelines.active_tradelines)}</span>
          </div>
          <div className='c-tradelines-card-section'>
            <p><strong>Total Payment Tradelines</strong></p>
            <span>{safeStringToNumber(summary.tradelines.total_count)}</span>
          </div>
        </div>
        <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
          <div className='c-horizontal-list-card-section'>
            <small>Balance of All Tradelines</small>
            <h3>{prettyMoneyString(summary.tradelines.current_total_balance)}</h3>
          </div>
          <div className='c-horizontal-list-card-section'>
            <small>Highest 6 Month Balance</small>
            <h3>{prettyMoneyString(summary.tradelines.highest_balance_last_six_months)}</h3>
          </div>
          <div className='c-horizontal-list-card-section'>
            <small>Lowest 6 Month Balance</small>
            <h3>{prettyMoneyString(summary.tradelines.lowest_balance_last_six_months)}</h3>
          </div>
        </div>
      </div>

      <div className='o-enterprise-card'>
        <div className='o-enterprise-card__section o-enterprise-card__section--full-width-mobile'>
          <h4><strong>
            Judgements &amp; Filings
          </strong></h4>
        </div>
        <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
          <div className='c-list-card-section c-list-card-section--align-strong-right'>
            <p>Bankruptcy Filings</p>
            <strong>{bankruptcies.length}</strong>
          </div>
          <div className='c-list-card-section c-list-card-section--align-strong-right'>
            <p>Tax Lien Filings</p>
            <strong>{taxLiens.length}</strong>
          </div>
          <div className='c-list-card-section c-list-card-section--align-strong-right'>
            <p>Judgement Filings</p>
            <strong>{judgments.length}</strong>
          </div>
          <div className='c-list-card-section c-list-card-section--align-strong-right'>
            <p>Total Collections</p>
            <strong>{collections.length}</strong>
          </div>
          <div className='c-list-card-section c-list-card-section--align-strong-right'>
            <p>UCC Filings</p>
            <strong>{uccFilings.length}</strong>
          </div>
        </div>

        <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
          <div className='c-horizontal-list-card-section'>
            <small>Sum of Legal Filings</small>
            <h3>{prettyMoneyString(summary.legal_filings_total_balance)}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
