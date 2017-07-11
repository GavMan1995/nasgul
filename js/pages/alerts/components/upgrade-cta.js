import React, { Component } from 'react'

import CDNIcon from '../../../common/components/cdn-icon'

export default class UpgradeCta extends Component {
  render () {
    const { copy, trackingClassForOptimizely } = this.props

    return (
      <div className='c-alert-cta'>
        <h4 className='c-alert-cta__pro-tip'>Pro Tip!</h4>
        <p className='c-alert-cta__text' >{copy}</p>
        <div className='c-alert-cta__upgrade'>
          <div className='c-alert-cta__upgrade-bubbles'>
            <p>Business Scores</p>
            <CDNIcon filename='experian_bullet_40x40.svg' className='c-alert-cta__upgrade-logo' />
            <CDNIcon filename='dnb_bullet_40x40.svg' className='c-alert-cta__upgrade-logo' />
          </div>

          <div className='c-alert-cta__upgrade-bubbles'>
            <p>Personal Scores</p>
            <CDNIcon filename='experian_bullet_40x40.svg' className='c-alert-cta__upgrade-logo' />
            <CDNIcon filename='tu-icon_40x40.svg' className='c-alert-cta__upgrade-logo' />
          </div>

          <a
            href='/app/upgrade/premium'
            className={`c-btn c-btn--upgrade c-btn--center ${trackingClassForOptimizely}`}
            onClick={() => trackCtaClick(this.props.trackingLabel)}>
            Upgrade my account
          </a>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.analytics.track('Feature View', {
      category: 'Alerts Page',
      label: `Alerts Page: ${this.props.trackingLabel} - Upgrade CTA`,
      name: `Alerts Page: ${this.props.trackingLabel} - Upgrade CTA`
    })
  }
}

function trackCtaClick (trackingLabel) {
  window.analytics.track('Feature Click', {
    category: 'Internal Link',
    label: `Alerts Page: ${trackingLabel} - Upgrade CTA`,
    name: `Alerts Page: ${trackingLabel} - Upgrade CTA`
  })
}
