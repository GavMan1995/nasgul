import { combineReducers } from 'redux'
import withAuthReducers from '../../../../common/utils/with-auth-reducers'

import answers from './answers'
import errors from './errors'
import questionSessionId from './question-session-id'
import questions from './questions'
import secondsRemaining from './seconds-remaining'

module.exports = combineReducers(withAuthReducers({
  answers,
  errors,
  questionSessionId,
  questions,
  secondsRemaining
}))
