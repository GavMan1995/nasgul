import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageWrapper from '../components/page-wrapper'

import AuthPage from '../../../common/containers/auth-page'

class FinalViewPage extends Component {
  render () {
    const { businesses, location, prompt, signupPlan } = this.props

    const business = businesses.filter((business) => {
      return business.id === parseInt(location.query.id)
    }).shift()

    let headerText = 'Cool! Looks like you’re all ready to go.'
    let text = null

    if (business && (!business.experianFileNumber || !business.dunsNumber)) {
      headerText = ''
      text = (
        <p>
          Thanks! It looks like you haven’t started building business credit
          yet. Get started with your personal scores.
        </p>
      )
    }

    let button = (
      <a
        href='/dashboard'
        onClick={() => this.trackFinalInteraction('dashboard')}
        className='c-btn c-btn--primary'>
        View My Reports
      </a>
    )

    if (signupPlan === 'freemium') {
      // If prompt was set at the beginning of signup, continue to the upgrade cta
      if (prompt) {
        button = (
          <a
            href='/signup/upgrade'
            onClick={() => this.trackFinalInteraction('upgrade')}
            className='c-btn c-btn--primary'>
            Continue
          </a>
        )
      } else {
        button = (
          <a
            href='/dashboard'
            onClick={() => this.trackFinalInteraction('dashboard')}
            className='c-btn c-btn--primary'>
            View My Reports
          </a>
        )
      }
    }

    return (
      <PageWrapper
        imgLarge={'business_light-blue_190x190.svg'}
        imgSmall={'business_light-blue_72x72.svg'}
        headerText={headerText}>
        <div className='c-add-business-flow__section'>
          {text}
          <div className='c-add-business-flow__button-group'>
            {button}
          </div>
        </div>
      </PageWrapper>
    )
  }

  trackFinalInteraction (location) {
    window.analytics.track('Final Interaction', {
      name: location,
      label: location,
      category: 'Add Business Interaction'
    })
  }

  componentDidMount () {
    window.analytics.track('Finished', {
      category: 'Add Business Interaction'
    })
  }
}

function mapStateToProps ({ businesses, location, prompt, signupPlan }) {
  return { businesses, location, prompt, signupPlan }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(FinalViewPage))
module.exports.jsFilename = 'final-view'
