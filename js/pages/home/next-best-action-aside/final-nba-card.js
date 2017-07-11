import React, { Component } from 'react'

import CallUsCard from './components/call-us-card'
import LoaderCard from '../../../common/components/loader-card'
import OfferResultsCard from './components/offer-results-card'

export default class FinalNbaCard extends Component {
  render () {
    const { asideOffers, asideOffersLoaded } = this.props

    if (!asideOffersLoaded) return <LoaderCard text='Searching offers...' />

    const cardOffersCount = offerCountByCategory(asideOffers, 'Credit Cards')
    const lendingOffersCount = offerCountByCategory(asideOffers, 'Lending')

    if (cardOffersCount > 0 || lendingOffersCount > 0) {
      return (
        <OfferResultsCard
          cardOffersCount={cardOffersCount}
          lendingOffersCount={lendingOffersCount} />
      )
    }

    return <CallUsCard />
  }

  componentDidMount () {
    this.props.fetchAsideOffers()
  }
}

function offerCountByCategory (offers, category) {
  return offers.filter((offer) => {
    return offer.category === category
  }).filter((offer) => {
    return offer.relevance >= 60
  }).length || 0
}
