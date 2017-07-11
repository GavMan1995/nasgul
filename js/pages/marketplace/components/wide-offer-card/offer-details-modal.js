import React from 'react'

import padStart from 'lodash.padstart'

import OfferQualifierListLarge from '../wide-offer-card/offer-qualifier-list-large'
import OfferComparison from '../wide-offer-card/offer-comparison'

export default function OfferDetailsModal (props) {
  const {
    affiliateOwner,
    isMobileRequest,
    me,
    offer,
    plan,
    isModalOpen,
    toggleDetailsModal
  } = props
  const memberId = trackingId(affiliateOwner, isMobileRequest, me, offer.id, plan, offer.relevance)

  let lenderId = ''

  if (offer.id === 12 || offer.id === 127) lenderId = `&corrdata=${memberId}`
  if (offer.id === 26 || offer.id === 134) lenderId = `&refid=${memberId}`

  let param = `?sid=${memberId}${lenderId}`

  if (/\?/g.test(offer.offer_link)) param = `&sid=${memberId}${lenderId}`

  let offerLargeText = 'There are no details for this product.'

  if (offer.detail.largetext.description) {
    offerLargeText = offer.detail.largetext.description
  }

  return (
    <div className={`c-offer-details-modal ${isModalOpen ? 'is-open' : ''}`}>
      <div className='c-breadcrumb c-breadcrumb--banner'>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
        <h3 onClick={() => toggleDetailsModal()}>Back</h3>
      </div>
      <p><strong>{offer.title}</strong></p>

      <div className='c-offer-details-modal__header'>
        <img src={offer.hr_image_url} />
        <div className='c-wide-offer-card__apply-btn'>
          <a
            href={`${offer.offer_link}${param}`}
            onClick={() => trackFeatureClick(offer)}
            className='c-btn'
            target='_blank'>
            Apply Now
          </a>
          <p>On {offer.provider.name}'s secure website</p>
        </div>
      </div>

      <div className='c-offer-details__stats'>
        {offer.detail.specifics.map((stat, index) => {
          return (
            <p key={index}>
              <strong>{stat.title}</strong>
              {stat.description}
            </p>
          )
        })}
      </div>

      <div className='o-wide-offer-card__details-section o-wide-offer-card__details-section--mobile'>
        <OfferQualifierListLarge offer={offer} />

        <div className='o-wide-offer-card__main-column'>
          <div className='c-section-header c-section-header--show-img-on-mobile'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/clipboard_60x60.svg' />
            <div className='c-section-header__copy'>
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

          <div className='c-section-header c-section-header--show-img-on-mobile'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/not-so-fine-print_80x80.svg' />
            <div className='c-section-header__copy'>
              <h2><strong>Nav's Verdict</strong></h2>
            </div>
          </div>
          {offer.detail.comparisons.map((comparison, index) => {
            return <OfferComparison key={index} comparison={comparison} />
          })}
        </div>
      </div>
    </div>
  )
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
