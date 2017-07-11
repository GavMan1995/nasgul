import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import VMasker from 'vanilla-masker'

export default class CreditCardExpiration extends Component {
  render () {
    let currentClass = 'js-cc-expiration cc-expiration'

    if (this.props.invalidFields.indexOf('js-cc-expiration') > -1) {
      currentClass += ' -error'
    }

    return (
      <div data-flex--item='half'>
        <i className='-cc-expire' />
        <input
          type='text'
          data-flex--item='full'
          className={currentClass}
          data-group='cc-inputs'
          placeholder='MM / YY'
          maxLength='7'
          onFocus={this._handleFocus.bind(this)} />
      </div>
    )
  }

  componentDidMount () {
    VMasker(findDOMNode(this).querySelector('.js-cc-expiration')).maskPattern('99 / 99')
  }

  _handleFocus (event) {
    this.props.onFocus(event, 'js-cc-expiration')
  }
}
