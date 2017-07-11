import React from 'react'

import UccSummaryRow from './ucc-summary-row'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function UccFilingsCard ({ report }) {
  const { executive_summary: summary } = report.attributes
  const { ucc_filings: uccFilings } = summary

  if (uccFilings.total_count < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_paper_24x24.svg' />
        </div>
        <h2>UCC Filings &amp; Summary</h2>
      </div>

      <div className='o-enterprise-card o-enterprise-card--table'>
        <table className='c-table-card-section'>
          <thead>
            <tr className='c-table-card-section__header'>
              <th>Date Range</th>
              <th>Cautionary UCCs</th>
              <th>Total Filed</th>
              <th>Released/Terminated</th>
              <th>Continuous</th>
              <th>Amended/Assigned</th>
            </tr>
          </thead>

          <tbody>
            {uccFilings.summary_counts.map((summary, index) => {
              return <UccSummaryRow key={index} summary={summary} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
