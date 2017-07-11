import React from 'react'

import NoResultError from './no-results-error'
import OfferSummary from './offer-summary'

export default function OfferResults (props) {
  const {
    agentImage,
    loanTypesCount,
    offers,
    offersByType
  } = props

  const highestMfBelowSixty = offers[0].relevance <= 60

  let loanCountMessage = `There are ${loanTypesCount} different types of loans for you!`

  if (loanTypesCount === 1) loanCountMessage = 'There is 1 type of loan for you!'

  if (loanTypesCount === 0) return <NoResultError />

  return (
    <div className={`c-offer-listing ${highestMfBelowSixty ? 'c-offer-listing--low-mf' : ''}`}>
      <span
        style={!highestMfBelowSixty ? {display: 'none'} : {}}
        className='c-offer-listing__overlay' />
      <h1 className='c-offer-header'>
        {loanCountMessage}
      </h1>
      <p className='c-offer-sub-header'>
        Update the search criteria and we'll show you the best
        financing options for your business. A higher MatchFactor %
        means you're more compatible, and more likely to be approved.
      </p>
      {Object.keys(offersByType).map((offerType, index) => {
        return (
          <OfferSummary
            key={index}
            agentImage={agentImage}
            offers={offersByType[offerType]}
            highestMfBelowSixty={highestMfBelowSixty} />
        )
      })}
    </div>
  )
}
