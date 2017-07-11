import React from 'react'

import UccFiling from './ucc-filing'
import CDNIcon from '../../../../../common/components/cdn-icon'

export default function UccFilingsCard ({ report }) {
  const {
    ucc_filings: uccFilings
  } = report.attributes

  if (uccFilings.length < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_paper_24x24.svg' />
        </div>
        <h2>UCC Filings &amp; Summary</h2>
      </div>

      {uccFilings.map((uccFiling, index) => {
        return <UccFiling key={index} uccFiling={uccFiling} />
      })}
    </div>
  )
}
