import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../utils/with-request-headers'

module.exports = [{
  method: 'PUT',
  path: '/client/keep-alive',
  handler (request, reply) {
    req({
      method: 'PUT',
      uri: `${ops.authApiBaseUrl()}/sessions`,
      headers: withRequestHeaders(request, {
        'authorization': ops.authApiKey(),
        'x-authentication-jwt': request.token()
      })
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      if (response.statusCode !== 204) {
        return reply(body).code(response.statusCode)
      }

      reply().state('token', response.headers['x-authentication-jwt']).code(204)
    })
  },
  config: {
    plugins: {
      crumb: { restful: true }
    }
  }
}]
