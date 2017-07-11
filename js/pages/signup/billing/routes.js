import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import BillingPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import planCodeAliases from '../../../common/data/plan-code-aliases'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

import parsePlans from '../parsers/parse-plans'

module.exports = [{
  method: 'GET',
  path: '/billing/{plan?}',
  handler (request, reply) {
    request.getState([
      {
        uri: `${ops.apiBaseUrl()}/api/v3/plans`,
        parser: parsePlans
      }
    ], (error, state) => {
      if (error) return reply(error)

      // Parse the human readable plan from the url and convert it to the planCode
      const planCode = planCodeAliases[request.params.plan] || request.state.signupPlan || 'freemium'

      const store = createStore(reducers, Object.assign({},
        withRequestState(request, state),
        {
          signupPlan: planCode,
          attemptedBusinessSimilars: request.state.attemptedBusinessSimilars
        }
      ))

      reply.page(BillingPage, store).unstate('attemptedBusinessSimilars', {
        domain: ops.cookieDomain(),
        encoding: 'none',
        isHttpOnly: false,
        isSameSite: false,
        isSecure: ops.useSecureCookies(),
        path: '/'
      })
    })
  }
},
{
  method: 'POST',
  path: '/billing',
  handler (request, reply) {
    console.log('request.payload', request.payload)
    req({
      method: 'POST',
      url: `${ops.apiBaseUrl()}/api/v3/signup_upgrades`,
      headers: withRequestHeaders(request, {
        'proxy-authenticate': ops.apiKey()
      }),
      body: JSON.stringify(paymentPayload(request))
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      const { statusCode } = response

      if (statusCode === 204) {
        reply.redirectWithSearch('/welcome')
      } else if (statusCode === 401) {
        reply(Boom.unauthorized('Authentication Needed'))
      } else {
        console.error(`Billing update failed (${statusCode})`)
        reply.redirectWithSearch('/call-us')
      }
    })
  }
}]

function paymentPayload (request) {
  const payload = request.payload || {}

  return {
    coupon: payload.couponCode,
    plan_code: payload.planCode,
    token_id: payload.tokenId
  }
}
