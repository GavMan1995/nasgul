import React from 'react'

export default function OfferResultsCard (props) {
  const { cardOffersCount, lendingOffersCount } = props

  return (
    <div className='c-next-best-action-aside__content-card is-active'>
      <div className='c-next-best-action-aside__content c-next-best-action-aside__content--centered-content'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/icon_star_32x32.svg'
          className='c-next-best-action-aside__content-img--sm c-next-best-action-aside__content-img' />

        <h3 className='c-next-best-action-aside__content-text'>Good News!</h3>
        <small>You have new financing options</small>

        <a
          href='/market/credit-cards?ref=nba-aside'
          className='c-btn c-btn--full-width'
          onClick={() => {
            window.analytics.track('feature_click', {
              category: 'internal_link',
              label: 'biz_profile_nba:view_credit_cards',
              name: 'biz_profile_nba:view_credit_cards'
            })
          }}>
          {cardOffersCount} New Credit Card Matches
        </a>

        <a
          href='/market/lending-offers?ref=nba-aside'
          className='c-btn c-btn--full-width'
          onClick={() => {
            window.analytics.track('feature_click', {
              category: 'internal_link',
              label: 'biz_profile_nba:view_lending_offers',
              name: 'biz_profile_nba:view_lending_offers'
            })
          }}>
          {lendingOffersCount} New Loan Matches
        </a>
      </div>
    </div>
  )
}
