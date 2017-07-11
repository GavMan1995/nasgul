import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import Header from '../components/header'
import ValueProp from './components/value-prop'

class WelcomePage extends Component {
  render () {
    let planName = 'Premium'

    return (
      <div className='c-full-page-card c-full-page-card--small' >
        <Header icon='diamond_72x60.svg' title={`Welcome to your ${planName} Nav Account`} />
        <h4 className='c-full-page-card__sub-header'>
          Here's what awaits you exclusively with Nav:
        </h4>

        <ValueProp
          copy='An in-depth look at the same credit reports used by lenders'
          color={1}
          icon='detail_80x80.svg' />
        <ValueProp
          alignment='right'
          copy='Discover and dispute report errors directly through Nav'
          color={2}
          icon='not-so-fine-print_80x80.svg' />
        <ValueProp
          copy='$1M identity theft protection and recovery services'
          color={3}
          icon='monitoring_icon_120x120.svg' />
        <ValueProp
          alignment='right'
          copy='Free phone consultations with our lending experts!'
          color={4}
          icon='onboarding-icons/icon__cs-team_54x54.svg' />

        <p className='c-full-page-card__copy'>
           Get started by visiting your Dashboard and viewing your credit reports
        </p>
        <a href='/home' className='c-btn c-btn--primary'>Continue</a>
      </div>
    )
  }
}

function mapStateToProps ({ plan }) {
  return { plan }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(WelcomePage))
module.exports.jsFilename = 'welcome'
