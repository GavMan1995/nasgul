import React from 'react'

import safeDateString from '../utils/safe-date-string'

export default function UccSummaryRow ({ summary }) {
  const starDateString = safeDateString(summary.start_date)
  const endDateString = safeDateString(summary.end_date)
  const dateRangeString = `${starDateString} - ${endDateString}`

  return (
    <tr className='c-table-card-section__row'>
      <td>{dateRangeString}</td>
      <td>{summary.derogatory_filings}</td>
      <td>{summary.total_filings}</td>
      <td>{summary.releases_and_terminations}</td>
      <td>{summary.continuations}</td>
      <td>{summary.amended_and_assigned}</td>
    </tr>
  )
}
