
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import CDNAsset from '../../../../common/components/cdn-asset'
import LoanRealityHeader from '../../components/loan-reality-header'
import GetStartedLink from './components/get-started-link'
import ScrollDownArrow from './components/scroll-down-arrow'

class IntroPage extends Component {
  render () {
    const { accounts } = this.props

    let link = '/loan-reality/agreement'

    if (accounts.length === 1) {
      const id = accounts[0].id

      link = `/loan-reality/borrowing-power?accountId=${id}`
    }

    return (
      <div className='o-site-container'>
        <LoanRealityHeader name='Back' />

        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h4 className='c-loan-reality-card__header'>
              An instant estimate of your company's borrowing power.
            </h4>
            <p className='c-loan-reality-card__header-text'>
              Link your business bank records to get an idea of how much
              money lenders will approve you for.
            </p>
            <CDNAsset
              className='c-loan-reality-card__onboarding-image'
              directory='images/loan-reality'
              filename='onboarding1.svg' />

            <GetStartedLink
              link={link}
              track={trackIntro}
              position='top' />
            <ScrollDownArrow destination='bottom' />
          </div>

          <div id='bottom' className='c-card c-loan-reality-card'>
            <h4 className='c-loan-reality-card__header'>
              A lender's perspective on your business finances.
            </h4>
            <p className='c-loan-reality-card__header-text'>
              Understand what lenders are looking for and how likely you are to
              get approved.
            </p>
            <CDNAsset
              className='c-loan-reality-card__onboarding-image'
              directory='images/loan-reality'
              filename='onboarding2.svg' />

            <a
              href={link}
              className='c-btn c-btn--l c-loan-reality-card__button'
              onClick={() => trackIntro('bottom')}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function trackIntro (position) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `get_started:${position}`,
    name: `get_started:${position}`
  })
}

function mapStateToProps ({ accounts }) {
  return { accounts }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(IntroPage))
module.exports.jsFilename = 'intro'
