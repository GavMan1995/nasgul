import ops from '../../../../config/ops'

import DowngradePage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

import parsePlans from '../parsers/parse-plans'

module.exports = [{
  method: 'GET',
  // NOTE: `{free?}` will be true with any value added there...not just "free"!
  path: '/app/change-plan/downgrade/{free?}',
  handler (request, reply) {
    if (!request.url.query.newPlan) {
      return reply.redirectWithSearch('/app/change-plan')
    }

    request.getState([
      {
        uri: `${ops.apiBaseUrl()}/api/v3/plans?expand=features`,
        parser: parsePlans
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(DowngradePage, store)
    })
  }
}]
