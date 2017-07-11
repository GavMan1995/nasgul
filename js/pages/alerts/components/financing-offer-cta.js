import React, { Component } from 'react'

export default class FinancingOfferCta extends Component {
  render () {
    const { offer } = this.props

    if (!offer) return null

    let color = '#ffc709'

    if (offer.relevance > 89) {
      color = '#00bb7b'
    } else if (offer.relevance > 69) {
      color = '#ffc709'
    } else if (offer.relevance > -1) {
      color = '#ed193f'
    }

    return (
      <div className='c-alert-cta'>
        <h4 className='c-alert-cta__pro-tip'>
          Pro Tip!
        </h4>
        <p className='c-alert-cta__text'>
          You can avoid high personal credit utilization by always using a
          business credit card for business expenses.
        </p>
        <div className='c-alert-cta__offer'>
          <a
            href={offer.offer_link}
            target='_blank'
            className='c-alert-cta__logo'
            onClick={() => trackCtaClick(offer)}>
            <img src={offer.hr_image_url} />
          </a>
          <div className='c-alert-cta__matchfactor'>
            <small className='c-alert-cta__matchfactor-score'>
              Match factor:&nbsp;
              <strong style={{color}}>
                {offer.relevance}%
              </strong>
            </small>
            <a
              href={offer.offer_link}
              target='_self'
              className='c-btn c-btn--primary c-btn--sm'
              onClick={() => trackCtaClick(offer)}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.analytics.track('Feature View', {
      category: 'Alerts Page',
      label: `Alerts Page: High Utilization - Financing Offer CTA`,
      name: `Alerts Page: High Utilization - Financing Offer CTA`
    })
  }
}

function trackCtaClick (offer) {
  window.analytics.track('Feature Click', {
    category: `${offer.has_details ? 'Internal' : 'External'} Link`,
    label: `Alerts Page: High Utilization - Financing Offer CTA`,
    matchfactorscore: offer.relevance,
    name: `Alerts Page: High Utilization - Financing Offer CTA`,
    offercategory: offer.category,
    offerid: offer.id
  })
}
