import React from 'react'

import CDNIcon from '../../../common/components/cdn-icon'

export default function InternalLowMFMessage () {
  return (
    <div>
      <h3 className='c-low-approval-header'>
        You have Very Low Approval Odds for Business Financing
      </h3>
      <p className='c-low-mf-header__copy'>
        Lenders rely heavily on the following three factors to determine
        your eligibility for financing, especially if your business is
        less than a year old. Improving even a single area can greatly
        expand your funding opportunities.
      </p>

      <div className='c-low-mf-box'>
        <div className='c-approval-factor-container'>
          <div className='c-approval-factor'>
            <CDNIcon filename='Time.svg' className='c-approval-factor__img' />
            <div className='c-low-mf-message'>
              <h4 className='c-low-mf__header'>
                Time In Business
              </h4>
              <p className='c-approval-factor-sub-text'>
                Over 1 year preferred
              </p>
            </div>
          </div>
          <div className='c-approval-factor'>
            <CDNIcon filename='Money.svg' className='c-approval-factor__img' />
            <div className='c-low-mf-message'>
              <h4 className='c-low-mf__header'>
                Monthly Revenue
              </h4>
              <p className='c-approval-factor-sub-text'>
                Over $2,000/mo. preferred
              </p>
            </div>
          </div>
          <div className='c-approval-factor'>
            <CDNIcon filename='Credit.svg' className='c-approval-factor__img' />
            <div className='c-low-mf-message'>
              <h4 className='c-low-mf__header'>
                Personal Credit Score
              </h4>
              <p className='c-approval-factor-sub-text'>
                Over 600 preferred
              </p>
            </div>
          </div>
        </div>

        <div className='c-low-mf-internal-card'>
          <CDNIcon filename='card.svg' className='c-low-mf-card__img' />
          <div className='c-low-mf-card__text'>
            <h2 className='c-low-mf__header'>
              A business credit card may be your best option right now
            </h2>
            <p className='c-low-mf-card__copy'>
              Good news! Even though you might not be qualified for a traditional
              business loan at the moment, it looks like you're in good shape to get
              a dedicated credit card for your business. This is one of the best ways
              to establish and improve your business credit so you can find more funding
              options in the future.
            </p>
            <button
              className='c-btn c-btn--primary c-btn--md c-low-mf-button'
              type='submit'
              onClick={() => {
                window.location.href = '/market/credit-cards'

                window.analytics.track('feature_click', {
                  category: 'internal_link',
                  label: 'credit_cards',
                  name: 'credit_cards'
                })
              }}>
              See Credit Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
