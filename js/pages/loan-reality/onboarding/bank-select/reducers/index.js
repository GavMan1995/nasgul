import { combineReducers } from 'redux'
import withAuthReducers from '../../../../../common/utils/with-auth-reducers'

import institutions from './institutions'

module.exports = combineReducers(withAuthReducers({ institutions }))
