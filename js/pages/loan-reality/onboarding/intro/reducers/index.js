import { combineReducers } from 'redux'
import withAuthReducers from '../../../../../common/utils/with-auth-reducers'

import accounts from '../../accounts/reducers/accounts'

module.exports = combineReducers(withAuthReducers({ accounts }))
