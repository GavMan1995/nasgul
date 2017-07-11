import React, { Component } from 'react'

import Timer from './timer'

export default class TimerContainer extends Component {
  render () {
    const { secondsRemaining, timeOut } = this.props

    return (
      <div className='c-signup-page__info-box'>
        <p>
          The following questions will allow us to verify your identity. You have
          <Timer
            secondsRemaining={secondsRemaining}
            timeOut={timeOut} />
          to answer these questions, so if you need to reference
          documents or other sources, you have time to do so.
        </p>
        <h5>Verification Tips</h5>
        <p><strong>1.</strong>Don't guess on the answers</p>
        <p><strong>2.</strong>Choose "None of the above" when appropriate</p>
      </div>
    )
  }
}
