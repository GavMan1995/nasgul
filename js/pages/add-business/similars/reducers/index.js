import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import signupPlan from './signup-plan'
import similars from './similars'

module.exports = combineReducers(withAuthReducers({ signupPlan, similars }))
