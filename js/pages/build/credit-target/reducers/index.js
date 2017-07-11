import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import build from './build'
import goals from './goals'
import includeBusiness from './include-business'

module.exports = combineReducers(withAuthReducers({
  build,
  goals,
  includeBusiness
}))
