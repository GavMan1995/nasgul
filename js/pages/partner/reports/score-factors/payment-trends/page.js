import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbPaymentTrendsPage from './dnb-payment-trends-page'
import ExperianPaymentTrendsPage from './experian-payment-trends-page'

class PaymentTrendsPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianPaymentTrendsPage location={location} report={report} />
    }

    return <DnbPaymentTrendsPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(PaymentTrendsPage)
module.exports.jsFilename = 'payment-trends'
