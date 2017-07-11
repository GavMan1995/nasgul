import Boom from 'boom'
import jwt from 'jsonwebtoken'
import req from 'request'

import ops from '../../../../config/ops'

import withRequestHeaders from '../../utils/with-request-headers'

export function register (server, options, next) {
  server.auth.scheme('token-check', (server, options) => {
    return {
      authenticate (request, reply) {
        console.info(`Token check attempt: ${request.url.pathname}`)

        req({
          method: 'GET',
          uri: `${ops.authApiBaseUrl()}/verifications`,
          headers: withRequestHeaders(request, {
            'authorization': ops.authApiKey()
          })
        }, (error, response, body) => {
          if (error) return reply(Boom.wrap(error))

          if (response.statusCode === 204) {
            console.info(`Token check success: ${request.url.pathname}`)

            reply.continue({
              credentials: { guid: jwt.decode(request.token()).sub }
            })
          } else {
            reply(Boom.unauthorized(`Token check failed: ${request.url.pathname} (${response.statusCode})`))
          }
        })
      }
    }
  })

  server.auth.strategy('token-check', 'token-check')

  server.auth.default('token-check')

  server.decorate('request', 'token', function dedupToken () {
    const { token } = this.state

    if (Array.isArray(token)) {
      console.warn('Duplicate token cookies found')

      return token.shift()
    }

    return token
  })

  server.state('token', {
    domain: ops.cookieDomain(),
    encoding: 'none',
    isHttpOnly: false,
    isSameSite: false,
    isSecure: ops.useSecureCookies(),
    path: '/',
    ttl: 24 * 60 * 60 * 1000
  })

  next()
}

register.attributes = { name: 'token-check', version: '0.1.0' }
