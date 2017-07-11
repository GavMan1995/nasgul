import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import prompt from '../../reducers/prompt'
import signupPlan from './signup-plan'

module.exports = combineReducers(withAuthReducers({ prompt, signupPlan }))
