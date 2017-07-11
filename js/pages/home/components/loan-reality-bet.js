import React from 'react'

import CDNAsset from '../../../common/components/cdn-asset'

export default function LoanRealityBet () {
  return (
    <div className='o-container o-container--sm-spacing'>
      <div className='c-card c-home-lrc-bet-spacing'>
        <div className='c-loan-reality-card__title--center'>
          <h3><strong>See Your Borrowing Power</strong></h3>
        </div>
        <CDNAsset
          directory='images/loan-reality'
          filename='loan-reality-cta.png' />
        <div data-flex--item='full' data-flex--container='true'>
          <button
            data-flex--item='pull--center'
            className='c-btn c-btn--l'
            onClick={() => { window.location.href = '/loan-reality' }}>
            Get started for free
          </button>
        </div>
      </div>
    </div>
  )
}
