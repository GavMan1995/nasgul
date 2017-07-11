import React from 'react'

import Alert from './alert'
import alertCodeCategories from '../data/alert-code-categories'

export default function AlertsList (props) {
  const {
    type,
    alerts,
    alertsListFilter,
    toggleAlerts,
    alertOpen
  } = props
  const pattern = new RegExp(type, 'i')

  if (!pattern.test(alertsListFilter) && alertsListFilter !== 'SHOW_ALL') {
    return null
  }

  const firstInquiryAlert = alerts.filter(
    (alert) => includesCode(alert.code, alertCodeCategories.inquiry)
  ).shift()
  const firstHighUtilizationAlert = alerts.filter(
    (alert) => includesCode(alert.code, alertCodeCategories.highUtilization)
  ).shift()

  let showHideButton = null

  if (alerts.length > 1) {
    showHideButton = (
      <h3 className='c-alert-expand-btn' onClick={toggleAlerts}>{alertOpen ? 'Show Less' : 'Show More'}</h3>
    )
  }

  if (alerts.length > 0) {
    return (
      <div className='c-alert-panel'>
        <div className='c-alert-section'>
          {alerts.map((alert, index) => {
            return (
              <Alert
                key={index}
                alert={alert}
                alertOpen={alertOpen}
                firstHighUtilizationAlert={firstHighUtilizationAlert}
                firstInquiryAlert={firstInquiryAlert} />
            )
          })}
        </div>
        {showHideButton}
      </div>
    )
  } else {
    return (
      <div className='c-alert-panel'>
        <div className='c-alert-section'>
          <div className='c-credit-alert'>
            <p>You haven't received any {type} alerts.</p>
          </div>
        </div>
      </div>
    )
  }
}

function includesCode (code, codeList) {
  return codeList.indexOf(code) > -1
}
