import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import trackClick from '../../track-click'

export default class OfferBottomLink extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      ctaHeight: 0
    }
  }

  render () {
    const { agentImage } = this.props

    return (
      <div className='c-call-agent-cta-container'>
        <div className='c-call-agent-cta c-call-agent-cta--center c-call-agent-cta--hide-on-mobile'>
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

        <div className='c-mobile-call-agent-cta'>
          <div
            onClick={this.toggleCTA.bind(this)}
            className={`c-mobile-call-agent-cta__header ${this.state.isOpen ? 'is-open' : ''}`}>
            <div className='c-mobile-call-agent-cta__header-content'>
              <img src={agentImage} />
              <h3><strong>Call Nav For Advice.</strong></h3>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
          </div>

          <div
            className='c-mobile-call-agent-cta__content'
            style={{height: this.state.isOpen ? `${this.state.ctaHeight}px` : ''}}>
            <p>Get free advice from our unbiased business financing experts</p>
            <a
              className='c-btn c-btn--primary c-btn--outline'
              href='https://app.hubspot.com/meetings/nav/business-financing-consultation-lse'
              onClick={() => this.trackFeatureClick('Schedule a Call - Lending')}
              target='_blank'>
              Schedule A Call
            </a>
            <p className='c-mobile-call-agent-cta__content-link'>
              or call now
              <a
                href='tel:8446362445'
                onClick={() => this.trackFeatureClick('Call Now - Lending')}>
                844-636-2445
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const element = findDOMNode(this)
    const content = element.querySelector('.c-mobile-call-agent-cta__content')
    const height = Math.ceil(content.scrollHeight)

    this.setState({ ctaHeight: height + 24 })
  }

  trackFeatureClick (name) {
    trackClick(
      'Offer Summary',
      'Feature Click',
      name
    )
  }

  toggleCTA () {
    this.setState({ isOpen: !this.state.isOpen })
  }
}
