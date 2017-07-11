import React from 'react'

import CreditTargetOffer from './credit-target-offer'

const config = {
  header: 'Your credit may qualify you for these creditor accounts!',
  subHeader: 'These lending options may help:',
  category: 'Lending',
  trackAction: 'Clicked Offer (CT Increase Biz Score Goal)'
}

export default function BizScoreOffer () {
  return <CreditTargetOffer config={config} />
}
