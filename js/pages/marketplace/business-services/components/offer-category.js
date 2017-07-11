import React from 'react'

import SimpleOfferCard from '../../components/business-services/simple-offer-card'

export default function OfferCategory ({ category }) {
  let offerSpacer = []

  for (let i = 3 - category.offers.length; i > 0; i--) {
    offerSpacer.push(<div key={Math.random()} className='c-card c-offer-card c-offer-card--placeholder' />)
  }

  return (
    <div className='c-offer-category'>

      <div className='c-offer-category__details'>
        <h2><strong>{ category.category.name }</strong></h2>
        {/* <p>{ category.category.description }</p> */}
        <a
          className='c-btn c-btn--secondary c-btn--outline c-btn--sm'
          href={`/business-services/${category.category.name}`}
          onClick={() => track('Button', `View All Button - ${category.category.name}`, `View All Button - ${category.category.name}`)}>
          View All
        </a>
      </div>

      <div className='c-offer-category__offers o-scrollable-cards-on-mobile'>
        {
          category.offers.map((offer) => {
            return (
              <SimpleOfferCard key={offer.id} offer={offer} />
            )
          })
        }
        <div className='c-card c-offer-card c-offer-card--show-more'>
          <h2>{ category.category.name }</h2>
          <a
            href={`/business-services/${category.category.name}`}
            className='c-btn c-btn--primary'
            onClick={() => track('Internal Link', `See All Link - ${category.category.name}`, `View All Button - ${category.category.name}`)}>
            View All
          </a>
        </div>
        {offerSpacer}
      </div>

      <div className='c-offer-category__see-more-btn c-offer-category__see-more-btn--hide-on-mobile'>
        <a
          href={`/business-services/${category.category.name}`}
          onClick={() => track('Internal Link', `See All Link - ${category.category.name}`, `View All Button - ${category.category.name}`)}>
          View All { category.category.name } Products &rsaquo;
        </a>
      </div>
    </div>
  )
}

function track (category, label, name) {
  window.analytics.track('Feature Click',
    {
      category: category,
      label: label,
      name: name
    }
  )
}
