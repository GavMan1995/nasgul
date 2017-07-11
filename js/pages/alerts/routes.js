import ops from '../../../config/ops'

import AlertsPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../server/utils/with-request-state'

import parseAlerts from './parsers/parse-alerts'
import parseAlertSettings from './parsers/parse-alert-settings'
import parsePersonalScores from './parsers/parse-personal-scores'

module.exports = [
  {
    method: 'GET',
    path: '/alerts',
    handler (request, reply) {
      request.getState([
        { uri: `${ops.apiBaseUrl()}/alerts`,
          parser: parseAlerts
        },
        {
          uri: `${ops.apiBaseUrl()}/settings`,
          parser: parseAlertSettings
        },
        {
          uri: `${ops.apiBaseUrl()}/credit_scores`,
          parser: parsePersonalScores
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(AlertsPage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/alerts',
    handler (request, reply) {
      reply.redirectWithSearch('/alerts')
    }
  },
  {
    method: 'GET',
    path: '/app/protect',
    handler (request, reply) {
      reply.redirectWithSearch('/alerts')
    }
  }
]
