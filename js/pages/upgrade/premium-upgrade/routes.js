import PremiumUpgradePage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [
  {
    method: 'GET',
    path: '/app/upgrade/premium',
    handler (request, reply) {
      request.getState((error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(PremiumUpgradePage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/upgrade',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/businesses',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/general',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/monitoring',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/premium-info',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/app/upgrade/premium-value',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  },
  {
    method: 'GET',
    path: '/upgrade/premium',
    handler (request, reply) {
      reply.redirectWithSearch('/app/upgrade/premium')
    }
  }
]
