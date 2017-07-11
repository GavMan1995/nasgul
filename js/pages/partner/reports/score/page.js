import React, { Component } from 'react'
import { connect } from 'react-redux'

import DnbScorePage from './dnb-score-page'
import ExperianScorePage from './experian-score-page'

class ScorePage extends Component {
  render () {
    const { location, report } = this.props

    if (report.type === 'experian_business_report') {
      return <ExperianScorePage location={location} report={report} />
    }

    return <DnbScorePage location={location} report={report} />
  }
}

function mapStateToProps ({ location, report }) {
  return { location, report }
}

module.exports = exports.default = connect(mapStateToProps)(ScorePage)
module.exports.jsFilename = 'score'
