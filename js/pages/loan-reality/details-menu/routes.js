import DetailsMenuPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import ops from '../../../../config/ops'

import parseReportSections from '../common/parsers/parse-report-sections'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/details-menu',
  handler (request, reply) {
    const { accountId } = request.url.query

    request.getState([
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

      reply.page(DetailsMenuPage, store)
    })
  }
}]
