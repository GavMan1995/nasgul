import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'

import businessDetails from './business-details'
import profileCompletion from './profile-completion'

module.exports = combineReducers(withAuthReducers({
  businessDetails,
  profileCompletion
}))
