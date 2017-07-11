import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import IdentificationPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

module.exports = [
  {
    method: 'GET',
    path: '/identification',
    handler (request, reply) {
      request.getState((error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(IdentificationPage, store)
      })
    }
  },
  {
    method: 'POST',
    path: '/identification',
    handler (request, reply) {
      console.info(`CSRF cookie: ${request.state.crumb}`)
      console.info(`CSRF payload: ${request.payload.crumb}`)
      console.info(`CSRF match: ${request.state.crumb === request.payload.crumb}`)

      req({
        method: 'PUT',
        uri: `${ops.apiBaseUrl()}/freemium/update`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(identificationPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 204) {
          reply.redirectWithSearch('/verification')
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Identification update failed (${statusCode})`))
        } else {
          console.error(`Identification update failed (${statusCode})`)

          request.getState((error, state) => {
            if (error) return reply(error)

            state.message = {
              body: 'Sorry, there was an error updating your account.',
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(IdentificationPage, store)
          })
        }
      })
    },
    // NOTE: Temporarily disabled
    config: {
      plugins: { crumb: false }
    }
  }
]

function identificationPayload (request) {
  const payload = request.payload || {}

  return {
    member: {
      phones_attributes: [{ number: payload.phone }],
      profile_attributes: {
        ssn: payload.ssn,
        dob: `${payload.year}-${payload.month}-${payload.day}`
      }
    }
  }
}
