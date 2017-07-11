import React from 'react'

import prettyMoneyString from '../../utils/pretty-money-string'
import safeDateString from '../../utils/safe-date-string'

export default function Lawsuit ({ lawsuit }) {
  return (
    <div className='o-enterprise-card o-enterprise-card--align-left'>
      <div className='o-enterprise-card__section o-enterprise-card__section--header'>
        <strong>{lawsuit.filing_office_details}</strong>
      </div>

      <div className='o-enterprise-card__section-container'>

        <div className='c-list-card-section'>
          <strong>Plaintiff Details</strong>
          <p>{lawsuit.plaintiff_details}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Defendant Details</strong>
          <p>{lawsuit.defendant_details}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Filed On</strong>
          <p>{safeDateString(lawsuit.file_date)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Docket Number</strong>
          <p>{lawsuit.document_number}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Status</strong>
          <p>{lawsuit.status}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Amount</strong>
          <p>{prettyMoneyString(lawsuit.amount)}</p>
        </div>
      </div>
    </div>
  )
}
