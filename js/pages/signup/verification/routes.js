import Boom from 'boom'
import req from 'request'

import ops from '../../../../config/ops'

import CallUsPage from '../call-us/page'
import VerificationPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestHeaders from '../../../server/utils/with-request-headers'
import withRequestState from '../../../server/utils/with-request-state'

import parseQuestionData from './parsers/parse-question-data'

module.exports = [
  {
    method: 'GET',
    path: '/verification',
    handler (request, reply) {
      req({
        method: 'GET',
        uri: `${ops.apiBaseUrl()}/verification/questions`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        })
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 200) {
          request.getState((error, state) => {
            if (error) return reply(error)

            const store = createStore(
              reducers,
              withRequestState(
                request,
                Object.assign({}, state, parseQuestionData(body))
              )
            )

            reply.page(VerificationPage, store)
          })
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Failed to retrieve questions (${statusCode})`))
        } else {
          console.error(`Failed to retrieve questions (${statusCode})`)

          let data = {}

          try {
            data = JSON.parse(body)
          } catch (error) {
            console.error('Failed to parse questions response')
            console.error(error)
          }

          request.getState((error, state) => {
            if (error) return reply(error)

            state.message = {
              body: errorMessage(data),
              isDismissable: false,
              type: 'error'
            }

            const store = createStore(reducers, withRequestState(request, state))

            reply.page(CallUsPage, store)
          })
        }
      })
    }
  },
  {
    method: 'POST',
    path: '/verification',
    handler (request, reply) {
      console.info(`CSRF cookie: ${request.state.crumb}`)
      console.info(`CSRF payload: ${request.payload.crumb}`)
      console.info(`CSRF match: ${request.state.crumb === request.payload.crumb}`)

      req({
        method: 'POST',
        uri: `${ops.apiBaseUrl()}/verification/questions`,
        headers: withRequestHeaders(request, {
          'proxy-authenticate': ops.apiKey()
        }),
        body: JSON.stringify(answersPayload(request))
      }, (error, response, body) => {
        if (error) return reply(Boom.wrap(error))

        const { statusCode } = response

        if (statusCode === 200) {
          // IMPORTANT: SEGMENT TRACK THAT TRIGGERS A FACEBOOK PIXEL TRACK
          // THAT IS USED BY AUTO GENERATED FACEBOOK CAMPAIGNS
          reply.trackOnLoad('contentLoad', { 'New Customer': 'free' })

          reply.redirectWithSearch('/add-business')
        } else if (statusCode === 401) {
          reply(Boom.unauthorized(`Failed to answer questions (${statusCode})`))
        } else {
          console.error(`Failed to answer questions (${statusCode})`)

          let data = {}

          try {
            data = JSON.parse(body)
          } catch (error) {
            console.error('Failed to parse answers response')
            console.error(error)
          }

          if (data.attempt_remaining) {
            reply.redirectWithSearch('/try-again')
          } else {
            request.getState((error, state) => {
              if (error) return reply(error)

              state.message = {
                body: errorMessage(data),
                isDismissable: false,
                type: 'error'
              }

              const store = createStore(reducers, withRequestState(request, state))

              // TODO: Add session "flash" messages to avoid using other pages here...
              // QUESTION: Maybe just use yar? (https://github.com/hapijs/yar)
              reply.page(CallUsPage, store)
            })
          }
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
    path: '/verification-b',
    handler (request, reply) {
      reply.redirectWithSearch('/verification')
    }
  }
]

function answersPayload (request) {
  const payload = request.payload || {}

  return {
    body: {
      answers: [
        { id: '1', value: payload.answer1 },
        { id: '2', value: payload.answer2 },
        { id: '3', value: payload.answer3 },
        { id: '4', value: payload.answer4 },
        { id: '5', value: payload.answer5 }
      ],
      sessionId: payload.sessionId
    }
  }
}

function errorMessage (body) {
  if (!Array.isArray(body.errors)) return 'An unknown error has occured.'

  return body.errors.join(' ')
}
