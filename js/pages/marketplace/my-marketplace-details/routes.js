import ops from '../../../../config/ops'

import MyMarketplaceDetailsPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

import withQueryParams from '../../../common/utils/with-query-params'
import withRequestState from '../../../server/utils/with-request-state'

import parseCreditScores from '../parsers/parse-credit-scores'
import parseOfferTypes from '../parsers/parse-offer-types'
import parseOffersByType from '../parsers/parse-offers-by-type'
import parseProfileBusiness from '../parsers/parse-profile-business'

module.exports = [{
  method: 'GET',
  path: '/financing-options/details',
  handler (request, reply) {
    if (!request.query.product_type) {
      return reply.redirectWithSearch(
        withQueryParams('/financing-options/results', {
          loanSpeed: '1-2 Weeks',
          loanAmount: '< $20,000'
        })
      )
    }

    request.getState([
      {
        uri: `${ops.lexBaseUrl()}/api/v2/personal_offers`,
        parser: parseOffersByType,
        headers: {
          'authorization': `Token token="${ops.lexApiKey()}"`,
          'x-authentication-jwt': request.token()
        },
        query: {
          offer_type: request.query.product_type || '',
          business_id: request.state.businessId,
          limit: 20
        }
      },
      {
        uri: `${ops.lexBaseUrl()}/api/v2/offer_types`,
        parser: parseOfferTypes,
        headers: {
          'authorization': `Token token="${ops.lexApiKey()}"`,
          'x-authentication-jwt': request.token()
        },
        query: { name: request.query.product_type }
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

      reply.page(MyMarketplaceDetailsPage, store)
    })
  }
}]

// TODO: Move this into a pure function component!
function agentImageURL () {
  const agentImages = [
    'https://dxkdvuv3hanyu.cloudfront.net/images/nav/call-agent--female.png',
    'https://dxkdvuv3hanyu.cloudfront.net/images/nav/call-agent--male.png'
  ]

  return agentImages[Math.floor(Math.random() * 2)]
}
