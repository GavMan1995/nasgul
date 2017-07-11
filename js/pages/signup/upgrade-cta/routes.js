import UpgradeCtaPage from './page'

import ops from '../../../../config/ops'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

import parsePlans from '../parsers/parse-plans'

module.exports = [{
  method: 'GET',
  path: '/signup/upgrade',
  handler (request, reply) {
    request.getState([
      {
        uri: `${ops.apiBaseUrl()}/api/v3/plans`,
        parser: parsePlans
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(UpgradeCtaPage, store)
    })
  }
}]
