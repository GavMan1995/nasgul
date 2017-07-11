import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import attemptedBusinessSimilars from './attempted-business-similars'
import plans from './plans'
import signupPlan from './signup-plan'

module.exports = combineReducers(withAuthReducers({ attemptedBusinessSimilars, plans, signupPlan }))
