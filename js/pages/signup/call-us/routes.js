import CallUsPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/call-us',
  handler (request, reply) {
    request.getState((error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(CallUsPage, store)
    })
  }
}]
