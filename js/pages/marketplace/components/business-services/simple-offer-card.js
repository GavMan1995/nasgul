import React from 'react'

export default function OfferCategory ({ offer }) {
  let offerDescription = "See details on our partner's website"

  if (offer.description) offerDescription = offer.description

  return (
    <div className='c-card c-offer-card'>
      <div className='c-card__content'>
        <div className='c-offer-title'>
          <p><strong>{ offer.title }</strong></p>
          <div className='c-offer-title__image'>
            <img src={offer.hr_image_url} />
          </div>
        </div>
        <hr />
        <div className='c-offer-card__description'>
          <p>{offerDescription}</p>
        </div>
      </div>
      <div className='c-card__footer c-btn-group'>
        <a
          href={offer.offer_link}
          onClick={() => track(offer)}
          target='_blank'
          className='c-btn-group__btn'>
          Learn More
          <span>On our partner's secure site</span>
        </a>
      </div>
    </div>
  )
}

function track (offer) {
  window.analytics.track('Clicked Offer (Learn More Button)', {
    category: 'External Link',
    label: offer.title,
    name: offer.title,
    offercategory: 'Business Services',
    offerid: offer.id,
    offerlink: offer.offer_link
  })
}
