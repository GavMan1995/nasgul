import omit from 'lodash.omit'

import ops from '../../../../config/ops'

import RegisterPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import planCodeAliases from '../../../common/data/plan-code-aliases'

import errorsArray from '../../../common/utils/errors-array'
import withRequestState from '../../../server/utils/with-request-state'
import withQueryParams from '../../../common/utils/with-query-params'

module.exports = [{
  method: 'GET',
  path: '/registration/{plan?}',
  handler (request, reply) {
    const params = Object.assign(
      {},
      request.affiliateAttribution(),
      omit(request.url.query, 'email')
    )

    // Parse the human readable plan from the url and convert it to the planCode
    const planCode = planCodeAliases[request.params.plan] || 'freemium'

    const store = createStore(reducers, withRequestState(request, {
      email: request.url.query.email,
      errors: errorsArray(request.url.query.errors),
      formAction: withQueryParams(`${ops.publicApiBaseUrl()}/signup/standard`, params),
      planCode
    }))

    // Track the planCode in a cookie to decide whether or not to show a payment form (paid signup)
    reply.state('signupPlan', planCode, {
      domain: ops.cookieDomain(),
      encoding: 'none',
      isHttpOnly: false,
      isSameSite: false,
      isSecure: ops.useSecureCookies(),
      path: '/'
    })

    // This will be used to determine whether or not to show an upgrade option page on the Standard flow
    reply.state('prompt', request.url.query.prompt, {
      domain: ops.cookieDomain(),
      encoding: 'none',
      isHttpOnly: false,
      isSameSite: false,
      isSecure: ops.useSecureCookies(),
      path: '/'
    })

    reply.page(RegisterPage, store)
  },
  config: { auth: false }
},
{
  method: 'GET',
  path: '/register',
  handler (request, reply) {
    reply.redirectWithSearch('/registration')
  },
  config: { auth: false }
}]
