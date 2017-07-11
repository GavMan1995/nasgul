import React, { Component } from 'react'
import CDNIcon from '../../../common/components/cdn-icon'

export default class CallAgentCta extends Component {
  render () {
    return (
      <div className='c-alert-cta'>
        <h4 className='c-alert-cta__pro-tip'>Pro Tip!</h4>
        <div className='c-alert-cta__text c-alert-cta__text--cnl'>
          <CDNIcon filename='customer-rep_198x176.svg' />
          <p>
            Adding a new line of credit may reduce your utilization. Talk with a
            Nav Credit and Lending expert
          </p>
        </div>

        <div className='c-alert-cta__cnl-cta'>
          <a
            className='c-btn c-btn--primary c-btn--outline'
            href='https://app.hubspot.com/meetings/bwesterman/alert-consultation-appointment'
            onClick={() => trackCtaClick('Schedule a Call')}
            target='_blank'>
            Schedule A Call
          </a>
          <p className='c-mobile-call-agent-cta__content-link c-alert-cta__call-agent'>
            or call now
            <a
              href='tel:8446362445'
              onClick={() => trackCtaClick('Call Now')}>
              844-636-2445
            </a>
          </p>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.analytics.track('Feature View', {
      category: 'Alerts Page',
      label: 'Alerts Page: High Utilization - Call Agent CTA',
      name: 'Alerts Page: High Utilization - Call Agent CTA'
    })
  }
}

function trackCtaClick (action) {
  window.analytics.track('Feature Click', {
    category: 'Alerts Page',
    label: `Alerts Page: High Utilization - Call Agent CTA - ${action}`,
    name: `Alerts Page: High Utilization - Call Agent CTA - ${action}`
  })
}
