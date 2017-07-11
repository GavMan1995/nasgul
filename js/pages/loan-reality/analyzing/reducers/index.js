import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import enrollmentTips from '../../common/reducers/enrollment-tips'

module.exports = combineReducers(withAuthReducers({ enrollmentTips }))
