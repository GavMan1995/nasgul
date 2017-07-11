import React, { Component } from 'react'
import { connect } from 'react-redux'

// NOTE: This is gross stuff for an affiliate. Hopefully it's temporary.
import AffiliateNavbar from './affiliate-navbar'

import AdminLink from './admin-link'
import BrandLink from './brand-link'
import BusinessSelector from './business-selector'
import DefaultNavbar from './default-navbar'
import PremiumStatus from './premium-status'
import QuickSignupLink from './quick-signup-link'
import UpgradeButton from './upgrade-button'
import UserDropdown from './user-dropdown'

class AuthHeader extends Component {
  render () {
    const {
      activeBusiness,
      affiliateOwner,
      businesses,
      crumb,
      isNavbarFixed,
      location,
      me,
      plan,
      roles
    } = this.props

    let navbar = (
      <DefaultNavbar isNavbarFixed={isNavbarFixed} location={location} />
    )

    // NOTE: This is for Flexmark affiliate as per Joel
    if (affiliateOwner.id === 6331 || affiliateOwner.id === 2748) {
      navbar = (
        <AffiliateNavbar isNavbarFixed={isNavbarFixed} location={location} />
      )
    }

    return (
      <div className='o-navbar c-navbar'>
        <div className='c-navbar__top js-navbar-top'>
          <div className='c-navbar__site-container'>
            <BrandLink />

            <AdminLink location={location} roles={roles} />

            <QuickSignupLink roles={roles} />

            <PremiumStatus plan={plan} />

            <UpgradeButton plan={plan} />

            <BusinessSelector
              activeBusiness={activeBusiness}
              businesses={businesses}
              crumb={crumb} />

            <UserDropdown me={me} />
          </div>
        </div>

        {navbar}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    activeBusiness,
    affiliateOwner,
    businesses,
    crumb,
    location,
    me,
    plan,
    roles
  } = state

  return {
    activeBusiness,
    affiliateOwner,
    businesses,
    crumb,
    location,
    me,
    plan,
    roles
  }
}

export default connect(mapStateToProps)(AuthHeader)
