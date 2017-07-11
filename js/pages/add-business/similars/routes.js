import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import SimilarsPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

import parseSimilars from './parsers/parse-similars'

module.exports = [
  {
    method: 'GET',
    path: '/add-business/similars',
    handler (request, reply) {
      if (!hasRequiredParams(request)) {
        return reply.redirectWithSearch('/add-business')
      }

      if (request.state.signupPlan) {
        reply.state('attemptedBusinessSimilars', 'true', {
          domain: ops.cookieDomain(),
          encoding: 'none',
          isHttpOnly: false,
          isSameSite: false,
          isSecure: ops.useSecureCookies(),
          path: '/'
        })
      }

      req({
        method: 'POST',
        url: `${ops.apiBaseUrl()}/businesses/similars`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(businessPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        if (response.statusCode === 200) {
          let similars = []

          try {
            // NOTE: Parsing the similars twice seems unneeded...
            similars = JSON.parse(body).similars
          } catch (error) {
            console.error('Failed to parse similars')
            console.error(error)
          }

          if (similars.length === 0) {
            reply.redirect(nextStepURL(request))
          } else {
            request.getState((error, state) => {
              if (error) return reply(error)

              state.similars = parseSimilars(body)

              const store = createStore(reducers, Object.assign({},
                withRequestState(request, state),
                { signupPlan: request.state.signupPlan }))

              reply.page(SimilarsPage, store)
            })
          }
        } else if (response.statusCode === 401) {
          reply(Boom.unauthorized(`Failed to get similars (${response.statusCode})`))
        } else {
          request.getState((error, state) => {
            if (error) return reply(error)

            // TODO: Create utility methods for attaching messages!
            state.message = {
              body: 'Sorry, there was an error retrieving your business matches.',
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(SimilarsPage, store)
          })
        }
      })
    }
  },
  {
    method: 'POST',
    path: '/add-business/similars',
    handler (request, reply) {
      req({
        method: 'POST',
        url: `${ops.apiBaseUrl()}/businesses/select_similar`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(similarPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 200) {
          reply.redirect(nextStepURL(request))
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Failed to select similar (${statusCode})`))
        } else {
          console.error(`Failed to select similar (${statusCode})`)

          request.getState((error, state) => {
            if (error) return reply(error)

            state.message = {
              body: errorMessage(body),
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(SimilarsPage, store)
          })
        }
      })
    }
  }
]

function businessPayload (request) {
  const query = request.url.query || {}

  return {
    business: {
      name: query.name,
      owned: query.owned || false,
      profile: {},
      financials: {},
      address_attributes: {
        street1: '123',
        city: 'City',
        state: 'CA',
        zip: query.zip
      }
    },
    bureau: query.bureau
  }
}

function errorMessage (body) {
  if (!Array.isArray(body.errors)) return 'An unknown error has occured.'

  return body.errors.join(' ')
}

function hasRequiredParams (request) {
  const { bureau, id, name, zip } = request.url.query

  return !!bureau && !!id && !!name && !!zip
}

function nextStepURL (request) {
  // GET and POST store the businessInfo differently
  let businessInfo = request.url.query
  if (request.method === 'post') {
    businessInfo = JSON.parse(request.payload.businessInfo)
  }
  const { bureau, id, isOwned, name, zip } = businessInfo

  if (bureau === 'dandb') {
    if (request.state.signupPlan && request.state.signupPlan !== 'freemium') {
      return `/billing`
    }
    return `/add-business/complete?id=${id}`
  }

  return `/add-business/similars?bureau=dandb&name=${name}&zip=${zip}&id=${id}&isOwned=${isOwned}`
}

function similarPayload (request) {
  const payload = request.payload || {}

  let businessInfo = {}
  let similar = {}

  try {
    businessInfo = JSON.parse(payload.businessInfo)
  } catch (error) {
    console.error('Could not parse business info')
    console.error(error)
  }

  try {
    similar = JSON.parse(payload.similar)
  } catch (error) {
    console.error('Could not parse similar')
    console.error(error)
  }

  return {
    id: businessInfo.id,
    similar,
    ownership_established: businessInfo.isOwned === 'true' ? true : null
  }
}
