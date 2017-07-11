import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import business from './business'

module.exports = combineReducers(withAuthReducers({ business }))
