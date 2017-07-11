import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbCreditUtilizationPage from './dnb-credit-utilization-page'
import ExperianCreditUtilizationPage from './experian-credit-utilization-page'

class CreditUtilizationPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianCreditUtilizationPage location={location} report={report} />
    }

    return <DnbCreditUtilizationPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(CreditUtilizationPage)
module.exports.jsFilename = 'credit-utilization'
