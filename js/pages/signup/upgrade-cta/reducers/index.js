import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import plans from './plans'

module.exports = combineReducers(withAuthReducers({ plans }))
