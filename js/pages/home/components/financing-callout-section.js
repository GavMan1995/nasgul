import React from 'react'

export default function FinancingCalloutSection () {
  return (
    <section className='o-card c-callout-card c-callout-card--financing'>
      <div className='c-callout-card__financing-img'>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/coin_30x30.svg' />
      </div>

      <div className='c-callout-card__info'>
        <div className='c-callout-card__header'>
          <h1>Be prepared &#8212; get a business line of credit before you need it.</h1>
          <h3>
            Your credit is in good shape now, so you may be qualified.
            Chat with our unbiased lending experts for free advice.
          </h3>
        </div>
        <div className='c-callout-card__btn-container c-callout-card__btn-container--bottom'>
          <a
            href='https://app.hubspot.com/meetings/nav/nav-business-financing-consultation-dash'
            target='_blank'
            className='c-btn c-btn--lg c-btn--white qa-dashboard__financing-callout__get-started'
            onClick={() => {
              window.analytics.track('feature_click', {
                category: 'internal_link',
                label: 'good_credit_bet:schedule_call',
                name: 'good_credit_bet:schedule_call'
              })
            }}>
            Schedule a Call
          </a>
          <a
            href='tel:844-636-2445'
            target='_blank'
            className='c-callout-card__white-link qa-dashboard__financing-callout__learn-more'
            onClick={() => {
              window.analytics.track('feature_click', {
                category: 'internal_link',
                label: 'good_credit_bet:call_now',
                name: 'good_credit_bet:call_now'
              })
            }}>
            or call now: <stong>844-636-2445</stong>
          </a>
        </div>
      </div>
    </section>
  )
}
