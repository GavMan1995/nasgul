import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbDerogatoriesPage from './dnb-derogatories-page'
import ExperianDerogatoriesPage from './experian-derogatories-page'

class DerogatoriesPage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianDerogatoriesPage location={location} report={report} />
    }

    return <DnbDerogatoriesPage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(DerogatoriesPage)
module.exports.jsFilename = 'derogatories'
