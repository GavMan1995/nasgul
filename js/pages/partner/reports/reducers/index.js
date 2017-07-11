import { combineReducers } from 'redux'
import withRequestReducers from '../../../../common/utils/with-request-reducers'

import business from './business'
import report from './report'

module.exports = combineReducers(withRequestReducers({ business, report }))
