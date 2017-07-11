import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'

import activeInsight from './active-insight'
import businessScores from './business-scores'
import feedItems from './feed-items'
import insights from './insights'
import personalScores from './personal-scores'
import tools from './tools'

// ONBOARDING BET
import isHidden from '../on-boarding-bet/reducers/is-hidden'
import purpose from '../on-boarding-bet/reducers/purpose'

// NBA Aside
import activeProfile from '../next-best-action-aside/reducers/active-profile'
import activeProfileLoaded from '../next-best-action-aside/reducers/active-profile-loaded'
import asideOffers from '../next-best-action-aside/reducers/aside-offers'
import asideOffersLoaded from '../next-best-action-aside/reducers/aside-offers-loaded'
import currentCard from '../next-best-action-aside/reducers/current-card'

module.exports = combineReducers(withAuthReducers({
  activeInsight,
  businessScores,
  feedItems,
  insights,
  personalScores,
  tools,
  // ONBOARDING BET
  isHidden,
  purpose,
  // NBA Aside
  activeProfile,
  activeProfileLoaded,
  asideOffers,
  asideOffersLoaded,
  currentCard
}))
