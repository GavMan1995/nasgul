import React, { Component } from 'react'

import Cookies from 'js-cookie'

import { connect } from 'react-redux'

import IntroGoals from './components/intro-goals'
import GoalActions from './components/goal-actions'

import purposes from './data.js'

class OnBoardingSection extends Component {
  constructor (props) {
    super(props)

    const slug = this.props.purpose || Cookies.get('onBoardingSlug') || ''

    this.state = {
      isDismissed: false,
      purpose: slug,
      currentHeader: (purposes[slug] && purposes[slug].headline) || ''
    }
  }

  render () {
    const {
      featureFlags,
      isHidden,
      me
    } = this.props

    if (!isFlagActive(featureFlags, 'on_board_bet')) return null

    if (isHidden) return null

    let component = (
      <IntroGoals
        onClick={this.dismissGoals.bind(this)}
        isDismissed={this.state.isDismissed}
        me={me}
        setIntent={this.setIntent.bind(this)} />
    )

    if (this.state.purpose !== '') {
      component = (
        <GoalActions
          onClick={this.dismissGoals.bind(this)}
          isDismissed={this.state.isDismissed}
          currentHeader={this.state.currentHeader}
          purpose={purposes[this.state.purpose]}
          unsetIntent={this.unsetIntent.bind(this)} />
      )
    }

    return component
  }

  componentDidMount () {
    const flagName = 'on_board_bet'

    this.props.featureFlags.filter((flag) => {
      return flag.name === flagName
    }).forEach((flag) => {
      window.analytics.track('Feature Flag', {
        category: flag.active ? 'On' : 'Off',
        name: flagName,
        label: flagName
      })
    })
  }

  dismissGoals () {
    window.analytics.track('Feature Click', {
      category: 'Internal Link',
      label: 'On Boarding: Dismiss',
      name: 'On Boarding: Dismiss'
    })

    this.setState({
      isDismissed: true,
      purpose: ''
    })

    Cookies.remove('onBoardingSlug', { domain: window.COOKIE_DOMAIN })

    Cookies.set('onBoardingDismissed', true, {
      domain: window.COOKIE_DOMAIN,
      path: '/',
      expires: 365
    })
  }

  setIntent (slug) {
    this.setState({ purpose: slug, currentHeader: purposes[slug].headline })

    Cookies.set('onBoardingSlug', slug, {
      domain: window.COOKIE_DOMAIN,
      path: '/',
      expires: 365
    })
  }

  unsetIntent () {
    this.setState({ purpose: '', currentHeader: '' })

    Cookies.remove('onBoardingSlug', { domain: window.COOKIE_DOMAIN })
  }
}

function isFlagActive (flags, flagName) {
  return flags.filter((flag) => {
    return flag.name === flagName
  }).some((flag) => flag.active)
}

function mapStateToProps ({ featureFlags, isHidden, me, purpose }) {
  return { featureFlags, isHidden, me, purpose }
}

export default connect(mapStateToProps)(OnBoardingSection)
