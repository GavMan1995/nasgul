import WelcomePage from './page'

import ops from '../../../../config/ops'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/welcome',
  handler (request, reply) {
    request.getState((error, state) => {
      if (error) return reply(error)

      const store = createStore(reducers, withRequestState(request, state))

      // IMPORTANT: SEGMENT TRACK THAT TRIGGERS A FACEBOOK PIXEL TRACK
      // THAT IS USED BY AUTO GENERATED FACEBOOK CAMPAIGNS
      if (request.state.signupPlan) {
        reply.trackOnLoad('contentLoad', { 'New Customer': 'paid' })
      }

      reply.page(WelcomePage, store).unstate('signupPlan', {
        domain: ops.cookieDomain(),
        encoding: 'none',
        isHttpOnly: false,
        isSameSite: false,
        isSecure: ops.useSecureCookies(),
        path: '/'
      })
    })
  }
}]
