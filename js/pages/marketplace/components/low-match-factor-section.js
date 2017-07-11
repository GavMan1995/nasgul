import React from 'react'

import InternalLowMFMessage from './internal-low-mf-message'
import ExternalLowMFMessage from './external-low-mf-message'

export default function LowMatchFactorSection (props) {
  const { personalOffers, personalScores, showOffers, toggleOffers } = props

  let highestMfBelowSixty = (
    personalOffers.length > 0 && personalOffers[0].relevance <= 60
  )
  let score = personalScores[0].score
  let mfMessage
  let showOfferBar

  if (highestMfBelowSixty && score < 640) {
    mfMessage = <ExternalLowMFMessage personalScores={personalScores} />
  }

  if (highestMfBelowSixty && score > 640) mfMessage = <InternalLowMFMessage />

  if (!showOffers) {
    showOfferBar = (
      <div className='c-show-offer-bar' onClick={toggleOffers}>
        See all lending offers
      </div>
    )
  }

  return (
    <div className='c-low-mf-container'>
      {mfMessage}
      {showOfferBar}
    </div>
  )
}
