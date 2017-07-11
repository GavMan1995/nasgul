import CustomerCountPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import ops from '../../../../config/ops'

import parseReports from '../common/parsers/parse-reports'
import parseReportItems from '../common/parsers/parse-report-items'
import parseReportSections from '../common/parsers/parse-report-sections'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/customer-count',
  handler (request, reply) {
    const { accountId } = request.url.query

    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/reports?account_id=${accountId}`,
        parser: parseReports,
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
      },
      {
        uri: `${ops.gringottsUrl()}/api/report_sections?account_id=${accountId}`,
        parser: parseReportSections,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(CustomerCountPage, store)
    })
  }
}]
