import React, { Component } from 'react'
import { connect } from 'react-redux'

import encodeReferer from '../../client/utils/encode-referer'

import { Observable, Observer } from 'rx-lite'
import padStart from 'lodash.padstart'

// TODO: Add foreground detection to timeout logic!
export default function IdleTimeoutPage (PageComponent) {
  return connect(null, mapDispatchToProps)(class extends Component {
    constructor (props) {
      super(props)

      this.state = { isMessageShown: false }
    }

    render () {
      return <PageComponent {...this.props} />
    }

    componentDidMount () {
      const seconds = 120
      const timer = Observable.concat(
        Observable
          .timer(8 * 60 * 1000)
          .map(() => ({ type: 'idle' })),
        Observable
          .interval(1000)
          .take(seconds)
          .map((x) => ({ type: 'logout', x }))
      )
      const observer = Observer.create(
        (object) => {
          if (object.type === 'idle') return

          const secondsRemaining = seconds - object.x
          const min = padStart(Math.floor(secondsRemaining / 60), 2, '0')
          const sec = padStart(secondsRemaining % 60, 2, '0')

          this.props.tickLogoutMessage(`Due to inactivity you will be logged out in ${min}:${sec}. If you need more time, just move your mouse.`)

          this.setState({ isMessageShown: true })
        },
        (error) => window.Bugsnag && window.Bugsnag.notifyException(error),
        () => {
          window.location.href = `/logout?referer=${encodeReferer(window.location.toString())}&code=401`
        }
      )

      let subscription = timer.subscribe(observer)

      Observable
        .fromEvent(document.body, 'mousemove')
        .debounce(100)
        .subscribeOnNext(() => {
          if (this.state.isMessageShown) {
            this.props.interuptLogoutMessage()

            this.setState({ isMessageShown: false })
          }

          subscription.dispose()

          subscription = timer.subscribe(observer)
        })
    }
  })
}

function mapDispatchToProps (dispatch) {
  return {
    tickLogoutMessage: (body) => dispatch({ type: 'SHOW_ERROR_MESSAGE', body }),
    interuptLogoutMessage: () => dispatch({ type: 'HIDE_MESSAGE' })
  }
}
