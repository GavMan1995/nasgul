import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbPaymentStatusPage from './dnb-payment-status-page'
import ExperianPaymentStatusPage from './experian-payment-status-page'

class PaymentStatusPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianPaymentStatusPage location={location} report={report} />
    }

    return <DnbPaymentStatusPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(PaymentStatusPage)
module.exports.jsFilename = 'payment-status'
