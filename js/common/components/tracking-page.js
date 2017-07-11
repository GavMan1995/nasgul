import React, { Component } from 'react'

import Cookies from 'js-cookie'

export default function TrackingPage (PageComponent) {
  return class extends Component {
    render () {
      return <PageComponent {...this.props} />
    }

    componentDidMount () {
      const trackOnLoad = Cookies.get('trackOnLoad')

      if (trackOnLoad) {
        const event = JSON.parse(window.atob(trackOnLoad))

        window.analytics.track(event.name, event.properties)

        Cookies.remove('trackOnLoad', { domain: window.COOKIE_DOMAIN })
      }
    }
  }
}
