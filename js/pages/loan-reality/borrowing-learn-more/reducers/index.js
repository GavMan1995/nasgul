import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

module.exports = combineReducers(withAuthReducers())
