import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import report from '../../common/reducers/report'
import reportItems from '../../common/reducers/report-items'
import reportSections from '../../common/reducers/report-sections'

module.exports = combineReducers(withAuthReducers({
  report,
  reportItems,
  reportSections
}))
