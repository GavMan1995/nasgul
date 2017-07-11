import React from 'react'

import capitalize from 'lodash.capitalize'
import safeDateString from '../utils/safe-date-string'
import prettyMoneyString from '../utils/pretty-money-string'

export default function TaxLien ({ taxLien }) {
  return (
    <div className='o-enterprise-card o-enterprise-card--align-left'>
      <div className='o-enterprise-card__section o-enterprise-card__section--header'>
        <strong>{taxLien.jurisdiction || taxLien.filing_office_details}</strong>
      </div>

      <div className='o-enterprise-card__section-container'>
        <div className='c-list-card-section'>
          <strong>Date Filed:</strong>
          <p>{safeDateString(taxLien.file_date)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Filing Type:</strong>
          <p>{taxLien.filing_type.split('_').map(capitalize).join(' ')}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Status:</strong>
          <p>{capitalize(taxLien.status)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Amount:</strong>
          <p>{prettyMoneyString(taxLien.amount)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Filing Number:</strong>
          <p>{taxLien.document_number || taxLien.filing_number}</p>
        </div>
      </div>
    </div>
  )
}
