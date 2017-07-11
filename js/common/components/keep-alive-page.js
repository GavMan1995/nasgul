import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Observable } from 'rx-lite'

export default function KeepAlivePage (PageComponent) {
  return connect(mapStateToProps)(class extends Component {
    render () {
      return <PageComponent {...this.props} />
    }

    componentDidMount () {
      keepAliveRequest(this.props.crumb)

      Observable.interval(3 * 60 * 1000).subscribeOnNext(() => {
        keepAliveRequest(this.props.crumb)
      })
    }
  })
}

function keepAliveRequest (crumb, showKeepAliveError) {
  window.fetch('/client/keep-alive', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': crumb
    },
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        // TODO: Encode referer and logout..?
        window.location.reload(true)
      } else {
        throw new Error(`${response.url} ${response.status}`)
      }
    }
  }).catch((error) => {
    // TODO: Hide this behind an `reportError()` method?
    window.Bugsnag && window.Bugsnag.notifyException(error)
  })
}

function mapStateToProps ({ crumb }) {
  return { crumb }
}
