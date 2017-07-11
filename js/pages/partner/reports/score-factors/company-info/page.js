import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbCompanyInfoPage from './dnb-company-info-page'
import ExperianCompanyInfoPage from './experian-company-info-page'

class CompanyInfoPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianCompanyInfoPage location={location} report={report} />
    }

    return <DnbCompanyInfoPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(CompanyInfoPage)
module.exports.jsFilename = 'company-info'
