import AnalyzingPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

import EnrollmentService from '../common/enrollment-service'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/analyzing',
  handler (request, reply) {
    request.getState((error, state) => {
      if (error) return reply(error)

      state.enrollmentTips = EnrollmentService.tips()

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(AnalyzingPage, store)
    })
  }
}]
