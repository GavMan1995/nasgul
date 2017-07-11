import { combineReducers } from 'redux'
import withRequestReducers from '../../../common/utils/with-request-reducers'

import authBaseUrl from './auth-base-url'
import email from './email'

export default combineReducers(withRequestReducers({ authBaseUrl, email }))
