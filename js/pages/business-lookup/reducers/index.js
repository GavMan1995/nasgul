import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'
import businessSummary from './business-summary'

module.exports = combineReducers(withAuthReducers({ businessSummary }))
