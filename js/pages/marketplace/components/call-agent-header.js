import React, { Component } from 'react'

import trackClick from '../track-click'

class CallAgentHeader extends Component {
  render () {
    const { agentImage } = this.props

    let title = 'Financing'

    if (this.props.title) {
      title = this.props.title
    }

    let breadcrumbLink = ''
    let breadcrumbClass = ''

    if (this.props.showBreadcrumbLink) {
      breadcrumbLink = (
        <div className='c-breadcrumb'>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
          <a onClick={this.goBack}>Financing</a>
        </div>
      )
      breadcrumbClass = 'c-page-banner--has-breadcrumbs'
    }

    return (
      <div className={`c-page-banner c-page-banner--hide-on-mobile ${breadcrumbClass}`}>
        <div className='c-page-banner__title'>
          {breadcrumbLink}
          <h1><strong>{title}</strong></h1>
          <a href='#disclaimer'>Advertiser's Disclosure</a>
        </div>

        <div className='c-call-agent-cta'>
          <img src={agentImage} />
          <p className='c-call-agent-cta__copy'>
            Get free advice from our unbiased business financing experts
          </p>
          <a
            className='c-btn c-btn--primary c-btn--outline'
            href='https://app.hubspot.com/meetings/nav/business-financing-consultation-lse'
            onClick={() => this.trackFeatureClick('Schedule a Call - Lending')}
            target='_blank'>
            Schedule A Call
          </a>
          <p className='c-call-agent-cta__call-link'>
            or call now
            <a
              href='tel:8446362445'
              onClick={() => this.trackFeatureClick('Call Now - Lending')}>
              844-636-2445
            </a>
          </p>
        </div>
      </div>
    )
  }

  goBack () {
    let lastLink = document.referrer
    if (lastLink.indexOf('/financing-options/results') > -1) {
      window.history.back()
      return
    }
    window.location = '/financing-options'
  }

  trackFeatureClick (name) {
    trackClick(
      'Call Agent',
      'Feature Click',
      name
    )
  }
}

export default CallAgentHeader
