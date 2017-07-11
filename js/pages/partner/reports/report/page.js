import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbReportPage from './dnb-report-page'
import ExperianReportPage from './experian-report-page'

class ReportPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianReportPage location={location} report={report} />
    }

    return <DnbReportPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(ReportPage)
module.exports.jsFilename = 'report'
