import React from 'react'

import CDNIcon from '../../../../common/components/cdn-icon'

export default function InfluencingFactorsCard ({ report }) {
  const { score_factors: scoreFactors } = report.attributes

  if (!scoreFactors) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_key-2_24x24.svg' />
        </div>
        <h2>Here are the factors influencing your score</h2>
      </div>

      <div className='o-enterprise-card'>
        <ol className='c-ordered-list-card-section'>
          {scoreFactors.map((factor, index) => {
            return (
              <li key={index}>{factor.description}</li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
