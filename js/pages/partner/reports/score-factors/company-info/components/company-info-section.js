import React from 'react'

import prettyMoneyString from '../../../utils/pretty-money-string'

export default function CompanyInfoSection ({ report }) {
  const {
    company_identity: identity,
    executive_summary: summary
  } = report.attributes

  return (
    <div className='c-enterprise-business-info'>
      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>
            {identity.years_in_business} years in business
          </strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          The longer you have been in business the better when it comes to
          business credit. Lenders, suppliers, and customers in this category
          want to know whether or not you'll still be in business down the road.
          A longer history is indicative of continued success and business
          longevity.
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>
            {summary.employee_count || 0} employees
          </strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          Banks, suppliers, and customers may look to your number of employees
          as an indication of your business's financial stability and ability to
          continue operations. Make sure this number is accurate.
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>SIC Code: {identity.sic_codes.map((sic) => `${sic.code} - ${sic.description}`).join(', ')}</strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          An SIC code is a 4-digit numerical code assigned to businesses by the
          U.S. government in order to identify the main activity of the
          business. Make sure that this code accurately describes your business
          activity.
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>NAICS Code: {identity.naics_codes.map((naics) => `${naics.code} - ${naics.description}`).join(', ')}</strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          An NAICS code is a 6-digit code system that is currently the standard
          used by federal statistical agencies in classifying business
          establishments. Make sure that this code accurately describes your
          business industry.
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>Revenue:</strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          {prettyMoneyString(summary.sales_revenue)}
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>Phone:</strong>
        </h4>

        <p className='c-enterprise-business-info__section-info'>
          {identity.phone || 'N/A'}
        </p>
      </div>

      <div className='c-enterprise-business-info__section'>
        <h4 className='c-enterprise-business-info__section-header'>
          <strong>Address:</strong>
        </h4>

        <div className='c-enterprise-business-info__section-info'>
          <p>{`${identity.address.street1 || ''} ${identity.address.street2 || ''}, ${identity.address.city}, ${identity.address.state} ${identity.address.zip}`}</p>
          <p>
            Lenders, Suppliers, and customers will want to contact you. Make
            sure your contact information is correct and professional. A cell
            phone voicemail is unprofessional and may raise a red flag when
            banks, suppliers and customers contact your business.
          </p>
        </div>
      </div>
    </div>
  )
}
