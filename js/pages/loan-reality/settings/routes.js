import SettingsPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import ops from '../../../../config/ops'
import Boom from 'boom'
import req from 'request'

import withRequestState from '../../../server/utils/with-request-state'
import withRequestHeaders from '../../../server/utils/with-request-headers'

import parseAccounts from '../onboarding/accounts/parsers/parse-accounts'
import parseEnrollmentsResults from '../common/parsers/parse-enrollments-results'

import parseEnrollmentSettings from './parsers/parse-enrollment-settings'
import parseHiddenAccounts from './parsers/parse-hidden-accounts'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/settings',
  handler (request, reply) {
    const { token } = request.state

    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/accounts`,
        parser: parseAccounts,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      },
      {
        uri: `${ops.gringottsUrl()}/api/accounts?include=deleted`,
        parser: parseHiddenAccounts,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      },
      {
        uri: `${ops.gringottsUrl()}/api/enrollments`,
        parser: parseEnrollmentsResults,
        headers: {
          'authorization': `Token ${token}`
        }
      }
    ], (error, state) => {
      if (error) return reply(error)

      const accounts = state.accounts.concat(state.hiddenAccounts)
      const enrollments = parseEnrollmentSettings(state.enrollments, accounts)
      const finalState = Object.assign({}, state, enrollments)

      const store = createStore(reducers, withRequestState(request, finalState))

      reply.page(SettingsPage, store)
    })
  }
},
{
  method: 'GET',
  path: '/loan-reality/bank-enrollment/delete',
  handler (request, reply) {
    const { enrollmentId } = request.url.query
    const { token } = request.state
    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/accounts`,
        parser: parseAccounts,
        headers: {
          'authorization': `Token ${request.token()}`
        }
      }], (error, state) => {
      if (error) return reply(error)

      for (let account of state.accounts) {
        req({
          method: 'DELETE',
          uri: `${ops.gringottsUrl()}/api/accounts/${account.id}`,
          headers: withRequestHeaders(request, {
            'authorization': `Token ${token}`
          })
        }, (error, response, body) => {
          if (error) return reply(Boom.wrap(error))
        })
      }

      req({
        method: 'DELETE',
        uri: `${ops.gringottsUrl()}/api/enrollments/${enrollmentId}`,
        headers: withRequestHeaders(request, {
          'authorization': `Token ${token}`
        })
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        return reply.redirect('/loan-reality/settings')
      })
    })
  }
},
{
  method: 'GET',
  path: '/loan-reality/bank-account/delete',
  handler (request, reply) {
    const { accountId } = request.url.query
    const { token } = request.state

    req({
      method: 'DELETE',
      uri: `${ops.gringottsUrl()}/api/accounts/${accountId}`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${token}`
      })
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      return reply.redirect('/loan-reality/settings')
    })
  }
},
{
  method: 'GET',
  path: '/loan-reality/bank-account/activate',
  handler (request, reply) {
    const { accountId } = request.url.query
    const { token } = request.state

    req({
      method: 'POST',
      uri: `${ops.gringottsUrl()}/api/accounts/${accountId}`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${token}`
      })
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      return reply.redirect('/loan-reality/settings')
    })
  }
}]
