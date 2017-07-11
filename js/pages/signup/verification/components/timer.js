import React, { Component } from 'react'
import { Observable, Observer } from 'rx-lite'

import padStart from 'lodash.padstart'

export default class Timer extends Component {
  constructor (props) {
    super(props)

    const { secondsRemaining } = props

    this.state = {
      // The timer is based on the default set in the parser, or the sessionStorage variable
      secondsRemaining: secondsRemaining
    }
  }

  render () {
    const { secondsRemaining } = this.state

    return (
      <strong className='c-signup-page__timer'>{convertTime(secondsRemaining)}</strong>
    )
  }

  componentDidMount () {
    this.timer(this.props.secondsRemaining)
  }

  timer (seconds) {
    if (seconds < 1) {
      this.props.timeOut()
      return
    }
    const timer = Observable
      .interval(1000)
      .take(seconds)
      .map(step => step)

    const observer = Observer.create(
      (step) => {
        const secondsRemaining = seconds - step

        this.setState({ secondsRemaining: secondsRemaining })
      },
      console.error,
      () => {
        this.setState({ secondsRemaining: 0 })
        this.props.timeOut()
      }
    )

    timer.subscribe(observer)
  }
}

// Format the time into something more human readable
function convertTime (seconds) {
  const min = padStart(Math.floor(seconds / 60), 2, '0')
  const sec = padStart(seconds % 60, 2, '0')

  return `${min}:${sec}`
}
