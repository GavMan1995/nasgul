import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../common/containers/auth-page'

import BusinessLookup from './components/business-lookup'
import BusinessInfo from './components/business-info'
import UpgradeOffer from './components/upgrade-offer'

class BusinessLookupPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lookedUp: false
    }
  }

  render () {
    let businessLookup = (
      <BusinessLookup lookupBusiness={this.lookupBusiness.bind(this)} />
    )

    if (this.state.lookedUp) {
      businessLookup = (
        <BusinessInfo
          reset={this.reset.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          businessSummary={this.props.businessSummary} />
      )
    }

    if (isPaidPlan(this.props.plan)) {
      return (
        <div className='c-biz-lookup'>
          <div className='c-biz-lookup__img'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/illustrations/business_light-blue_190x190.svg' />
          </div>
          <div className='c-biz-lookup__content'>
            <h1>Business Look Up</h1>
            {businessLookup}
          </div>
        </div>

      )
    } else {
      return <UpgradeOffer plan={this.props.plan} />
    }
  }

  lookupBusiness (name, zip) {
    this.props.fetchBusinessSummary(name, zip)
    this.setState({lookedUp: true})
  }

  sendMessage (name, email, message) {
    this.props.sendBusinessSummary(
      this.props.businessSummary.id,
      name,
      email,
      message
    )
  }

  reset () {
    window.location.reload()
  }
}

function mapStateToProps ({ businessSummary, plan }) {
  return { businessSummary, plan }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBusinessSummary (name, zip) {
      dispatch({ type: 'FETCH_BUSINESS_SUMMARY', name, zip })
    },
    sendBusinessSummary (summaryId, name, email, message) {
      dispatch({ type: 'SEND_BUSINESS_SUMMARY', summaryId, name, email, message })
    }
  }
}

function isPaidPlan (plan) {
  return !/standard|freemium/.test(plan.planCode)
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(BusinessLookupPage))
module.exports.jsFilename = 'business-lookup'
