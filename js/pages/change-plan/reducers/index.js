import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'

import frequency from './frequency'
import plans from './plans'

module.exports = combineReducers(withAuthReducers({ frequency, plans }))
