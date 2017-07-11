import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import PersonalInfoPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

module.exports = [
  {
    method: 'GET',
    path: '/personal-info',
    handler (request, reply) {
      request.getState((error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(PersonalInfoPage, store)
      })
    },
    config: {
      auth: { mode: 'try', strategies: ['onetime-jwt', 'token-check'] }
    }
  },
  {
    method: 'POST',
    path: '/personal-info',
    handler (request, reply) {
      console.info(`CSRF cookie: ${request.state.crumb}`)
      console.info(`CSRF payload: ${request.payload.crumb}`)
      console.info(`CSRF match: ${request.state.crumb === request.payload.crumb}`)

      req({
        method: 'PUT',
        url: `${ops.apiBaseUrl()}/freemium/update`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(memberPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 204) {
          reply.redirectWithSearch('/identification')
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Personal info update failed (${statusCode})`))
        } else {
          console.error(`Personal info update failed (${statusCode})`)

          request.getState((error, state) => {
            if (error) return reply(error)

            state.message = {
              body: 'Sorry, there was an error updating your account.',
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(PersonalInfoPage, store)
          })
        }
      })
    },
    // NOTE: Temporarily disabled
    config: {
      plugins: { crumb: false }
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/personal-info-b',
    handler (request, reply) {
      reply.redirectWithSearch('/personal-info')
    }
  }
]

function memberPayload (request) {
  const payload = request.payload || {}

  return {
    member: {
      first_name: payload.firstName,
      last_name: payload.lastName,
      phones_attributes: [{ number: payload.phone }],
      address_attributes: {
        street1: payload.street1,
        city: payload.city,
        state: payload.state,
        zip: payload.zip
      }
    }
  }
}
