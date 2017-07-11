import React from 'react'

import safeDateString from '../../utils/safe-date-string'

export default function UccFiling ({ uccFiling }) {
  return (
    <div className='o-enterprise-card o-enterprise-card--align-left'>
      <div className='o-enterprise-card__section o-enterprise-card__section--header'>
        <strong>{uccFiling.filing_office}</strong>
      </div>

      <div className='o-enterprise-card__section-container'>
        <div className='c-list-card-section'>
          <strong>Collateral</strong>
          <p>{uccFiling.collaterals.join(' & ')}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Secured Party Details</strong>
          <p>{uccFiling.secured_party}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Debtor Details</strong>
          <p>{uccFiling.debtor}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Filed On</strong>
          <p>{safeDateString(uccFiling.file_date)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Document Number</strong>
          <p>{uccFiling.document_number}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Status</strong>
          <p>{uccFiling.status}</p>
        </div>
      </div>
    </div>
  )
}
