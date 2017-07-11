import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

import ScoreFactorLink from './score-factor-link'

export default function ScoreSectionScoreFactors ({ report }) {
  let paymentTrends = null

  if (report.type === 'experian_business_report') {
    paymentTrends = (
      <ScoreFactorLink
        className='c-enterprise-score-factor'
        report={report}
        target='payment-trends'>
        <p>Payment Trends</p>
        <div className='c-enterprise-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>
    )
  }

  return (
    <div className='c-enterprise-score__section c-enterprise-score__section--score-factors'>
      <h4 className='c-enterprise-score-factor-header'>
        Score Factors
      </h4>
      <ScoreFactorLink
        className='c-enterprise-score-factor'
        report={report}
        target='payment-status'>
        <p>Payment Status</p>
        <div className='c-enterprise-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>

      <ScoreFactorLink
        className='c-enterprise-score-factor'
        report={report}
        target='derogatories'>
        <p>Derogatories</p>
        <div className='c-enterprise-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>

      <ScoreFactorLink
        className='c-enterprise-score-factor'
        report={report}
        target='credit-utilization'>
        <p>Credit Utilization</p>
        <div className='c-enterprise-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>

      {paymentTrends}

      <ScoreFactorLink
        className='c-enterprise-score-factor'
        report={report}
        target='company-info'>
        <p>Company Info</p>
        <div className='c-enterprise-score-factor__status'>
          <p><strong>&nbsp;</strong></p>
          <CDNAsset directory='icons' filename='chevron-right--gray.svg' />
        </div>
      </ScoreFactorLink>
    </div>
  )
}
