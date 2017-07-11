import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import enrollments from './enrollments'
import enrollment from './enrollment'
import enrollmentTips from './enrollment-tips'
import report from './report'
import reportItems from './report-items'
import reportSections from './report-sections'

module.exports = combineReducers(withAuthReducers({
  enrollments,
  enrollment,
  enrollmentTips,
  report,
  reportItems,
  reportSections
}))
