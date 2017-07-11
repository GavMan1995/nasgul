import React from 'react'

import PriceChangeDowngrade from './price-change-downgrade'
import FreemiumDowngrade from './freemium-downgrade'

export default function DowngradeDisplay ({ currentPlan, downgradePlan }) {
  if (downgradePlan.price > 0) {
    return <PriceChangeDowngrade currentPlan={currentPlan} downgradePlan={downgradePlan} />
  } else {
    return <FreemiumDowngrade currentPlan={currentPlan} />
  }
}
