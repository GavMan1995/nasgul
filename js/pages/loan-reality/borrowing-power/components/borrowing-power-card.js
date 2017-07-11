import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

export default function BorrowingPowerCard (props) {
  const { accountId, borrowingLimitValue, report } = props

  return (
    <div className='c-card c-loan-reality-card'>
      <h3 className='c-loan-reality-card__title--center'>
        Your Company's Estimated Borrowing Power
      </h3>
      <div className='c-loan-reality__borrowing-power'>
        ${borrowingLimitValue.toLocaleString('en-US')}
      </div>

      <div className='c-loan-reality-card__borrowing-power-link'>
        <a
          href='/loan-reality/borrowing-power/learn-more'
          onClick={trackLearnMore}>
          Learn More
        </a>
      </div>

      <div className='c-loan-reality-card__borrowing-power-image-wrapper'>
        <CDNAsset
          className='c-loan-reality-card__borrowing-power-image'
          directory='images/loan-reality'
          filename={report.gaugeImage} />
      </div>
      <div className={`${report.gaugeTextClass} c-loan-reality-card__borrowing-power-label`}>
        {report.gaugeText}
      </div>
      <p className='c-loan-reality-card__borrowing-power-text'>
        {report.borrowingPowerText}
      </p>
      <a
        href={`/loan-reality/details-menu?accountId=${accountId}`}
        className='c-btn c-btn--l'
        onClick={track}>
        See Your Reality Check Details
      </a>
      <div className='c-loan-reality-card__answer-error' />
    </div>
  )
}

function track () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'borrowing_power:details',
    name: 'borrowing_power:details'
  })
}

function trackLearnMore () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'borrowing_power:learn_more',
    name: 'borrowing_power:learn_more'
  })
}
