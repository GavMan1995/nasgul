import ops from '../../../../config/ops'

import CreditTargetPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

import parseBuild from './parsers/parse-build'
import parseGoals from './parsers/parse-goals'

module.exports = [
  {
    method: 'GET',
    path: '/build/credit-target',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.apiBaseUrl()}/goals`,
          parser: parseGoals
        },
        {
          uri: `${ops.apiBaseUrl()}/build`,
          parser: parseBuild
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(CreditTargetPage, store)
      })
    }
  },
  // Redirect
  {
    method: 'GET',
    path: '/app/build/credit_target',
    handler (request, reply) {
      reply.redirectWithSearch('/build/credit-target')
    }
  }
]
