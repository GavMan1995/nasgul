import ops from '../../../../config/ops'

import MyMarketplaceResultsPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withRequestState from '../../../server/utils/with-request-state'
import withQueryParams from '../../../common/utils/with-query-params'

import parseCreditScores from '../parsers/parse-credit-scores'
import parseMarketplaceOptions from '../parsers/parse-marketplace-options'
import parseOffersByType from '../parsers/parse-offers-by-type'
import parseProfileBusiness from '../parsers/parse-profile-business'

module.exports = [
  {
    method: 'GET',
    path: '/financing-options/results',
    handler (request, reply) {
      request.getState([
        {
          uri: `${ops.lexBaseUrl()}/api/v2/personal_offers`,
          parser: parseOffersByType,
          headers: {
            'authorization': `Token token="${ops.lexApiKey()}"`,
            'x-authentication-jwt': request.token()
          },
          query: Object.assign({}, {
            business_id: request.state.businessId,
            'Funding Speed[]': request.url.query.loanSpeed,
            'Loan Amount[]': request.url.query.loanAmount,
            limit: 20
          }, withBusinessDetails(request))
        },
        {
          uri: `${ops.lexBaseUrl()}/api/v2/options`,
          parser: parseMarketplaceOptions,
          headers: {
            'authorization': `Token token="${ops.lexApiKey()}"`
          }
        },
        {
          uri: `${ops.apiBaseUrl()}/api/v3/business_profiles`,
          parser: parseProfileBusiness
        },
        {
          uri: `${ops.apiBaseUrl()}/credit_scores`,
          parser: parseCreditScores
        }
      ], (error, state) => {
        if (error) return reply(error)

        state.agentImage = agentImageURL()

        const store = createStore(reducers, withRequestState(request, state))

        reply.page(MyMarketplaceResultsPage, store)
      })
    }
  },
  // Redirects
  {
    method: 'GET',
    path: '/financing-options',
    handler (request, reply) {
      reply.redirectWithSearch(
        withQueryParams('/financing-options/results', {
          loanSpeed: '1-2 Weeks',
          loanAmount: '< $20,000'
        })
      )
    }
  },
  {
    method: 'GET',
    path: '/market/lending-offers',
    handler (request, reply) {
      reply.redirectWithSearch(
        withQueryParams('/financing-options/results', {
          loanSpeed: '1-2 Weeks',
          loanAmount: '< $20,000'
        })
      )
    }
  }
]

function withBusinessDetails (request) {
  const query = request.url.query || {}

  let result = {}

  if (query.monthlyRevenue) {
    result.annual_revenue = query.monthlyRevenue.replace(/\D/g, '') * 12
  }

  if (query.startDate) {
    const now = new Date().getTime()
    const then = new Date(query.startDate).getTime()
    const monthInMilliseconds = (30 * 24 * 60 * 60 * 1000)

    result.months_in_business = Math.round((now - then) / monthInMilliseconds)
  }

  return result
}

function agentImageURL () {
  const agentImages = [
    'https://dxkdvuv3hanyu.cloudfront.net/images/nav/call-agent--female.png',
    'https://dxkdvuv3hanyu.cloudfront.net/images/nav/call-agent--male.png'
  ]

  return agentImages[Math.floor(Math.random() * 2)]
}
