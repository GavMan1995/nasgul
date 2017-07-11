import SomethingWentWrongPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/something-went-wrong',
  handler (request, reply) {
    request.getState((error, state) => {
      if (error) return reply(error)

      state.errorMessage = request.url.query.errorMessage
      const store = createStore(reducers, withRequestState(request, state))

      reply.page(SomethingWentWrongPage, store)
    })
  }
}]
