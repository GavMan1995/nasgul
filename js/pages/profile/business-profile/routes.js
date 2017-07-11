import Boom from 'boom'
import isEmpty from 'lodash.isempty'
import isNull from 'lodash.isnull'
import omitBy from 'lodash.omitby'
import req from 'request'

import { Observable } from 'rx-lite'

import ops from '../../../../config/ops'

import BusinessProfilePage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

import parseProfileBusiness from '../parsers/parse-profile-business'

module.exports = [
  {
    method: 'GET',
    path: '/app/profile/business',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.apiBaseUrl()}/api/v3/business_profiles`,
          parser: parseProfileBusiness
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(BusinessProfilePage, store)
      })
    }
  },
  {
    method: 'POST',
    path: '/app/profile/business',
    handler (request, reply) {
      Observable.merge(businesses(request).map((business) => {
        return updateRequest(request, business)
      })).subscribe(
        () => console.info('Business profile updated'),
        (error) => {
          console.error('Failed to update business profile')
          console.error(error)

          request.getState([
            {
              uri: `${ops.apiBaseUrl()}/api/v3/business_profiles`,
              parser: parseProfileBusiness
            }
          ], (error, state) => {
            if (error) return reply(error)

            state.message = {
              body: 'Sorry, there was an error saving your business information.',
              isDismissable: true,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(BusinessProfilePage, store)
          })
        },
        () => {
          request.getState([
            {
              uri: `${ops.apiBaseUrl()}/api/v3/business_profiles`,
              parser: parseProfileBusiness
            }
          ], (error, state) => {
            if (error) return reply(error)

            state.message = {
              body: 'Your profile was updated successfully.',
              isDismissable: true,
              type: 'success'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(BusinessProfilePage, store)
          })
        }
      )
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/profile',
    handler (request, reply) {
      reply.redirectWithSearch('/app/profile/business')
    }
  },
  {
    method: 'GET',
    path: '/app/profile/personal_details',
    handler (request, reply) {
      reply.redirectWithSearch('/app/profile/business')
    }
  },
  {
    method: 'GET',
    path: '/app/profile/business_details',
    handler (request, reply) {
      reply.redirectWithSearch('/app/profile/business')
    }
  }
]

function businesses (request) {
  const payload = request.payload || {}

  return Object.keys(payload).filter((key) => {
    return /^business_[0-9]+_guid/.test(key)
  }).map((key) => {
    const match = /^(business_[0-9]+_)guid/.exec(key)[1]

    return {
      guid: payload[`${match}guid`],
      changes: Object.assign({},
        omitBy({
          legal_type: payload[`${match}legal_entity`],
          industry: payload[`${match}industry`],
          start_date: sanitizeDate(payload[`${match}start_date`])
        }, isEmpty),
        omitBy({
          invoiced: parseBoolString(payload[`${match}invoiced`]),
          registered: parseBoolString(payload[`${match}registered_entity`])
        }, isNull)
      )
    }
  })
}

function parseBoolString (boolString) {
  return /(?:true|yes)/i.test(boolString)
}

function sanitizeDate (date) {
  const pattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const match = pattern.exec(date)

  if (match) {
    return `${match[3]}-${match[1]}-${match[2]}`
  } else {
    return ''
  }
}

function selector (error, response, body) {
  return [error, response, body]
}

function updateRequest (request, business) {
  return Observable.fromCallback(req, null, selector)({
    method: 'PUT',
    uri: `${ops.apiBaseUrl()}/api/v3/business_profiles/${business.guid}`,
    headers: withRequestHeaders(request, {
      'proxy-authenticate': ops.apiKey()
    }),
    body: JSON.stringify({ update_values: business.changes })
  }).map(([error, response, body]) => {
    if (error) throw Boom.wrap(error)

    if (response.statusCode !== 200) throw Boom.create(response.statusCode)

    return body
  })
}
