import Boom from 'boom'
import req from 'request'

import ops from '../../../config/ops'

import decodeReferer from '../../server/utils/decode-referer'
import isProductionEnv from '../../server/utils/is-production-env'
import isValidReferer from '../../server/utils/is-valid-referer'
import withRequestHeaders from '../../server/utils/with-request-headers'

import LoginPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../server/utils/with-request-state'

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler (request, reply) {
      let message

      if (request.url.query.code === '401') {
        message = {
          body: 'For your security we have logged you out. Please log in again.',
          isDismissable: false,
          type: 'notice'
        }
      }

      const store = createStore(reducers, withRequestState(request, {
        authBaseUrl: ops.authBaseUrl(),
        message
      }))

      reply.page(LoginPage, store)
    },
    config: { auth: false }
  },
  {
    method: 'POST',
    path: '/login',
    handler (request, reply) {
      req({
        method: 'POST',
        uri: `${ops.authApiBaseUrl()}/sessions`,
        headers: withRequestHeaders(request, {
          'authorization': ops.authApiKey()
        }),
        form: request.payload
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        if (response.statusCode === 401) {
          const store = createStore(reducers, withRequestState(request, {
            authBaseUrl: ops.authBaseUrl(),
            email: request.payload['session[email]'] || '',
            message: {
              body: errorMessage(body),
              isDismissable: false,
              type: 'error'
            }
          }))

          reply.page(LoginPage, store)
        } else if (response.statusCode === 204) {
          reply
            .redirect(redirectUrl(request))
            .state('token', response.headers['x-authentication-jwt'])
        } else {
          reply(Boom.wrap(
            new Error(`API: ${JSON.stringify(body)} ${response.statusCode}`)
          ))
        }
      })
    },
    config: { auth: false }
  }
]

function errorMessage (body) {
  let data = {}

  try {
    data = JSON.parse(body)
  } catch (error) {
    // TODO: Improve error logging...?
    console.error(error)
  }

  if (data.errors) {
    if (data.errors.indexOf('Account is locked.') > -1) {
      return 'Your account is locked. Please call customer support at 855-226-8388.'
    } else if (data.errors.indexOf('Account Failed to login.') > -1) {
      return 'Incorrect email or password.'
    }
  } else if (data.error) {
    return data.error
  }

  return 'An unknown error has occurred'
}

function redirectUrl (request) {
  let result = '/home'

  if (request.query.referer) {
    const referer = decodeReferer(request.query.referer)

    let protocol = isProductionEnv() ? 'https://' : 'http://'

    if (isValidReferer(referer)) result = `${protocol}${referer}`
  }

  return result
}
