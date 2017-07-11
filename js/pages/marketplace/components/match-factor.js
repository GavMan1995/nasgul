import React from 'react'

export default function MatchFactor ({ offer }) {
  return (
    <div>
      <div className='c-mf-score__factor-icon'>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Card.svg' />
      </div>
      <div className='c-mf-score__factor-percent'>
        {offer.relevance}
        <span> %</span>
      </div>
      <span className='c-mf-score__factor-label'>
        MATCH FACTOR
      </span>
      <div className='c-mf-score__factor-link'>
        <span>&rsaquo;</span>
        <span>&rsaquo;</span>
      </div>
    </div>
  )
}
