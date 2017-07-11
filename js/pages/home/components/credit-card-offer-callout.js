import React from 'react'

import OfferCallout from './offer-callout'

const config = {
  header: 'Build your business credit',
  category: 'Credit Cards',
  trackAction: 'Card Interaction',
  traitKey: 'Credit Builder',
  traitValue: 'Credit Builder',
  backupLink: '/market/credit-cards'
}

export default function CreditCardOfferCallout () {
  return <OfferCallout config={config} />
}
