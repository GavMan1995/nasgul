import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import withRequestHeaders from '../utils/with-request-headers'

module.exports = [{
  method: 'GET',
  path: '/change-business',
  handler (request, reply) {
    const { businessId } = request.url.query

    req({
      method: 'POST',
      url: `${ops.apiBaseUrl()}/businesses/${businessId}/set_default`,
      headers: withRequestHeaders(request, {
        'proxy-authenticate': ops.apiKey()
      })
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      reply.redirect(request.info.referrer)
    })
  }
}]
