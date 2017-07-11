import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../utils/with-request-headers'

module.exports = [{
  method: 'GET',
  path: '/client/api/v2/personal_offers',
  handler (request, reply) {
    req({
      method: request.method,
      uri: `${ops.lexBaseUrl()}/api/v2/personal_offers`,
      headers: withRequestHeaders(request, {
        'authorization': `Token token="${ops.lexApiKey()}"`,
        'x-authentication-jwt': request.token()
      }),
      qs: Object.assign({}, {
        business_id: request.state.businessId,
        limit: 1
      }, request.query)
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
