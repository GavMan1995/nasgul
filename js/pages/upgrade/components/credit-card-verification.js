import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import VMasker from 'vanilla-masker'

export default class CreditCardVerification extends Component {
  render () {
    let currentClass = 'js-cc-cvc cc-cvc'

    if (this.props.invalidFields.indexOf('js-cc-cvc') > -1) {
      currentClass += ' -error'
    }

    return (
      <div data-flex--item='half'>
        <i className='-cc-cvc' />
        <input
          type='text'
          data-flex--item='full'
          className={currentClass}
          data-group='cc-inputs'
          placeholder='CVC'
          maxLength='3'
          onFocus={this._handleFocus.bind(this)} />
      </div>
    )
  }

  componentDidMount () {
    this._applyVerificationMask(this.props.cardType)
  }

  componentDidUpdate () {
    this._applyVerificationMask(this.props.cardType)
  }

  _applyVerificationMask (cardType) {
    const ccNumber = findDOMNode(this).querySelector('.js-cc-cvc')

    if (cardType === 'american_express') {
      VMasker(ccNumber).maskPattern('9999')

      ccNumber.maxLength = 4
    } else {
      VMasker(ccNumber).maskPattern('999')

      ccNumber.maxLength = 3
    }
  }

  _handleFocus (event) {
    this.props.onFocus(event, 'js-cc-cvc')
  }
}
