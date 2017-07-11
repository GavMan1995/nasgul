import { combineReducers } from 'redux'
import withAuthReducers from '../../../../../common/utils/with-auth-reducers'

import enrollments from '../../../common/reducers/enrollments'
import enrollment from '../../../common/reducers/enrollment'
import enrollmentTips from '../../../common/reducers/enrollment-tips'

module.exports = combineReducers(withAuthReducers({
  enrollments,
  enrollment,
  enrollmentTips
}))
