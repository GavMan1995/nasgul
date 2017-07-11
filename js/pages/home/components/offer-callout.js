import React, { Component } from 'react'
import { connect } from 'react-redux'

import safeHTMLEntities from '../../../common/utils/safe-html-entities'

class OfferCallout extends Component {
  constructor (props) {
    super(props)

    this.state = { offer: {} }
  }

  render () {
    const { config } = this.props
    const { offer } = this.state

    let offerDetails = null

    if (offer.id) {
      offerDetails = (
        <div>
          <div
            data-flex--item='full p--md'
            data-flex--container='space-around-items'
            className='promo-card card-mini-feature'>
            <div
              data-flex--item='half max--150'
              data-flex--container='row-items--middle middle'>
              <img src={offer.hr_image_url} />
            </div>
            <div
              data-flex--item='pull--right'
              className={`c-match-factor-score c-match-factor-score--no-hover ${matchFactorClass(offer)}`}>
              <div className='c-match-factor-score__factor-icon'>
                <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Card.svg' />
              </div>
              <div className='c-match-factor-score__factor-percent'>
                {offer.relevance} <span>%</span>
              </div>
              <span className='c-match-factor-score__factor-label'>
                MATCH FACTOR
              </span>
              <div className='c-match-factor-score__factor-link'>
                <span>&rsaquo;</span>
                <span>&rsaquo;</span>
              </div>
            </div>
          </div>
          <p>{safeHTMLEntities(offer.title)}</p>
        </div>
      )
    }

    return (
      <div className='c-dashboard__resource'>
        <div className='c-dashboard__resource-body'>
          <h3>{config.header}</h3>
          {offerDetails}
        </div>
        <a
          href={offer.offer_link || config.backupLink}
          target={offer.has_details ? '_self' : '_blank'}
          className='c-dashboard__resource-footer'
          onClick={() => trackOfferClick(offer, config.trackAction)}>
          Learn More
        </a>
      </div>
    )
  }

  componentDidMount () {
    const { config } = this.props

    window.fetch(`/client/api/v2/personal_offers${searchParams(config)}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': this.props.crumb
      },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) return response.json()

      if (response.status === 401) window.location.reload(true)
    }).then((response) => {
      if (!response) return

      if (response.errors && response.errors.length > 0) return

      this.setState({ offer: response.data.shift() || {} })
    })
  }
}

function searchParams (config) {
  let result = `?category=${config.category}`

  if (config.traitKey && config.traitValue) {
    result += `&${config.traitKey}[]=${config.traitValue}`
  }

  return result
}

function matchFactorClass (offer) {
  if (!offer) return 'c-match-factor-score--average'

  if (offer.relevance > 89) {
    return 'c-match-factor-score--good'
  } else if (offer.relevance > 79) {
    return 'c-match-factor-score--fair'
  } else if (offer.relevance > 69) {
    return 'c-match-factor-score--average'
  } else if (offer.relevance > 59) {
    return 'c-match-factor-score--low'
  } else if (offer.relevance > -1) {
    return 'c-match-factor-score--bad'
  } else {
    return 'c-match-factor-score--average'
  }
}

function trackOfferClick (offer, trackAction = 'Clicked offer') {
  window.analytics.track(trackAction, {
    name: offer.title,
    label: offer.title,
    category: `${offer.has_details ? 'Internal' : 'External'} Link`,
    offercategory: offer.category,
    offerid: offer.id
  })
}

function mapStateToProps ({ crumb }) {
  return { crumb }
}

export default connect(mapStateToProps)(OfferCallout)
