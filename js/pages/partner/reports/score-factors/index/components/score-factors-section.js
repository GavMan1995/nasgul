import React from 'react'

import CDNAsset from '../../../../../../common/components/cdn-asset'
import CDNIcon from '../../../../../../common/components/cdn-icon'
import ScoreFactorLink from '../../../components/score-factor-link'

export default function ScoreFactorsSection ({ report }) {
  let paymentTrends = null

  if (report.type === 'experian_business_report') {
    paymentTrends = (
      <ScoreFactorLink
        className='c-enterprise-card-score-factor'
        report={report}
        target='payment-trends'>
        <p>10% Payment Trends</p>
        <div className='c-enterprise-card-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>
    )
  }

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_binoculars_24x24.svg' />
        </div>
        <h2>Score Factors</h2>
      </div>

      <div className='o-enterprise-card'>
        <ScoreFactorLink
          className='c-enterprise-card-score-factor'
          report={report}
          target='payment-status'>
          <p>50% Payment Status</p>
          <div className='c-enterprise-card-score-factor__status'>
            <p><strong>&nbsp;</strong></p>
            <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
          </div>
        </ScoreFactorLink>

        <ScoreFactorLink
          className='c-enterprise-card-score-factor'
          report={report}
          target='derogatories'>
          <p>15% Derogatories</p>
          <div className='c-enterprise-card-score-factor__status'>
            <p><strong>&nbsp;</strong></p>
            <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
          </div>
        </ScoreFactorLink>

        <ScoreFactorLink
          className='c-enterprise-card-score-factor'
          report={report}
          target='credit-utilization'>
          <p>15% Credit Utilization</p>
          <div className='c-enterprise-card-score-factor__status'>
            <p><strong>&nbsp;</strong></p>
            <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
          </div>
        </ScoreFactorLink>

        {paymentTrends}

        <ScoreFactorLink
          className='c-enterprise-card-score-factor'
          report={report}
          target='company-info'>
          <p>10% Company Info</p>
          <div className='c-enterprise-card-score-factor__status'>
            <p><strong>&nbsp;</strong></p>
            <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
          </div>
        </ScoreFactorLink>
      </div>
    </div>
  )
}
