import React, { Component } from 'react'
import { connect } from 'react-redux'

import FeatureFlag from '../../../common/components/feature-flag'

import AlertCtaHighUtilization from './alert-cta-high-utilization'
import AlertCtaInquiry from './alert-cta-inquiry'

class AlertCtas extends Component {
  render () {
    const {
      alertCode,
      alertOffer,
      alertType,
      getAlertOffer,
      personalAlerts,
      personalScores,
      plan
    } = this.props

    switch (alertType) {
      case 'highUtilization':
        return (
          <FeatureFlag
            flagName='alerts_high_utilization_cta'
            on={(
              <AlertCtaHighUtilization
                alertOffer={alertOffer}
                getAlertOffer={getAlertOffer}
                personalAlerts={personalAlerts}
                personalScores={personalScores}
                planCode={plan.planCode} />
            )} />
        )
      case 'inquiry':
        return (
          <FeatureFlag
            flagName='alerts_inquiry_cta'
            on={(
              <AlertCtaInquiry
                alertCode={alertCode}
                planCode={plan.planCode} />
            )} />
        )
      default: return null
    }
  }
}

function mapStateToProps (state) {
  const { alertOffer, personalAlerts, personalScores, plan } = state

  return { alertOffer, personalAlerts, personalScores, plan }
}

function mapDispatchToProps (dispatch) {
  return {
    getAlertOffer () {
      dispatch({ type: 'GET_ALERT_OFFER' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertCtas)
