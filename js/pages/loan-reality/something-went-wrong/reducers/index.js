import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import errorMessage from './error-message'

module.exports = combineReducers(withAuthReducers({ errorMessage }))
