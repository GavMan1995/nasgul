import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import offerCategory from './offer-category'
import offersByCategory from '../../reducers/offers-by-category'

module.exports = combineReducers(withAuthReducers({
  offerCategory,
  offersByCategory
}))
