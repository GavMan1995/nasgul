import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

import padStart from 'lodash.padstart'

import OfferDetails from './wide-offer-card/offer-details'
import trackClick from '../track-click'
import OfferDetailsModal from '../components/wide-offer-card/offer-details-modal'

class WideOfferCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDetailsOpen: false,
      detailsHeight: 0,
      isModalOpen: false
    }
  }

  render () {
    const {
      affiliateOwner,
      isMobileRequest,
      me,
      offer,
      highestMfBelowSixty,
      plan
    } = this.props
    const memberId = trackingId(affiliateOwner, isMobileRequest, me, offer.id, plan, offer.relevance)

    let lenderId = ''

    if (offer.id === 12 || offer.id === 127) lenderId = `&corrdata=${memberId}`
    if (offer.id === 26 || offer.id === 134) lenderId = `&refid=${memberId}`

    let param = `?sid=${memberId}${lenderId}`

    if (/\?/g.test(offer.offer_link)) param = `&sid=${memberId}${lenderId}`

    return (
      <div className={`o-wide-offer-card c-wide-offer-card ${this.state.isDetailsOpen ? 'is-open' : ''}`}>
        <div className='o-wide-offer-card__summary-section'>
          <div className='o-wide-offer-card__main-column'>
            <div className='c-stats-list'>
              <div className='c-offer-title__image c-offer-title__image--lg'>
                <img src={offer.hr_image_url} />
              </div>
              {offer.detail.specifics.slice(0, 3).map((stat, index) => {
                return (
                  <div className='c-stats-list__stat' key={index}>
                    <p>
                      <strong>{stat.title}</strong>
                      {stat.description}
                    </p>
                  </div>
                )
              })}

              <div className='c-wide-offer-card__apply-btn c-wide-offer-card__apply-btn--hide-on-mobile'>
                <a
                  href={`${offer.offer_link}${param}`}
                  onClick={() => trackFeatureClick(offer)}
                  className={`c-btn ${highestMfBelowSixty ? 'c-btn--outline' : 'c-btn--primary'}`}
                  target='_blank'>
                  Apply Now
                </a>
                <p>On {offer.provider.name}'s secure website</p>
              </div>
            </div>
          </div>
        </div>

        <OfferDetails
          offer={offer}
          detailsHeight={this.state.detailsHeight}
          isDetailsOpen={this.state.isDetailsOpen} />

        <div
          className='o-wide-offer-card__footer'
          onClick={this.toggleOfferDetails.bind(this)}>
          <div>
            <p>
              MATCHFACTOR &nbsp;
              <strong
                style={{ color: setMatchFactorColor(offer) }}>
                {offer.relevance}%
              </strong>
            </p>
          </div>

          <div className={`c-wide-offer-card__footer-link ${this.state.isDetailsOpen ? 'is-open' : ''}`}>
            <p>{this.state.isDetailsOpen ? 'Hide' : 'See'} Details</p>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
          </div>
        </div>

        <div
          className='o-wide-offer-card__mobile-footer'
          onClick={this.toggleDetailsModal.bind(this)}>
          <div>
            <p>
              MATCHFACTOR &nbsp;
              <strong
                style={{ color: setMatchFactorColor(offer) }}>
                {offer.relevance}%
              </strong>
            </p>
          </div>

          <div className='c-wide-offer-card__footer-link'>
            <p>See Details</p>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
          </div>
        </div>

        <OfferDetailsModal
          {...this.props}
          isModalOpen={this.state.isModalOpen}
          toggleDetailsModal={this.toggleDetailsModal.bind(this)} />
      </div>
    )
  }

  toggleDetailsModal () {
    this.setState({ isModalOpen: !this.state.isModalOpen })
    document.querySelector('body').classList.toggle('has-open-modal')
  }

  // Use scrollHeight and not offsetHeight to find the height of the parent element
  toggleOfferDetails () {
    let label = this.state.isDetailsOpen ? 'Hide' : 'See'
    trackClick(
      'Offer Card',
      'Feature Click',
      `${label} Details - Lending ${this.props.offer.id}`
    )

    const element = findDOMNode(this)
    const details = element.querySelector('.o-wide-offer-card__details-section')
    const height = Math.ceil(details.scrollHeight + 400)

    this.setState({
      isDetailsOpen: !this.state.isDetailsOpen,
      detailsHeight: height
    })
  }
}

function trackFeatureClick (offer) {
  window.analytics.track('Clicked Offer (Apply Button)', {
    category: 'external_link',
    label: `${offer.title}`,
    name: `${offer.title}`,
    matchFactorScore: `${offer.relevance}`,
    offerCategory: `${offer.category}`,
    offerId: `${offer.id}`,
    offerLink: `${offer.offer_link}`
  })
}

function setMatchFactorColor (offer) {
  let score = offer.relevance

  if (score > 89) {
    return '#00bb7b'
  } else if (score > 79) {
    return '#81eaac'
  } else if (score > 69) {
    return '#ffc709'
  } else if (score > 59) {
    return '#f9a000'
  } else if (score > -1) {
    return '#ed193f'
  } else {
    return ''
  }
}

function trackingId (affiliate, mobile, me, id, plan, score) {
  const affiliateMember = me.id && plan.planCode !== 'freemium' && affiliate.id
  const isMobile = mobile ? 'M' : 'D'
  const mfScore = padStart(score, 2, 0)
  const offerId = padStart(id, 3, 0)

  let isAffiliate = ''

  if (affiliateMember && affiliate.name === 'Capwell Funding') {
    isAffiliate = 'CW-'
  } else if (affiliateMember && affiliate.name === 'Hawkekye Management') {
    isAffiliate = 'LC-'
  }

  return `${isAffiliate}${me.id}_${offerId}${isMobile}${getDate()}${mfScore}AN`
}

function getDate () {
  const date = new Date()
  const day = padStart(date.getDate(), 2, 0)
  const month = padStart((date.getMonth() + 1), 2, 0)
  const year = date.getFullYear().toString().slice(2)
  const today = month + day + year

  return today
}

function mapStateToProps ({ affiliateOwner, isMobileRequest, me, plan }) {
  return { affiliateOwner, isMobileRequest, me, plan }
}

export default connect(mapStateToProps)(WideOfferCard)
