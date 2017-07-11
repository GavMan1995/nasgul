import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import enrollments from '../../common/reducers/enrollments'

import accounts from '../../onboarding/accounts/reducers/accounts'

import hiddenAccounts from './hidden-accounts'

module.exports = combineReducers(withAuthReducers({
  accounts,
  enrollments,
  hiddenAccounts
}))
