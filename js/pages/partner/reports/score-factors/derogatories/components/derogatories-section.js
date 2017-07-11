import React from 'react'

import safeStringToNumber from '../../../utils/safe-string-to-number'

export default function DerogatoriesSection ({ report }) {
  const { executive_summary: summary } = report.attributes
  const collectionsCount = summary.collections ? summary.collections.total_count : 0

  let collections
  if (summary.collections) {
    collections = (
      <div className='c-horizontal-list-card-section'>
        <h4>{safeStringToNumber(collectionsCount)}</h4>
        <small>Collections</small>
      </div>
    )
  }

  let derogCollateral = (
    <div className='c-horizontal-list-card-section'>
      <h4>0</h4>
      <small>Derogatory UCCs</small>
    </div>
  )

  if (summary.ucc_filings.total_derogatories) {
    derogCollateral = (
      <div className='c-horizontal-list-card-section'>
        <h4>{safeStringToNumber(summary.ucc_filings.total_derogatories)}</h4>
        <small>Derogatory UCCs</small>
      </div>
    )
  }

  let bankruptcies
  if (summary.bankruptcies.total_count) {
    bankruptcies = (
      <div className='c-horizontal-list-card-section'>
        <h4>{safeStringToNumber(summary.bankruptcies.total_count)}</h4>
        <small>Bankruptcies</small>
      </div>
    )
  }

  return (
    <div className='c-enterprise-score'>
      <div className='o-enterprise-card__section-container'>
        <div className='c-horizontal-list-card-section'>
          <h4>{safeStringToNumber(summary.tax_liens.total_count)}</h4>
          <small>Tax Liens</small>
        </div>

        {bankruptcies}

        <div className='c-horizontal-list-card-section'>
          <h4>{safeStringToNumber(summary.judgments.total_count)}</h4>
          <small>Judgments</small>
        </div>

        {collections}
        {derogCollateral}

        <div className='c-horizontal-list-card-section-placeholder' />
        <div className='c-horizontal-list-card-section-placeholder' />
      </div>
    </div>
  )
}
