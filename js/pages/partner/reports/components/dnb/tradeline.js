import React from 'react'

import safeDateString from '../../utils/safe-date-string'
import prettyMoneyString from '../../utils/pretty-money-string'

export default function Tradeline ({ accountNumber, tradeline }) {
  return (
    <div className='o-enterprise-card o-enterprise-card--align-left'>
      <div className='o-enterprise-card__section o-enterprise-card__section--header'>
        <strong>Tradeline {accountNumber}</strong>
      </div>

      <div className='o-enterprise-card__section-container'>
        <div className='c-list-card-section'>
          <strong>High Credit</strong>
          <p>{prettyMoneyString(tradeline.high_credit)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Balance</strong>
          <p>{prettyMoneyString(tradeline.now_owes)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Date Reported</strong>
          <p>{safeDateString(tradeline.reported_at)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Terms</strong>
          <p>{tradeline.selling_terms}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Last Sale Within</strong>
          <p>{tradeline.last_sale_within}</p>
        </div>
      </div>
    </div>
  )
}
