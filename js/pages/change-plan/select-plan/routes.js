import ops from '../../../../config/ops'

import SelectPlanPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

import parsePlans from '../parsers/parse-plans'

module.exports = [
  {
    method: 'GET',
    path: '/app/change-plan/{fico?}',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.apiBaseUrl()}/api/v3/plans?expand=features`,
          parser: parsePlans
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(SelectPlanPage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/change_plan/{fico?}',
    handler (request, reply) {
      reply.redirectWithSearch(`/app/change-plan/${request.params.fico || ''}`)
    }
  }
]
