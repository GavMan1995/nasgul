import Boom from 'boom'
import isNull from 'lodash.isnull'
import omitBy from 'lodash.omitby'
import req from 'request'

import { Observable } from 'rx-lite'

import ops from '../../../../config/ops'

import FinancialProfilePage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

import parseProfileBusiness from '../parsers/parse-profile-business'

module.exports = [
  {
    method: 'GET',
    path: '/app/profile/financial',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.apiBaseUrl()}/api/v3/business_profiles`,
          parser: parseProfileBusiness
        }
      ], (error, state) => {
        if (error) return reply(error)

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(FinancialProfilePage, store)
      })
    }
  },
  {
    method: 'POST',
    path: '/app/profile/financial',
    handler (request, reply) {
      Observable.merge(financials(request).map((financial) => {
        return updateRequest(request, financial)
      })).subscribe(
        () => console.info('Financial profile updated'),
        (error) => {
          console.error('Failed to update financial profile')
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

            reply.page(FinancialProfilePage, store)
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

            reply.page(FinancialProfilePage, store)
          })
        }
      )
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/app/profile/financial_details',
    handler (request, reply) {
      reply.redirectWithSearch('/app/profile/financial')
    }
  }
]

function financials (request) {
  const payload = request.payload || {}

  return Object.keys(payload).filter((key) => {
    return /^financial_[0-9]+_guid/.test(key)
  }).map((key) => {
    const match = /^(financial_[0-9]+_)guid/.exec(key)[1]

    return {
      guid: payload[`${match}guid`],
      changes: Object.assign({},
        omitBy({
          annual_gross_revenue: parseIntString(payload[`${match}annual_gross_revenue`]),
          monthly_bank_deposits: parseIntString(payload[`${match}monthly_bank_deposits`]),
          daily_bank_balance: parseIntString(payload[`${match}daily_bank_balance`]),
          accepts_credit_cards: parseBoolString(payload[`${match}accepts_credit_cards`]),
          monthly_credit_card_sales: parseIntString(payload[`${match}monthly_credit_card_sales`]),
          profitable: parseBoolString(payload[`${match}profitable`]),
          annual_profit: parseIntString(payload[`${match}annual_profit`]),
          monthly_expenses: parseIntString(payload[`${match}monthly_expenses`])
        }, isNull)
      )
    }
  })
}

function parseBoolString (boolString) {
  return /(?:true|yes)/i.test(boolString)
}

function parseIntString (intString) {
  const value = parseInt(intString)

  return isNaN(value) ? null : value
}

function selector (error, response, body) {
  return [error, response, body]
}

function updateRequest (request, financial) {
  return Observable.fromCallback(req, null, selector)({
    method: 'PUT',
    uri: `${ops.apiBaseUrl()}/api/v3/business_profiles/${financial.guid}`,
    headers: withRequestHeaders(request, {
      'proxy-authenticate': ops.apiKey()
    }),
    body: JSON.stringify({ update_values: financial.changes })
  }).map(([error, response, body]) => {
    if (error) throw Boom.wrap(error)

    if (response.statusCode !== 200) throw Boom.create(response.statusCode)

    return body
  })
}
