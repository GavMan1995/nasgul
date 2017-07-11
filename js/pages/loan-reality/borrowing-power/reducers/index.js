import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import report from '../../common/reducers/report'
import reportItems from '../../common/reducers/report-items'

import borrowingPower from './borrowing-power'

module.exports = combineReducers(withAuthReducers({
  borrowingPower,
  report,
  reportItems
}))
