import isEmpty from 'lodash.isempty'
import omit from 'lodash.omit'
import omitBy from 'lodash.omitby'

import ops from '../../../../config/ops'

module.exports = [{
  method: 'POST',
  path: '/partner/handshake',
  handler (request, reply) {
    reply.state('business', omitBy(omit(request.payload, 'token'), isEmpty), {
      domain: ops.cookieDomain(),
      encoding: 'base64json',
      isHttpOnly: false,
      isSameSite: false,
      isSecure: ops.useSecureCookies(),
      path: '/'
    })
    reply.state('token', request.payload.token)
    reply.redirect('/partner/reports/score/xpn')
  },
  config: {
    auth: false,
    plugins: { crumb: false }
  }
}]
