import React, { Component } from 'react'

export default class TipBox extends Component {
  constructor (props) {
    super(props)
    // This was going to be used to fade in the changes to the tip
    this.state = { transitionClass: 'c-loan-reality-card__tip-box--show' }
  }

  render () {
    const { tip } = this.props

    return (
      <div className={`c-loan-reality-card__tip-box ${this.state.transitionClass}`}>
        <div className='c-loan-reality-card__tip-box-title'>
          {tip.title}
        </div>
        <p className='c-loan-reality-card__text'>{tip.text}</p>
      </div>
    )
  }
}
