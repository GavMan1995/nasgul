import TooManyAttemptsPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/too-many-attempts',
  handler (request, reply) {
    request.getState((error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(TooManyAttemptsPage, store)
    })
  }
}]
