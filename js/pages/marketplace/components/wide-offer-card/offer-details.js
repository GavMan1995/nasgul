import React, { Component } from 'react'

import OfferQualifierListLarge from './offer-qualifier-list-large'
import OfferComparison from './offer-comparison'

export default class OfferDetails extends Component {
  render () {
    const { offer, detailsHeight, isDetailsOpen } = this.props

    let offerLargeText = 'There are no details for this product.'
    if (offer.detail.largetext.description) {
      offerLargeText = offer.detail.largetext.description
    }

    let additionalDetails = ''
    if (offer.detail.specifics.length > 3) {
      const length = offer.detail.specifics.length
      additionalDetails = (
        <div className='c-wide-offer-card__addition-details'>
          <h3>Additional Details</h3>
          {offer.detail.specifics.slice(3, length).map((stat, index) => {
            return (
              <div key={index} className='c-stats-list__stat'>
                <p>
                  <strong>{stat.title}</strong>
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div
        className='o-wide-offer-card__details-section js-details-section'
        style={{maxHeight: `${isDetailsOpen ? detailsHeight : 0}px`}}>
        <OfferQualifierListLarge offer={offer} />

        <div className='o-wide-offer-card__main-column'>
          {additionalDetails}

          <div className='c-section-header'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/clipboard_60x60.svg' />
            <div className='c-section-header__copy'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/clipboard_60x60.svg' />
              <h2><strong>Details</strong></h2>
              <p>Top qualities in plain english</p>
            </div>
          </div>

          <div className='c-wide-offer-card__description'>
            <p>
              <strong>
                {offer.detail.largetext.title ? offer.detail.largetext.title : ''}
              </strong>
            </p>

            <p dangerouslySetInnerHTML={{__html: offerLargeText}} />
          </div>

          <div className='c-section-header'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/not-so-fine-print_80x80.svg' />
            <div className='c-section-header__copy'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/not-so-fine-print_80x80.svg' />
              <h2><strong>Nav's Verdict</strong></h2>
            </div>
          </div>
          {offer.detail.comparisons.map((comparison, index) => {
            return <OfferComparison key={index} comparison={comparison} />
          })}
        </div>
      </div>
    )
  }
}
