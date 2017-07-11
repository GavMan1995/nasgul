import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import FilterHeader from '../components/business-services/filter-header'
import NoResultsMessaging from '../components/business-services/no-results-messaging'
import SimpleOfferCard from '../components/business-services/simple-offer-card'
import DisclaimerText from '../components/disclaimer-text'

class BusinessServicesCategoryPage extends Component {
  render () {
    const { offersByCategory } = this.props
    const offerCategory = this.props.offerCategory[0]

    let offersListing = <NoResultsMessaging offers={offersByCategory} />

    if (offersByCategory.length > 0) {
      offersListing = (
        <div className='c-offer-listing'>
          <div className='o-site-container'>
            {
              offerCategory.offers.map((offer) => {
                return (
                  <SimpleOfferCard key={`offer_${offer.id}`} offer={offer} />
                )
              })
            }
            <div className='c-card c-offer-card c-offer-card--placeholder' />
            <div className='c-card c-offer-card c-offer-card--placeholder' />
            <div className='c-card c-offer-card c-offer-card--placeholder' />
          </div>
        </div>
      )
    }

    return (
      <div className='o-new-page o-new-page--white'>
        <FilterHeader
          title={offerCategory.category.name}
          options={offersByCategory} />

        {offersListing}

        <DisclaimerText />
      </div>
    )
  }
}

function mapStateToProps ({ offerCategory, offersByCategory }) {
  return { offerCategory, offersByCategory }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BusinessServicesCategoryPage))
module.exports.jsFilename = 'business-services-category'
