import Boom from 'boom'
import jwt from 'jsonwebtoken'
import omit from 'lodash.omit'
import req from 'request'

import ops from '../../../../config/ops'

import withQueryParams from '../../../common/utils/with-query-params'

export function register (server, options, next) {
  server.auth.scheme('onetime-jwt', (server, options) => {
    return {
      authenticate (request, reply) {
        console.info(`Onetime JWT attempt: ${request.url.pathname}`)

        req({
          method: 'PUT',
          uri: `${ops.authApiBaseUrl()}/sessions`,
          // NOTE: This is bare bones object to avoid sending cookies
          // NOTE: The cookies may have caused an unneeded login!
          headers: {
            'accept': 'application/json',
            'accept-encoding': 'utf-8',
            'authorization': ops.authApiKey(),
            'content-type': 'application/json',
            'user-agent': request.headers['user-agent'],
            'x-authentication-jwt': request.url.query.jwt
          }
        }, (error, response, body) => {
          if (error) return reply(Boom.wrap(error))

          if (response.statusCode === 204) {
            console.info(`Onetime JWT success: ${request.url.pathname}`)

            const { ses: onetimeSessionId } = jwt.decode(request.url.query.jwt)
            const { ses: newSessionId } = jwt.decode(response.headers['x-authentication-jwt'])

            if (onetimeSessionId === newSessionId) {
              return reply(Boom.unauthorized(`Onetime JWT session reused: ${request.url.pathname}`))
            }

            reply
              .redirect(withQueryParams(
                request.url.pathname,
                omit(request.url.query, 'jwt')
              ))
              .state('token', response.headers['x-authentication-jwt'])
          } else {
            reply(Boom.unauthorized(`Onetime JWT failed: ${request.url.pathname} (${response.statusCode})`))
          }
        })
      }
    }
  })

  server.auth.strategy('onetime-jwt', 'onetime-jwt')

  next()
}

register.attributes = { name: 'onetime-jwt', version: '0.1.0' }
