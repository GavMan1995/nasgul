import { Component } from 'react'
import { connect } from 'react-redux'

import Cookies from 'js-cookie'

class FeatureFlag extends Component {
  render () {
    const {
      featureFlags,
      flagName,
      on,
      off = null
    } = this.props

    const isFlagActive = featureFlags.filter((flag) => {
      return flag.name === flagName
    }).some((flag) => flag.active)

    if (isCookieActive(this.props) || isFlagActive) return on

    return off
  }

  componentDidMount () {
    const { cookieOverride, featureFlags, flagName, me } = this.props

    featureFlags.filter((flag) => {
      return flag.name === flagName
    }).forEach((flag) => {
      if (cookieOverride && flag.active) {
        Cookies.set(flagName, me.accountGuid, {
          domain: window.COOKIE_DOMAIN,
          path: '/',
          expires: 365
        })
      }

      window.analytics.track('Feature Flag', {
        category: isCookieActive(this.props) || flag.active ? 'On' : 'Off',
        name: flagName,
        label: flagName
      })
    })
  }
}

function isCookieActive (props) {
  return (
    props.cookieOverride &&
    props.cookies[props.flagName] === props.me.accountGuid
  )
}

function mapStateToProps ({ cookies, featureFlags, me }) {
  return { cookies, featureFlags, me }
}

export default connect(mapStateToProps)(FeatureFlag)
