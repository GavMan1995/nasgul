import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CallAgentHeader from '../components/call-agent-header'
import DisclaimerText from '../components/disclaimer-text'
import LowMatchFactorSection from '../components/low-match-factor-section'
import OfferDetails from './components/offer-details'
import OfferDetailsOverview from './components/offer-details-overview'

class MyMarketplaceDetailsPage extends Component {
  constructor (props) {
    super(props)

    let showOffers = true

    if (this.props.personalOffers[0].relevance <= 60) showOffers = false

    this.state = {
      showOffers
    }
  }

  render () {
    const {
      personalOffers,
      personalScores,
      offerTypes,
      agentImage
    } = this.props

    let offerType = offerTypes[0]

    if (offerType === undefined) {
      offerType = {
        name: 'No Relevant',
        detail: {
          verdict: {},
          description: {},
          sections: []
        }
      }
    }

    let offers

    if (this.state.showOffers) {
      offers = <OfferDetails offers={personalOffers} agentImage={agentImage} />
    }

    return (
      <div className='o-new-page o-new-page--white'>
        <CallAgentHeader
          agentImage={agentImage}
          title={offerType.name}
          showBreadcrumbLink />

        <div className='o-site-container'>
          <div className='o-container'>
            <div className='o-section o-section--aside'>
              <OfferDetailsOverview offerType={offerType} />
            </div>

            <div className='o-section'>
              <LowMatchFactorSection
                personalOffers={personalOffers}
                personalScores={personalScores}
                showOffers={this.state.showOffers}
                toggleOffers={this.toggleOffers.bind(this)} />
              {offers}
            </div>
          </div>
        </div>

        <DisclaimerText />
      </div>
    )
  }

  toggleOffers (event) {
    event.preventDefault()

    this.setState({ showOffers: !this.state.showOffers })

    window.analytics.track('feature_click', {
      category: 'internal_link',
      label: 'see_all_lending_offers',
      name: 'see_all_lending_offers'
    })
  }
}

function mapStateToProps (state) {
  const {
    agentImage,
    isMobileRequest,
    offerTypes,
    personalOffers,
    personalScores
  } = state

  return {
    agentImage,
    isMobileRequest,
    offerTypes,
    personalOffers,
    personalScores
  }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(MyMarketplaceDetailsPage))
module.exports.jsFilename = 'my-marketplace-details'
