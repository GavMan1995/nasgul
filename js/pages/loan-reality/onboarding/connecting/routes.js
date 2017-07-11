import ConnectingPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'
import parseEnrollmentsResults from '../../common/parsers/parse-enrollments-results'
import ops from '../../../../../config/ops'
import EnrollmentService from '../../common/enrollment-service'

import withRequestHeaders from '../../../../server/utils/with-request-headers'
import withRequestState from '../../../../server/utils/with-request-state'

module.exports = [{
  method: 'GET',
  path: '/loan-reality/connecting',
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
        return reply.redirect(EnrollmentService.errorUrl('apiError=true'))
      }

      const enrollment = state.enrollments.filter((en) => {
        return en.id === enrollmentId
      })[0]

      if (!enrollment) {
        // TODO figure out how we want to handle no enrollment
        return reply.redirect(EnrollmentService.errorUrl('noEnrollment=true'))
      }

      state.enrollment = enrollment
      state.enrollmentTips = EnrollmentService.tips()
      const store = createStore(reducers, withRequestState(request, state))

      reply.page(ConnectingPage, store)
    })
  }
}]
