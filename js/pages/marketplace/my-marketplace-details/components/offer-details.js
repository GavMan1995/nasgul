import React from 'react'

import OfferBottomLink from '../../components/wide-offer-card/offer-bottom-link'
import WideOfferCard from '../../components/wide-offer-card'
import trackClick from '../../track-click'

export default function OfferDetails ({ agentImage, offers }) {
  const highestMfBelowSixty = offers[0].relevance <= 60

  if (offers.length > 0) {
    return (
      <div className={`c-offer-listing ${highestMfBelowSixty ? 'c-offer-listing--low-mf' : ''}`}>
        <span
          style={!highestMfBelowSixty ? {display: 'none'} : {}}
          className='c-offer-listing__overlay' />
        {offers.map((offer, index) => {
          if ((index + 1) % 3 === 0) {
            return (
              <div key={index}>
                <WideOfferCard
                  offer={offer}
                  highestMfBelowSixty={highestMfBelowSixty} />
                <OfferBottomLink agentImage={agentImage} />
              </div>
            )
          }
          return (
            <WideOfferCard
              key={index}
              offer={offer}
              highestMfBelowSixty={highestMfBelowSixty} />
          )
        })}
      </div>
    )
  }

  return (
    <div className='o-full-width-container'>
      <div className='c-warning-box'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
          className='c-warning-box__image' />
        <div className='c-warning-box__copy'>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/attetion_80x80.svg'
            className='c-warning-box__image' />
          <h3>We have hundreds of options, but none fit your criteria.</h3>
          <p>Refine your search and we'll match you to the best.</p>
          <p>Or call one of our Credit and Lending experts who can help:</p>
          <div className='c-warning-box__cta'>
            <a
              href='https://app.hubspot.com/meetings/nav/business-financing-consultation-lse'
              target='_blank'
              onClick={() => trackLowMFOpenAgent('Schedule a Call - Low MF Lending')}
              className='c-btn c-btn--primary'>
              Schedule A Call
            </a>
            <p>or call now <a href='tel:8446362445' onClick={() => trackLowMFCallNow('Call Now - Low MF Lending')}>
              844-636-2445</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function trackLowMFOpenAgent (name) {
  trackClick('Low MF Card', 'Feature Click', name)
}

function trackLowMFCallNow (name) {
  trackClick('Low MF Card', 'Feature Click', name)
}
