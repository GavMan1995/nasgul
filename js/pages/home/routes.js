import ops from '../../../config/ops'

import HomePage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

import withRequestState from '../../server/utils/with-request-state'

import parseCreditScores from './parsers/parse-credit-scores'
import parseFeedItems from './parsers/parse-feed-items'
import parseRefreshableReports from './parsers/parse-refreshable-reports'

module.exports = [
  {
    method: 'GET',
    path: '/home',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.apiBaseUrl()}/credit_scores`,
          parser: parseCreditScores
        },
        {
          uri: `${ops.apiBaseUrl()}/feed_items`,
          parser: parseFeedItems
        },
        {
          uri: `${ops.apiBaseUrl()}/reports/any_refreshable_reports`,
          parser: parseRefreshableReports,
          silent: true
        }
      ], (error, state) => {
        if (error) return reply(error)

        const finalState = withRequestState(request, Object.assign({}, state, {
          currentCard: request.state.asideLastSeenCard,
          isHidden: !!request.state.onBoardingDismissed,
          message: alertCalloutMessage(request),
          purpose: request.state.onBoardingSlug
        }))
        const store = createStore(reducers, finalState)

        reply.page(HomePage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/',
    handler (request, reply) {
      reply.redirectWithSearch('/home')
    }
  },
  {
    method: 'GET',
    path: '/dashboard',
    handler (request, reply) {
      reply.redirectWithSearch('/home')
    }
  }
]

function alertCalloutMessage (request) {
  const { utm_campaign: utmCampaign } = request.url.query

  if (utmCampaign && /^t_Alert/.test(utmCampaign)) {
    return {
      actionUrl: '/app/alerts',
      body: 'New Alert Details: To see your alert details please CLICK HERE.',
      isDismissable: true,
      type: 'notice'
    }
  } else {
    return {}
  }
}
