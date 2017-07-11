import PremiumPlusUpgradePage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [
  {
    method: 'GET',
    path: '/app/upgrade/premium-plus',
    handler (request, reply) {
      request.getState((error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(PremiumPlusUpgradePage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/upgrade/premium_plus',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium-plus')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/premium-plus-info',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium-plus')
    }
  },
  {
    method: 'GET',
    path: '/upgrade/premium-plus',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium-plus')
    }
  }
]
