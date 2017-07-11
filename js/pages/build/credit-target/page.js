import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import BuildSidebar from './components/build-sidebar'
import GoalsSection from './components/goals-section'

class CreditTargetPage extends Component {
  render () {
    const {
      activeBusiness,
      build,
      crumb,
      goals,
      includeBusiness,
      location
    } = this.props

    return (
      <div data--site-container='responsive'>
        <div data-flex--item='full' data-flex--container id='main-area'>
          <div className='section-header' data-flex--item='full'>
            <h2>CreditTarget Goals</h2>
          </div>
          <div
            className='build__sidebar--mobile'
            data-flex--item='full m-x--md-neg'>
            <BuildSidebar
              build={build}
              location={location} />
          </div>

          <GoalsSection
            activeBusiness={activeBusiness}
            crumb={crumb}
            goals={goals}
            includeBusiness={includeBusiness} />

          <div
            className='build__sidebar--desktop'
            data-flex--item='basis--150 grow--1 m-r--md-neg'>
            <BuildSidebar
              build={build}
              location={location} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    activeBusiness,
    build,
    crumb,
    goals,
    includeBusiness,
    location
  } = state

  return { activeBusiness, build, crumb, goals, includeBusiness, location }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(CreditTargetPage))
module.exports.jsFilename = 'credit-target'
