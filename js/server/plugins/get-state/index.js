import Boom from 'boom'
import req from 'request'
import { Observable } from 'rx-lite'

import ops from '../../../../config/ops'

import withRequestHeaders from '../../utils/with-request-headers'

import parseMember from '../../../common/parsers/parse-member'

const authRequests = [
  {
    uri: `${ops.apiBaseUrl()}/get_member_status`,
    parser: parseMember
  },
  {
    uri: `${ops.apiBaseUrl()}/feature_flags`,
    parser: (rawBody) => ({ featureFlags: JSON.parse(rawBody).data })
  }
]

export function register (server, options, next) {
  server.decorate('request', 'getState', function getState (requests = [], callback) {
    if (typeof requests === 'function') callback = requests

    if (!Array.isArray(requests)) requests = []

    let state = {}

    return Observable.mergeDelayError([...authRequests, ...requests].map((r) => {
      return Observable.fromCallback(req, null, selector)({
        method: 'GET',
        uri: r.uri,
        headers: withRequestHeaders(this, Object.assign({}, {
          'proxy-authenticate': ops.apiKey()
        }, r.headers)),
        qs: r.query
      }).map(([error, response, body]) => {
        if (!r.silent && error) throw Boom.wrap(error)

        const { statusCode } = response

        if (statusCode === 200) {
          return r.parser(body)
        } else if (statusCode > 200 && statusCode < 300) {
          console.warn(`API returned an odd success: ${statusCode}`)

          return {}
        } else {
          if (statusCode === 401) throw Boom.create(statusCode)

          if (r.silent) return

          const { method, uri: { href } } = response.request

          throw Boom.wrap(new Error(`${method} ${href} ${statusCode}`))
        }
      })
    })).subscribe(
      (data) => { state = Object.assign({}, state, data) },
      (error) => {
        let actual = error

        // TODO: Better handle multiple errors, prioritized or just dump them all?
        if (error.innerErrors) actual = error.innerErrors.sort(sortBoom).shift()

        this.context = state

        callback(actual, state)
      },
      () => {
        this.context = state

        callback(null, state)
      }
    )
  })

  next()
}

function selector (error, response, body) {
  return [error, response, body]
}

function sortBoom (a, b) {
  if (a.output.statusCode < b.output.statusCode) return -1

  if (a.output.statusCode > b.output.statusCode) return 1

  return 0
}

register.attributes = { name: 'get-state', version: '0.1.0' }
