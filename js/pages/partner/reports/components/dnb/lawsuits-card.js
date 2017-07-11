import React from 'react'

import Lawsuit from './lawsuit'
import CDNIcon from '../../../../../common/components/cdn-icon'

export default function LawsuitsCard ({ report }) {
  const {
    suits
  } = report.attributes

  if (suits.length < 1) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_law_24x24.svg' />
        </div>
        <h2>Lawsuits</h2>
      </div>

      {suits.map((suit, index) => {
        return <Lawsuit key={index} lawsuit={suit} />
      })}
    </div>
  )
}
