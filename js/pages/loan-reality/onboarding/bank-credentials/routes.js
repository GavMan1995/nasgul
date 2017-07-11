import BankCredentialsPage from './page'
import EnrollmentService from '../../common/enrollment-service'
import parseEnrollmentsResults from '../../common/parsers/parse-enrollments-results'

import { createStore } from 'redux'
import reducers from './reducers'

import req from 'request'
import Boom from 'boom'
import ops from '../../../../../config/ops'

import parseCredentialResults from './parsers/parse-credential-results'

import withRequestHeaders from '../../../../server/utils/with-request-headers'
import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/bank-credentials',
  handler (request, reply) {
    const { token } = request.state
    const { institutionId, institutionName } = request.url.query

    request.getState([
      {
        uri: `${ops.gringottsUrl()}/api/credentials?institution_id=${institutionId}`,
        parser: parseCredentialResults,
        headers: {
          'authorization': `Token ${token}`
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
      if (error) return reply(Boom.wrap(error))

      const currentEnrollment = state.enrollments.filter((item) => {
        return item.institutionId === institutionId
      })[0]

      state.enrollment = currentEnrollment || {}
      // Go to the right place if an enrollment exists
      if (currentEnrollment && currentEnrollment.status !== 'DENIED') {
        const url = EnrollmentService.redirectUrl(currentEnrollment)
        return reply.redirect(url)
      }

      // otherwise do your stuff
      state.institution = {
        id: institutionId,
        name: institutionName
      }

      const store = createStore(reducers, withRequestState(request, state))

      reply.page(BankCredentialsPage, store)
    })
  }
},
{
  method: 'POST',
  path: '/loan-reality/bank-enrollment',
  handler (request, reply) {
    const { institutionId } = request.payload
    const { token } = request.state

    req({
      method: 'POST',
      uri: `${ops.gringottsUrl()}/api/enrollments`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${token}`
      }),
      body: JSON.stringify(EnrollmentService.postBody(request))
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      // blow up if there is an api error returned
      if (JSON.parse(body).errors) {
        const url = EnrollmentService.errorUrl('apiError')
        return reply.redirect(url)
      }

      // make sure we have the matching enrollment
      const results = parseEnrollmentsResults(body)
      const enrollment = results.enrollments.filter((en) => {
        return en.institutionId === institutionId
      })[0]

      const url = EnrollmentService.redirectUrl(enrollment)
      return reply.redirect(url)
    })
  }
},
{
  method: 'POST',
  path: '/loan-reality/bank-enrollment/update',
  handler (request, reply) {
    const { institutionId, enrollmentId } = request.payload
    const { token } = request.state

    req({
      method: 'PUT',
      uri: `${ops.gringottsUrl()}/api/enrollments/${enrollmentId}`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${token}`
      }),
      body: JSON.stringify(EnrollmentService.postBody(request))
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      // blow up if there is an api error returned
      if (JSON.parse(body).errors) {
        const url = EnrollmentService.errorUrl('apiError')
        return reply.redirect(url)
      }

      // make sure we have the matching enrollment
      const results = parseEnrollmentsResults(body)
      const enrollment = results.enrollments.filter((en) => {
        return en.institutionId === institutionId
      })[0]

      const url = EnrollmentService.waitingUrl(enrollment)
      return reply.redirect(url)
    })
  }
}]
