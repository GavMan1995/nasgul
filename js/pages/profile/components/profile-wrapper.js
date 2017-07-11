import React, { Component } from 'react'
import { connect } from 'react-redux'

import Circle from './circle'
import ProfileSections from './profile-sections'
import ProgressBar from './progress-bar'

function ProgressIcon ({ offset }) {
  let icon = <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/plus-circle.svg' />

  if (offset < 100) icon = <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/dot-circle.svg' />

  if (offset === 0) icon = <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/check-green.svg' />

  return icon
}

class ProfilePage extends Component {
  render () {
    const { plan, profileCompletion, location } = this.props
    const businessOffset = _remainingOffset(
      profileCompletion.businessFilled,
      profileCompletion.businessTotal
    )
    const financialOffset = _remainingOffset(
      profileCompletion.financialFilled,
      profileCompletion.financialTotal
    )

    return (
      <div className='o-site-container'>
        <div
          id='main-area'
          data-flex--container='all-grandchildren'
          data-flex--item='full m-x--md-negative'>
          <h2 className='c-page-header'>Profile</h2>

          <div className='o-container'>
            <div className='_profile-sidebar o-section o-section--aside'>
              <ProgressBar profileCompletion={profileCompletion} />

              <ul data-flex--item='full' className='_profile-menu'>
                <ProfileSections
                  clickTarget='/app/profile/business'
                  location={location}>
                  <div className='_section-icon'>
                    <ProgressIcon offset={businessOffset} />
                    <Circle offset={businessOffset} />
                  </div>

                  <h5 data-flex--item='p-l--sm'>My Business Profile</h5>
                </ProfileSections>

                <ProfileSections
                  clickTarget='/app/profile/financial'
                  location={location}>
                  <div className='_section-icon'>
                    <ProgressIcon offset={financialOffset} />
                    <Circle offset={financialOffset} />
                  </div>

                  <h5 data-flex--item='p-l--sm'>Business Financing Profile</h5>
                </ProfileSections>
              </ul>
            </div>

            <div className='o-section'>
              <div className='c-alert-box c-alert-box--green'>
                <div className='c-alert-box__icon'>
                  <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/info-icon_32x32.svg' />
                </div>
                <div className='c-alert-box__disclaimer'>
                  <p className='u-large-copy'><strong>Get better matches</strong></p>
                  <p>
                    Completing your business profile lets our MatchFactor technology give you
                    more accurate financing recommendations. This saves you time when applying
                    for loans and credit cards because you'll know your approval odds <em>before</em> you apply.
                  </p>
                </div>
              </div>

              {this.props.children}

              <FreemiumMessage plan={plan} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const ownedBusinessCount = this.props.businesses.filter((business) => business.isOwned).length
    const businessTotal = ownedBusinessCount * 3
    const financialTotal = ownedBusinessCount * 6
    const businessFilled = _businessFilled(this.props)
    const financialFilled = _financialFilled(this.props)

    this.props.setTotalFields({ businessFilled, financialFilled, businessTotal, financialTotal })
  }
}

function _businessFilled ({ businessDetails }) {
  return businessDetails.reduce((count, business) => {
    let addition = 0

    if (business.details.startDate !== '') addition++

    if (business.details.legalEntity !== '') addition++

    if (business.details.industry !== '') addition++

    return count + addition
  }, 0)
}

function _financialFilled ({ businessDetails }) {
  return businessDetails.reduce((count, business) => {
    let addition = 0

    if (business.financials.annualGrossRevenue > 0) addition++

    if (business.financials.annualProfit > 0) addition++

    if (business.financials.bankBalance > 0) addition++

    if (business.financials.monthlyBankDeposits > 0) addition++

    if (business.financials.monthlyCreditCardSales > 0) addition++

    if (business.financials.monthlyExpenses > 0) addition++

    return count + addition
  }, 0)
}

function _remainingOffset (filled, total) {
  return (1 - (filled / total)) * 100
}

function FreemiumMessage ({ plan }) {
  if (plan.planCode === 'freemium') {
    return (
      <div className='c-profile-page__upgrade-cta'>
        <div className='c-profile-page__upgrade-text'>
          <p className='u-large-copy'>
            A Nav Premium account can help you get business financing you'll
            actually like! It's the only place to see all your business and
            personal credit report details, plus tips, so you can get loan-ready
          </p>
        </div>
        <a
          className='c-btn c-btn--lg c-btn--upgrade c-btn--mobile c-btn--lg'
          href='/app/upgrade/premium'>
          <img
            className='c-btn--upgrade__icon'
            src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-white.svg'
            height='24' />
          Learn about Premium
        </a>
      </div>
    )
  } else {
    return null
  }
}

function mapStateToProps (store) {
  const {
    businessDetails,
    emails,
    address,
    location,
    me,
    phones,
    plan,
    profileCompletion,
    businesses
  } = store

  return {
    businessDetails,
    emails,
    address,
    location,
    me,
    phones,
    plan,
    profileCompletion,
    businesses
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setTotalFields: (countsObj) => {
      dispatch(Object.assign({ type: 'SET_TOTAL_FIELDS' }, countsObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
