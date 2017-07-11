import { Buffer } from 'buffer'

import HelloWorldPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/partner/hello-world',
  handler (request, reply) {
    const store = createStore(reducers, withRequestState(request, {
      business: JSON.parse(Buffer.from(request.state.business, 'base64').toString('utf-8'))
    }))

    reply.page(HelloWorldPage, store)
  },
  config: { auth: false }
}]
