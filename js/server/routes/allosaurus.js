import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../utils/with-request-headers'

module.exports = [{
  method: ['GET', 'POST', 'PUT'],
  path: '/client/{path*}',
  handler (request, reply) {
    req({
      method: request.method,
      uri: `${ops.apiBaseUrl()}/${request.params.path}`,
      headers: withRequestHeaders(request, {
        'proxy-authenticate': ops.apiKey()
      }),
      json: request.payload
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      reply(body).code(response.statusCode)
    })
  },
  config: {
    plugins: {
      crumb: { restful: true }
    }
  }
}]
