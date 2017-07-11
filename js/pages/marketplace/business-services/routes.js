import ops from '../../../../config/ops'

import BusinessServicesPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'

// NOTE: This sets `offersByCategory` on the state tree...?
import parseBusinessService from '../parsers/parse-business-service'

module.exports = [{
  method: 'GET',
  path: '/business-services',
  handler (request, reply) {
    request.getState([
      {
        uri: `${ops.lexBaseUrl()}/api/v2/business_services`,
        parser: parseBusinessService,
        headers: { 'authorization': `Token token="${ops.lexApiKey()}"` }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(BusinessServicesPage, store)
    })
  }
}]
