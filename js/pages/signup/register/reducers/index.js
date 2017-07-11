import { combineReducers } from 'redux'
import withRequestReducers from '../../../../common/utils/with-request-reducers'

import email from './email'
import errors from './errors'
import formAction from './form-action'
import planCode from './plan-code'

module.exports = combineReducers(withRequestReducers({
  email,
  errors,
  formAction,
  planCode
}))
