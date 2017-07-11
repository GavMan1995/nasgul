import React, { Component } from 'react'

export default class FormCardButton extends Component {
  render () {
    let buttonClass = 'btn -round -secondary-1 _submit'
    let text = this.props.children

    if (this.props.invalidFields.length > 0) {
      buttonClass += ' -error'

      text = 'Whoops! Verify Your Details And Try Again.'
    }

    return (
      <button
        data-flex--item='grow--0'
        className={buttonClass}
        disabled={this.props.isProcessing}
        onClick={this.props.onClick}>
        {text}
      </button>
    )
  }
}
