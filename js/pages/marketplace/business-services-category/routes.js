import ops from '../../../../config/ops'

import BusinessServicesCategoryPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

import parseBusinessService from '../parsers/parse-business-service'
import parseCategory from './parsers/parse-category'

module.exports = [{
  method: 'GET',
  path: '/business-services/{category}',
  handler (request, reply) {
    request.getState([
      // NOTE: The `category` is a URL encoded string
      {
        uri: `${ops.lexBaseUrl()}/api/v2/business_services`,
        parser: parseCategory,
        headers: {
          'authorization': `Token token="${ops.lexApiKey()}"`
        },
        query: {
          offer_type: request.params.category,
          category_limit: 100
        }
      },
      {
        uri: `${ops.lexBaseUrl()}/api/v2/business_services`,
        parser: parseBusinessService,
        headers: { 'authorization': `Token token="${ops.lexApiKey()}"` }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(BusinessServicesCategoryPage, store)
    })
  }
}]
