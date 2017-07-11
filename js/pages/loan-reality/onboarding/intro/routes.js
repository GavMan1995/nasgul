import ops from '../../../../../config/ops'

import IntroPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import parseAccounts from '../accounts/parsers/parse-accounts'

import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality',
  handler (request, reply) {
    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/accounts`,
        parser: parseAccounts,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(IntroPage, store)
    })
  }
}]
