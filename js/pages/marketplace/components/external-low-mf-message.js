import React from 'react'

import CDNIcon from '../../../common/components/cdn-icon'

export default function ExternalLowMFMessage ({ personalScores }) {
  let ccLink = ' http://www.creditcards.com/fair-credit.php'

  if (personalScores[0].score < 580) {
    ccLink = 'http://www.creditcards.com/bad-credit.php'
  }

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

        <div className='c-low-mf-external-card'>
          <div className='c-low-mf-card__body'>
            <div className='c-low-mf-card__img'>
              <CDNIcon filename='card.svg' />
            </div>
            <div className='c-low-mf-card__text'>
              <h2 className='c-low-mf__header'>
                Establish your credit profile with a new credit card.
              </h2>
              <p className='c-low-mf-card__copy'>
                It can be hard to get business financing with low personal credit scores.
                One way to increase your scores is by responsibly using a personal credit
                card, which can lead to better business financing options in the future.
                We've partnered with CreditCards.com to help make sure you apply for personal
                cards you're more likely to get approved for &mdash; based on your credit profile.
              </p>
              <p className='c-low-mf-card__copy'>
                Get started with our partner CreditCards.com to see your best options.
              </p>
            </div>
          </div>
          <div className='c-cc-com-offer'>
            <CDNIcon filename='CCcomLogo.svg' className='c-cc-com-offer__img' />
            <a
              href={ccLink}
              onClick={trackCC}>
              <h3 className='c-cc-com-offer__copy'>
                See Credit Cards for Bad credit
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function trackCC () {
  window.analytics.track('feature_click', {
    category: 'external_link',
    label: 'credit_cards',
    name: 'credit_cards'
  })
}
