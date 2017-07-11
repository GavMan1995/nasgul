import React from 'react'

import OfferCallout from './offer-callout'

const config = {
  header: 'Need help expanding your business?',
  category: 'Lending',
  trackAction: 'Card Interaction',
  backupLink: '/market/lending-offers'
}

export default function LendingOfferCallout () {
  return <OfferCallout config={config} />
}
