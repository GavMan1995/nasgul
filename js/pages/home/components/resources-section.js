import React from 'react'

import LendingOfferCallout from './lending-offer-callout'
import CreditCardOfferCallout from './credit-card-offer-callout'

export default function ResourcesSection ({ me }) {
  return (
    <section className='c-card'>
      <div className='c-card__header'>
        <h2>Resources</h2>
      </div>

      <div className='c-card__content'>
        <div className='c-dashboard__resource'>
          <div className='c-dashboard__resource-body'>
            <a
              href='https://www.nav.com/resource/how-to-establish-business-credit/'
              target='_blank'
              onClick={() => trackResources(me.email)}>
              <h3>How to Establish Business Credit</h3>
            </a>
            <p>Figuring out how to access business financing and credit is a common quest for both new and existing small business owners.</p>
            <a
              href='https://www.nav.com/resource/how-to-establish-business-credit/'
              target='_blank'
              className='c-btn c-btn--primary c-btn--outline'
              onClick={() => trackResources(me.email)}>
              Read More
            </a>
          </div>
        </div>

        <LendingOfferCallout />

        <CreditCardOfferCallout />
      </div>
    </section>
  )
}

function trackResources (userId) {
  // NOTE: Hard coding label, it used to be "dynamic"
  window.analytics.track('Card Interaction', {
    userId,
    category: 'Dashboard:Resources',
    action: 'Click',
    label: 'How to Establish Business Credit'
  })
}
