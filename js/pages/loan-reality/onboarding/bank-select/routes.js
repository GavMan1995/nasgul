import BankSelectPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import ops from '../../../../../config/ops'

import parseInstitutionResults from './parsers/parse-institution-results'

import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [
  {
    method: 'POST',
    path: '/loan-reality/bank-select',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.gringottsUrl()}/api/institutions?name=${request.payload.name}`,
          parser: parseInstitutionResults,
          headers: {
            'authorization': `Token ${request.state.token}`
          }
        }
      ], (error, state) => {
        if (error) return reply(error)

        if (state.institutions.length < 1) {
          return reply.redirect('/loan-reality/bank-search?noInstitutionsFound=true')
        }

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(BankSelectPage, store)
      })
    }
  },
  {
    method: 'GET',
    path: '/loan-reality/bank-select',
    handler (request, reply) {
      reply.redirectWithSearch('/loan-reality/bank-search')
    }
  },
  {
    method: 'GET',
    path: '/loan-reality/bank-list',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.gringottsUrl()}/api/institutions/list`,
          parser: parseInstitutionResults,
          headers: {
            'authorization': `Token ${request.state.token}`
          }
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(BankSelectPage, store)
      })
    }
  }
]
