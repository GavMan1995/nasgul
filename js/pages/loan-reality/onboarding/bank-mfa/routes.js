import req from 'request'
import Boom from 'boom'

import ops from '../../../../../config/ops'

import BankMfaPage from './page'
import parseEnrollmentsResults from '../../common/parsers/parse-enrollments-results'
import EnrollmentService from '../../common/enrollment-service'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestHeaders from '../../../../server/utils/with-request-headers'
import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/bank-mfa',
  handler (request, reply) {
    const { enrollmentId } = request.url.query
    const { token } = request.state

    request.getState([{
      uri: `${ops.gringottsUrl()}/api/enrollments/${enrollmentId}`,
      parser: parseEnrollmentsResults,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${token}`
      })
    }], (error, state) => {
      if (error) {
        return reply.redirect(EnrollmentService.errorUrl())
      }

      const enrollment = state.enrollments.filter((en) => {
        return en.id === enrollmentId
      })[0]

      if (!enrollment) {
        // TODO figure out how we want to handle no enrollment
        return reply.redirect(EnrollmentService.errorUrl('noEnrollment=true'))
      }

      state.enrollment = enrollment
      const store = createStore(reducers, withRequestState(request, state))

      reply.page(BankMfaPage, store)
    })
  }
},
{
  method: 'POST',
  path: '/loan-reality/bank-mfa',
  handler (request, reply) {
    const enrollmentId = request.payload.enrollmentId
    const mfaCredentials = EnrollmentService.mfaBody(request)

    req({
      method: 'PUT',
      uri: `${ops.gringottsUrl()}/api/enrollments/${enrollmentId}`,
      headers: withRequestHeaders(request, {
        'authorization': `Token ${request.state.token}`
      }),
      body: JSON.stringify(mfaCredentials)
    }, (error, response, body) => {
      if (error) return reply(Boom.wrap(error))

      const enrollments = parseEnrollmentsResults(body).enrollments
      const enrollment = enrollments.filter((en) => {
        return en.id === enrollmentId
      })[0]

      if (!enrollment) {
        // TODO figure out how we want to handle no enrollment
        return reply.redirect(EnrollmentService.errorUrl('noEnrollment=true'))
      }

      if (response.statusCode === 200) {
        // This is where we handle the possible delay in authenticating with the institution
        const url = EnrollmentService.waitingUrl(enrollment)
        return reply.redirectWithSearch(url)
      }

      // otherwise show an error page
      // Need to have a better experience around this
      reply.redirect(EnrollmentService.errorUrl())
    })
  }
}]
