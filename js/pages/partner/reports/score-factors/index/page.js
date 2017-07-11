import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbIndexPage from './dnb-index-page'
import ExperianIndexPage from './experian-index-page'

class IndexPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianIndexPage location={location} report={report} />
    }

    return <DnbIndexPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(IndexPage)
module.exports.jsFilename = 'index'
