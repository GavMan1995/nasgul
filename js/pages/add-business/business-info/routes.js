import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import BusinessInfoPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'
import withQueryParams from '../../../common/utils/with-query-params'

module.exports = [
  {
    method: 'GET',
    path: '/add-business',
    handler (request, reply) {
      request.getState((error, state) => {
        if (error) return reply(error)

        if (request.url.query.verify === 'true') {
          state.message = {
            body: "We've verified your identity! Welcome to Nav.",
            isDismissable: true,
            type: 'success'
          }
        }

        const finalState = Object.assign({},
          withRequestState(request, state),
          {
            prompt: request.state.prompt === 'true',
            signupPlan: request.state.signupPlan
          }
        )
        const store = createStore(reducers, finalState)

        reply.page(BusinessInfoPage, store)
      })
    }
  },
  {
    method: 'POST',
    path: '/add-business',
    handler (request, reply) {
      req({
        method: 'POST',
        url: `${ops.apiBaseUrl()}/businesses`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(businessPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 200) {
          let business = {}

          try {
            business = JSON.parse(body)
          } catch (error) {
            console.error('Could not parse business')
            console.error(error)
          }

          // IMPORTANT: SEGMENT TRACK THAT TRIGGERS A FACEBOOK PIXEL TRACK
          // THAT IS USED BY AUTO GENERATED FACEBOOK CAMPAIGNS
          reply.trackOnLoad('contentLoad', { 'New Business': 'free' })

          // NOTE: No need to use `redirectWithSearch` for "guided" UX routes
          reply.redirect(withQueryParams(
            '/add-business/similars',
            businessParams(request, business.business_id)
          ))
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Business update failed (${statusCode})`))
        } else {
          console.error(`Business update failed (${statusCode})`)

          request.getState((error, state) => {
            if (error) return reply(error)

            state.message = {
              body: errorMessage(body),
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers,
              withRequestState(request, state),
              {
                prompt: request.state.prompt === 'true',
                signupPlan: request.state.signupPlan
              }
            )

            reply.page(BusinessInfoPage, store)
          })
        }
      })
    }
  }
]

function businessParams (request, businessId) {
  const payload = request.payload || {}

  return {
    bureau: 'experian',
    name: payload.name,
    zip: payload.zip,
    id: businessId,
    isOwned: payload.isOwned === 'true'
  }
}

function businessPayload (request) {
  const payload = request.payload || {}
  const owned = payload.isOwned === 'true'

  return {
    business: {
      name: payload.name,
      owned,
      profile: {},
      financials: {},
      address_attributes: {
        street1: '123',
        city: 'City',
        state: 'CA',
        zip: payload.zip
      }
    },
    // QUESTION: Why is this "null" if not owned in facehugger, why not false?
    ownership_established: owned ? true : null
  }
}

function errorMessage (body) {
  if (!Array.isArray(body.errors)) return 'An unknown error has occured.'

  return body.errors.join(' ')
}
