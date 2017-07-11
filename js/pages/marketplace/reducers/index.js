import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'

import agentImage from './agent-image'
import businessDetails from './business-details'
import loanTypesCount from './loan-types-count'
import marketplaceOptions from './marketplace-options'
import offersByCategory from './offers-by-category'
import offersByType from './offers-by-type'
import offerTypes from './offer-types'
import personalOffers from './personal-offers'
import personalScores from './personal-scores'

module.exports = combineReducers(withAuthReducers({
  agentImage,
  businessDetails,
  loanTypesCount,
  marketplaceOptions,
  offersByCategory,
  offersByType,
  offerTypes,
  personalOffers,
  personalScores
}))
