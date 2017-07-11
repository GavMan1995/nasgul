import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../utils/with-request-headers'

module.exports = [{
  method: ['GET', 'POST', 'PUT'],
  path: '/client/lrc/{path*}',
  handler (request, reply) {
    req({
      method: request.method,
      uri: `${ops.gringottsUrl()}/${request.params.path}`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${request.token()}`
      }),
      json: request.payload,
      qs: request.url.query
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
