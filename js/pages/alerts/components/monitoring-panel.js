import React, { Component } from 'react'

import AlertSettingsPanel from './alert-settings-panel'

export default class MonitoringPanel extends Component {
  render () {
    const {
      plan,
      toggleAlertSettings,
      me,
      alertEmails,
      alertSettings,
      onAlertSettingChange,
      onAlertEmailChange
    } = this.props

    let statusView = (
      <div>
        <div className='o-card c-alerts-card'>
          <div className='c-alerts-card__title'>
            <div className='c-alerts-card__title-img'>
              <img
                src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-gray.svg'
                height='30'
                width='30' />
            </div>
          </div>
          <p className='c-alerts-card__headline'>
            YOUR STANDARD BENEFITS
          </p>
          <div className='c-benefit-status-container'>
            <div className='c-benefit-status'>
              <span />
              <p className='u-large-copy'>Credit Monitoring</p>
            </div>
            <p>ACTIVE</p>
          </div>

          <p className='c-alerts-card__headline'>
            PREMIUM BENEFITS
          </p>
          <div className='c-benefit-status-container c-benefit-status-container--inactive'>
            <div className='c-benefit-status c-benefit-status--inactive'>
              <span />
              <p className='u-large-copy'>$1M ID Theft Protection</p>
            </div>
            <p>INACTIVE</p>
          </div>
          <div className='c-benefit-status-container c-benefit-status-container--inactive'>
            <div className='c-benefit-status c-benefit-status--inactive'>
              <span />
              <p className='u-large-copy'>ID Theft Recovery</p>
            </div>
            <p>INACTIVE</p>
          </div>
          <a href='/app/upgrade/premium' className='c-btn c-btn--lg c-btn--upgrade'>Activate Premium Benefits</a>
          <div
            className={`c-alerts-card__settings ${toggleAlertSettings ? 'is-open' : ''}`}>
            <div
              className={`c-alerts-card__settings-title ${toggleAlertSettings ? 'is-open' : ''}`}
              onClick={this._expandAlertSettings.bind(this)}>
              <strong>Edit Notification Settings</strong>
              <img
                src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg'
                height='24' width='16' />
            </div>
            <AlertSettingsPanel
              me={me}
              alertEmails={alertEmails}
              alertSettings={alertSettings}
              onAlertSettingChange={onAlertSettingChange}
              onAlertEmailChange={onAlertEmailChange} />
          </div>
        </div>
      </div>
    )

    if (plan.planCode !== 'freemium') {
      statusView = (
        <div>
          <div className='o-card c-alerts-card'>
            <div className='c-alerts-card__title'>
              <div className='c-alerts-card__title-img'>
                <img
                  src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-gray.svg'
                  height='30'
                  width='30' />
              </div>
              <p className='c-alerts-card__headline'>
                YOUR PREMIUM BENEFITS
              </p>
            </div>
            <div className='c-benefit-status-container'>
              <div className='c-benefit-status'>
                <span />
                <p className='u-large-copy'>$1M ID Theft Protection</p>
              </div>
              <p>ACTIVE</p>
            </div>
            <div className='c-benefit-status-container'>
              <div className='c-benefit-status'>
                <span />
                <p className='u-large-copy'>ID Theft Recovery</p>
              </div>
              <p>ACTIVE</p>
            </div>

            <div className='c-alerts-card__id-theft-info'>
              <strong>Need Identity theft help?</strong>
              <p>
                If you think your identity has been stolen, simply
                call <a href='tel:1-800-511-9165'>1-800-511-9165</a> and a
                Recovery Expert will review your situation with you.
              </p>
            </div>

            <p className='c-alerts-card__headline'>
              YOUR STANDARD BENEFITS
            </p>
            <div className='c-benefit-status-container'>
              <div className='c-benefit-status'>
                <span />
                <p className='u-large-copy'>Credit Monitoring</p>
              </div>
              <p>ACTIVE</p>
            </div>

            <div
              className={`c-alerts-card__settings ${toggleAlertSettings ? 'is-open' : ''}`}>
              <div
                className={`c-alerts-card__settings-title ${toggleAlertSettings ? 'is-open' : ''}`}
                onClick={this._expandAlertSettings.bind(this)}>
                <strong>Edit Notification Settings</strong>
                <img
                  src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg'
                  height='24' width='16' />
              </div>
              <AlertSettingsPanel
                me={me}
                alertEmails={alertEmails}
                alertSettings={alertSettings}
                onAlertSettingChange={onAlertSettingChange}
                onAlertEmailChange={onAlertEmailChange} />
            </div>
          </div>
        </div>
      )
    }

    return statusView
  }

  _expandAlertSettings () {
    if (this.props.toggleAlertSettings) {
      this.props.closeAlertSettings()
    } else {
      this.props.expandAlertSettings()
    }

    window.analytics.track('Feature Click', {
      category: 'Alerts Page',
      name: 'Edit Notification Settings',
      label: 'Edit Notification Settings'
    })
  }
}
