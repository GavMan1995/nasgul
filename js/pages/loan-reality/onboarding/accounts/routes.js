import ops from '../../../../../config/ops'

import AccountSelectPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import parseAccounts from './parsers/parse-accounts'

import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/accounts',
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

      if (state.accounts.length === 1) {
        const id = state.accounts[0].id

        return reply.redirect(`/loan-reality/borrowing-power?accountId=${id}`)
      }

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(AccountSelectPage, store)
    })
  }
}]
