import { combineReducers } from 'redux'
import withAuthReducers from '../../../../../common/utils/with-auth-reducers'

import enrollments from '../../../common/reducers/enrollments'
import enrollment from '../../../common/reducers/enrollment'

import credentials from './credentials'
import institution from './institution'

module.exports = combineReducers(withAuthReducers({
  credentials,
  institution,
  enrollments,
  enrollment
}))
