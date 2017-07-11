import React from 'react'

import OfferBottomLink from '../../components/wide-offer-card/offer-bottom-link'
import WideOfferCard from '../../components/wide-offer-card'
import trackClick from '../../track-click'

export default function OfferSummary ({ agentImage, offers, highestMfBelowSixty }) {
  const offerName = offers.map((offer) => offer.offer_type.name)[0]
  const readMoreLink = `/financing-options/details?product_type=${offerName.replace('&', '%26')}`

  let offersList = (
    <div className='c-offer-category__details'>
      <div className='c-offer-category__details-header'>
        <h2><strong>{offerName}</strong></h2>
        <a
          href={readMoreLink}
          onClick={() => trackMoreOffers(offerName)}
          className='c-btn c-btn--primary c-btn--outline c-btn--sm'>
          See All
        </a>
      </div>

      {offers.slice(0, 2).map((offer, index) => {
        return (
          <WideOfferCard
            key={index}
            offer={offer}
            highestMfBelowSixty={highestMfBelowSixty} />
        )
      })}

      <OfferBottomLink agentImage={agentImage} offers={offers} />
    </div>
  )

  if (offers.length === 0) offersList = null

  return offersList
}

function trackMoreOffers (name) {
  trackClick(
    'Offer Summary',
    'Feature Click',
    `See All ${name} Products - Lending`
  )
}
