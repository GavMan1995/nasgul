import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../common/containers/auth-page'

import AlertsFilterLink from './components/alerts-filter-link'
import AlertsList from './components/alerts-list'
import MonitoringPanel from './components/monitoring-panel'

class AlertsPage extends Component {
  constructor (props) {
    super(props)

    this.toggleBusinessAlerts = this.toggleBusinessAlerts.bind(this)
    this.togglePersonalAlerts = this.togglePersonalAlerts.bind(this)
    this.openAlerts = this.openAlerts.bind(this)

    this.state = {
      businessAlertOpen: false,
      personalAlertOpen: false
    }
  }

  render () {
    const { alertsListFilter } = this.props

    let moreAlertsLink = null
    if (this.props.hasMoreAlerts) {
      moreAlertsLink = (
        <div className={'c-alert-panel__show-more'}>
          <a onClick={() => {
            this.props.retrieveAllAlerts()
            this.openAlerts()
          }}>
            Load All Alerts
          </a>
        </div>
      )
    }

    let businessAlertHeader = null
    if (alertsListFilter === 'SHOW_ALL' || alertsListFilter === 'SHOW_BUSINESS') {
      businessAlertHeader = <h2 className='c-alert-panel__header'>Business Alerts</h2>
    }

    let personalAlertHeader = null
    if (alertsListFilter === 'SHOW_ALL' || alertsListFilter === 'SHOW_PERSONAL') {
      personalAlertHeader = <h2 className='c-alert-panel__header'>Personal Alerts</h2>
    }

    return (
      <div className='o-site-container o-new-page'>
        <h2 className='c-page-header'>Alerts</h2>

        <div className='o-container'>
          <section className='o-section'>
            <div className='c-alert-panel'>
              <div className='c-alert-panel__menu'>
                <div className='c-alert-panel__menu-item'>
                  <AlertsFilterLink
                    currentFilter={alertsListFilter}
                    targetFilter='SHOW_ALL'
                    onClick={() => this.props.setAlertsListFilter('SHOW_ALL')}>
                    All Alerts
                  </AlertsFilterLink>
                </div>

                <div className='c-alert-panel__menu-item'>
                  <AlertsFilterLink
                    currentFilter={alertsListFilter}
                    targetFilter='SHOW_BUSINESS'
                    onClick={() => {
                      this.props.setAlertsListFilter('SHOW_BUSINESS')
                      this.openAlerts()
                    }}>
                    Business
                  </AlertsFilterLink>
                </div>

                <div className='c-alert-panel__menu-item'>
                  <AlertsFilterLink
                    currentFilter={alertsListFilter}
                    targetFilter='SHOW_PERSONAL'
                    onClick={() => {
                      this.props.setAlertsListFilter('SHOW_PERSONAL')
                      this.openAlerts()
                    }}>
                    Personal
                  </AlertsFilterLink>
                </div>
              </div>

              <div className='c-alert-panel__banner'>
                <p>
                  <strong>Alerts are updated daily.</strong> They'll
                  be reflected on your next monthly report.
                </p>
              </div>
            </div>

            {businessAlertHeader}

            <AlertsList
              type='business'
              alerts={this.props.businessAlerts}
              alertsListFilter={alertsListFilter}
              toggleAlerts={this.toggleBusinessAlerts}
              alertOpen={this.state.businessAlertOpen}
              showHide={this.state.businessShowHide} />

            {personalAlertHeader}

            <AlertsList
              type='personal'
              alerts={this.props.personalAlerts}
              alertsListFilter={alertsListFilter}
              toggleAlerts={this.togglePersonalAlerts}
              alertOpen={this.state.personalAlertOpen}
              showHide={this.state.personalShowHide} />

            {moreAlertsLink}
          </section>

          <section className='o-section o-section--aside'>
            <MonitoringPanel
              plan={this.props.plan}
              toggleAlertSettings={this.props.toggleAlertSettings}
              expandAlertSettings={this.props.expandAlertSettings}
              closeAlertSettings={this.props.closeAlertSettings}
              me={this.props.me}
              alertEmails={this.props.alertEmails}
              alertSettings={this.props.alertSettings}
              onAlertSettingChange={this.props.toggleAlertSetting}
              onAlertEmailChange={this.props.setPrimaryAlertEmail} />
          </section>
        </div>
      </div>
    )
  }

  toggleBusinessAlerts () {
    this.setState({ businessAlertOpen: !this.state.businessAlertOpen })
  }

  togglePersonalAlerts () {
    this.setState({ personalAlertOpen: !this.state.personalAlertOpen })
  }

  openAlerts () {
    this.setState({
      businessAlertOpen: true,
      personalAlertOpen: true
    })
  }
}

function mapStateToProps (state) {
  const {
    alertEmails,
    alertSettings,
    alertsListFilter,
    businessAlerts,
    toggleAlertSettings,
    hasMoreAlerts,
    me,
    personalAlerts,
    plan
  } = state

  return {
    alertEmails,
    alertSettings,
    alertsListFilter,
    businessAlerts,
    toggleAlertSettings,
    hasMoreAlerts,
    me,
    personalAlerts,
    plan
  }
}

function mapDispatchToProps (dispatch) {
  return {
    retrieveAllAlerts () {
      dispatch({ type: 'RETRIEVE_ALL_ALERTS' })
    },
    setAlertsListFilter (filter) {
      dispatch({ type: 'SET_ALERTS_LIST_FILTER', filter })
    },
    setPrimaryAlertEmail (id) {
      dispatch({ type: 'SET_PRIMARY_ALERT_EMAIL', id })
    },
    toggleAlertSetting (key) {
      dispatch({ type: 'TOGGLE_ALERT_SETTING', key })
    },
    expandAlertSettings () {
      dispatch({ type: 'EXPAND_ALERT_SETTINGS' })
    },
    closeAlertSettings () {
      dispatch({ type: 'CLOSE_ALERT_SETTINGS' })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(AlertsPage))
module.exports.jsFilename = 'alerts'
