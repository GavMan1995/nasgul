import React from 'react'

import CreditTargetOffer from './credit-target-offer'

const config = {
  header: 'Your credit may qualify you for these credit cards!',
  subHeader: 'Your recommended business cards:',
  category: 'Credit Cards',
  trackAction: 'Clicked Offer (CT Biz Card Goal)',
  traitKey: 'Credit Builder',
  traitValue: 'Credit Builder'
}

export default function BizCreditCardOffer () {
  return <CreditTargetOffer config={config} />
}
