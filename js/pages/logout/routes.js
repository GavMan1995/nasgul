import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../../server/utils/with-request-headers'

module.exports = [{
  method: 'GET',
  path: '/logout',
  handler (request, reply) {
    req({
      method: 'DELETE',
      uri: `${ops.authApiBaseUrl()}/sessions`,
      headers: withRequestHeaders(request, {
        'authorization': ops.authApiKey()
      })
    }, (error, response, body) => {
      if (error || response.statusCode !== 204) {
        console.warn(`Failed to destroy session ${(response && response.statusCode) || '???'}`)
      } else {
        console.info('Successfully destroyed session')
      }

      reply.redirectWithSearch('/login').unstate('token')
    })
  },
  config: { auth: false }
}]
