import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CallAgentHeader from '../components/call-agent-header'
import DisclaimerText from '../components/disclaimer-text'
import LowMatchFactorSection from '../components/low-match-factor-section'

import OfferResults from './components/offer-results'
import FormSection from './components/form-section'

class MyMarketplaceResultsPage extends Component {
  constructor (props) {
    super(props)

    let showOffers = true

    if (this.props.personalOffers[0].relevance <= 60) showOffers = false

    this.state = {
      filterClosed: false,
      formHeight: '',
      showOffers
    }
  }

  render () {
    const { filterClosed, formHeight } = this.state
    const {
      agentImage,
      businessDetails,
      loanTypesCount,
      location,
      offersByType,
      personalOffers,
      personalScores
    } = this.props

    let offers

    if (this.state.showOffers) {
      offers = (
        <OfferResults
          businessDetails={businessDetails}
          offers={personalOffers}
          loanTypesCount={loanTypesCount}
          agentImage={agentImage}
          offersByType={offersByType} />
      )
    }

    return (
      <div className='o-new-page o-new-page--white'>
        <CallAgentHeader agentImage={agentImage} />
        <div className='o-site-container'>
          <div className='o-container'>
            <FormSection
              filterClosed={filterClosed}
              formHeight={formHeight}
              businessDetails={businessDetails}
              location={location}
              toggleFilter={this.toggleFilter.bind(this)} />

            <main className='o-section'>
              <LowMatchFactorSection
                personalOffers={personalOffers}
                personalScores={personalScores}
                showOffers={this.state.showOffers}
                toggleOffers={this.toggleOffers.bind(this)} />
              {offers}
            </main>
          </div>

          <DisclaimerText />
        </div>
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

  toggleFilter (event) {
    event.preventDefault()

    this.setState({ filterClosed: !this.state.filterClosed })
  }
}

function mapStateToProps (state) {
  const {
    agentImage,
    businessDetails,
    loanTypesCount,
    location,
    offersByType,
    personalOffers,
    personalScores
  } = state

  return {
    agentImage,
    businessDetails,
    loanTypesCount,
    location,
    offersByType,
    personalOffers,
    personalScores
  }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(MyMarketplaceResultsPage))
module.exports.jsFilename = 'my-marketplace-results'
