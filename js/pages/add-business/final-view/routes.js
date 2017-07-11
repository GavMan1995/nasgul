import FinalViewPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/add-business/complete',
  handler (request, reply) {
    if (!request.url.query.id) return reply.redirectWithSearch('/home')

    request.getState((error, state) => {
      if (error) return reply(error)

      const finalState = Object.assign({},
        withRequestState(request, state),
        {
          prompt: request.state.prompt === 'true',
          signupPlan: request.state.signupPlan
        }
      )
      const store = createStore(reducers, finalState)

      reply.page(FinalViewPage, store)
    })
  }
}]
