import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import BorrowingPowerPage from './page'

import parseBorrowingPower from '../common/parsers/parse-borrowing-power'
import parseReports from '../common/parsers/parse-reports'
import parseReportItems from '../common/parsers/parse-report-items'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'
import withRequestHeaders from '../../../server/utils/with-request-headers'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/borrowing-power',
  handler (request, reply) {
    const { accountId } = request.url.query

    req({
      method: 'POST',
      uri: `${ops.gringottsUrl()}/api/accounts/${accountId}/select`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${request.token()}`
      })
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))
    })

    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/reports?account_id=${accountId}`,
        parser: parseReports,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const reportsState = state

      request.getState([
        {
          uri: `${ops.gringottsUrl()}/api/borrowing_power?account_id=${accountId}`,
          parser: parseBorrowingPower,
          headers: {
            'authorization': `Token ${request.token()}`
          }
        },
        {
          uri: `${ops.gringottsUrl()}/api/report_items?account_id=${accountId}`,
          parser: parseReportItems,
          headers: {
            'authorization': `Token ${request.token()}`
          }
        }
      ], (error, state) => {
        if (error) return reply(error)

        const finalState = Object.assign({}, reportsState, state)

        const store = createStore(reducers, withRequestState(request, finalState))

        reply.page(BorrowingPowerPage, store)
      })
    })
  }
}]
