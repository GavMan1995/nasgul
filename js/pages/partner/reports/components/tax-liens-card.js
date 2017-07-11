import React from 'react'

import TaxLien from './tax-lien'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function TaxLiensCard ({ report }) {
  const { tax_liens: taxLiens } = report.attributes

  if (!taxLiens || taxLiens.length < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_law_24x24.svg' />
        </div>
        <h2>Tax Liens</h2>
      </div>

      {taxLiens.map((taxLien, index) => {
        return <TaxLien key={index} taxLien={taxLien} />
      })}
    </div>
  )
}
