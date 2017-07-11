import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import DisclaimerText from '../components/disclaimer-text'
import FilterHeader from '../components/business-services/filter-header'
import NoResultsMessaging from '../components/business-services/no-results-messaging'
import OfferCategory from './components/offer-category'

class BusinessServicesPage extends Component {
  render () {
    const { offersByCategory } = this.props

    let offersListing = <NoResultsMessaging offers={offersByCategory} />

    if (offersByCategory.length > 0) {
      offersListing = (
        offersByCategory.map((category) => {
          return (
            <OfferCategory key={`category_${category.category.id}`} category={category} />
          )
        })
      )
    }

    return (
      <div className='o-new-page o-new-page--white'>
        <FilterHeader options={offersByCategory} />

        <div className='o-site-container'>
          <div className='c-section-header c-section-header--large'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/what-is-loan_80x80.svg' />
            <div className='c-section-header__copy'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/what-is-loan_80x80.svg' />
              <h2><strong>Your Recommended Business Services</strong></h2>
              <p>
                Save some time and money! We partner with all the top business
                products and work hard to get you exclusive discounts.
              </p>
            </div>
          </div>

          {offersListing}
        </div>

        <DisclaimerText />
      </div>
    )
  }
}

function mapStateToProps ({ offersByCategory }) {
  return { offersByCategory }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BusinessServicesPage))
module.exports.jsFilename = 'business-services'
