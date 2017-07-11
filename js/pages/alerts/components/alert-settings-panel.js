import React, { Component } from 'react'

export default class AlertSettingsPanel extends Component {
  render () {
    const {
      alertSettings,
      onAlertSettingChange
    } = this.props
    const {
      receiveAmountChangeEmails,
      receiveDerogatoryEmails,
      receiveOtherEmails,
      receiveScoreChangeEmails
    } = alertSettings

    return (
      <section className='c-alert-settings-panel'>
        <div className='c-alert-settings-panel__body'>
          <p className='c-alert-settings-panel__label'>Email Alerts For</p>

          <div className='c-alert-settings-panel__item'>
            <div className='c-alert-settings-panel__item-label'>
              Score Change
            </div>

            <div className='c-alert-settings-panel__item-selector'>
              <input
                type='checkbox'
                className='switch -accent-1'
                id='score_change_email'
                checked={receiveScoreChangeEmails}
                onChange={(event) => {
                  trackAlertToggle(event.target)
                  onAlertSettingChange('receiveScoreChangeEmails')
                }} />
              <label htmlFor='score_change_email' />
            </div>
          </div>

          <div className='c-alert-settings-panel__item'>
            <div className='c-alert-settings-panel__item-label'>
              Amount Change
            </div>

            <div className='c-alert-settings-panel__item-selector font-sm text-center'>
              <input
                type='checkbox'
                className='switch -accent-1'
                id='amount_change_email'
                checked={receiveAmountChangeEmails}
                onChange={(event) => {
                  trackAlertToggle(event.target)
                  onAlertSettingChange('receiveAmountChangeEmails')
                }} />
              <label htmlFor='amount_change_email' />
            </div>
          </div>

          <div className='c-alert-settings-panel__item'>
            <div className='c-alert-settings-panel__item-label'>
              Derogatory
            </div>

            <div className='c-alert-settings-panel__item-selector font-sm text-center' >
              <input
                type='checkbox'
                className='switch -accent-1'
                id='derogatory_email'
                checked={receiveDerogatoryEmails}
                onChange={(event) => {
                  trackAlertToggle(event.target)
                  onAlertSettingChange('receiveDerogatoryEmails')
                }} />
              <label htmlFor='derogatory_email' />
            </div>
          </div>

          <div className='c-alert-settings-panel__item'>
            <div className='c-alert-settings-panel__item-label'>Other</div>

            <div className='c-alert-settings-panel__item-selector font-sm text-center'>
              <input
                id='other_email'
                className='switch -accent-1'
                type='checkbox'
                checked={receiveOtherEmails}
                onChange={(event) => {
                  trackAlertToggle(event.target)
                  onAlertSettingChange('receiveOtherEmails')
                }} />
              <label htmlFor='other_email' />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function trackAlertToggle (element) {
  var action = element.checked ? 'Toggle On' : 'Toggle Off'

  window.analytics.track(action, {
    category: 'Alerts Page',
    name: 'Edit Notification Settings - ' + element.id,
    label: 'Edit Notification Settings - ' + element.id
  })
}
