import DerogatoriesPage from './page'

import { createStore } from 'redux'
import reducers from '../../reducers'
import ops from '../../../../../../config/ops'

import getBusinessFromCookie from '../../utils/get-business-from-cookie'
import withRequestState from '../../../../../server/utils/with-request-state'

import parseExperianBusinessReport from '../../../common/parsers/parse-experian-business-report'
import parseDunAndBradStreetReport from '../../../common/parsers/parse-dun-and-bradstreet-report'

module.exports = [{
  method: 'GET',
  path: '/partner/reports/score-factors/derogatories/xpn',
  handler (request, reply) {
    request.getGenericState([
      {
        uri: `${ops.publicApiBaseUrl()}/v1/experian_business_report`,
        parser: parseExperianBusinessReport,
        headers: {
          // TODO will need to change this to 'Token' once the kong jwt plugin is updated
          'authorization': `Bearer ${request.token()}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      state.business = getBusinessFromCookie(request)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(DerogatoriesPage, store)
    })
  },
  config: { auth: false }
},
{
  method: 'GET',
  path: '/partner/reports/score-factors/derogatories/dnb',
  handler (request, reply) {
    request.getGenericState([
      {
        uri: `${ops.publicApiBaseUrl()}/v1/dun_and_bradstreet_report`,
        parser: parseDunAndBradStreetReport,
        headers: {
          // TODO will need to change this to 'Token' once the kong jwt plugin is updated
          'authorization': `Bearer ${request.token()}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      state.business = getBusinessFromCookie(request)

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(DerogatoriesPage, store)
    })
  },
  config: { auth: false }
}]
