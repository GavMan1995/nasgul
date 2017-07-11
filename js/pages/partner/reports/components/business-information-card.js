import React from 'react'

import prettyMoneyString from '../utils/pretty-money-string'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function BusinessInformationCard ({ report }) {
  const {
    company_identity: identity,
    executive_summary: summary
  } = report.attributes

  const { address } = identity
  const { personnel } = summary

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_briefcase_24x24.svg' />
        </div>
        <h2>Business Information</h2>
      </div>

      <div className='o-enterprise-card'>
        <div className='o-enterprise-card__section-container'>
          <div className='c-list-card-section'>
            <strong>Business Address</strong>
            <p>{`${address.street1 || ''} ${address.street2 || ''}, ${address.city}, ${address.state} ${address.zip}`}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>Date Founded</strong>
            <p>{identity.year_established}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>SIC Code</strong>
            <p>{identity.sic_codes.map((sic) => `${sic.code} - ${sic.description}`)}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>NAICS Code</strong>
            <p>{identity.naics_codes.map((naics) => `${naics.code} - ${naics.description}`)}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>Sales</strong>
            <p>{prettyMoneyString(summary.sales_revenue)}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>Number of Employees</strong>
            <p>{summary.employee_count || 'N/A'}</p>
          </div>

          <div className='c-list-card-section'>
            <strong>Key Personnel</strong>
            <p>{personnel.map((person) => `${person.name} - ${person.title}`).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
