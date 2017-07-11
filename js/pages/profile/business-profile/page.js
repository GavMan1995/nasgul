import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import BusinessProfileForm from './components/business-profile-form'
import ProfileWrapper from '../components/profile-wrapper'

class BusinessProfilePage extends Component {
  render () {
    const { businesses, businessDetails, location } = this.props
    const ownedBusinesses = businesses.filter((business) => business.isOwned === true)
    const ownedProfiles = selectOwnedProfiles(ownedBusinesses, businessDetails)

    let content = null

    if (ownedBusinesses.length === 0) {
      content = (
        <div className='c-card c-profile-no-business-owned-text'>
          <p>
            You can only edit business profile information for businesses you own.
            If you have added a business but have not marked it as owned,
            visit the <a href='/app/settings'>settings page</a> to mark your
            business as owned.
          </p>
        </div>
      )
    }

    if (businesses.length === 0) {
      content = (
        <h2>
          You haven't added your business yet. <a href='/app/add_business'>Add your business.</a>
        </h2>
      )
    }

    if (ownedBusinesses.length > 0 && businessDetails.length > 0) {
      content = <BusinessProfileForm ownedProfiles={ownedProfiles} {...this.props} />
    }

    return (
      <ProfileWrapper location={location}>
        {content}
      </ProfileWrapper>
    )
  }
}

function selectOwnedProfiles (ownedBusinesses, businessDetails) {
  if (businessDetails && businessDetails.length > 0) {
    return businessDetails.filter(function (prof) {
      const hasProfile = ownedBusinesses.find((biz) => prof.id === biz.id)
      if (hasProfile) return true
    })
  }
}

function mapStateToProps ({ businesses, businessDetails, crumb, plan }) {
  return { businesses, businessDetails, crumb, plan }
}

function mapDispatchToProps (dispatch) {
  return {
    increment: () => dispatch({ type: 'INCREMENT_BUSINESS_COMPLETION' }),
    decrement: () => dispatch({ type: 'DECREMENT_BUSINESS_COMPLETION' })
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(BusinessProfilePage))
module.exports.jsFilename = 'business-profile'
