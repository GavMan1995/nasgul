import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import VMasker from 'vanilla-masker'

export default class CreditCardNumber extends Component {
  render () {
    let currentClass = 'js-cc-number cc-number'

    if (this.props.invalidFields.indexOf('js-cc-number') > -1) {
      currentClass += ' -error'
    }

    return (
      <div data-flex--item='full'>
        <i className='-cc-number' />
        <input
          type='text'
          data-flex--item='full'
          className={currentClass}
          data-group='cc-inputs'
          placeholder='Card Number'
          maxLength='19'
          onChange={this.props.onChange}
          onFocus={this._handleFocus.bind(this)} />
        <div className={this._cardIconClass(this.props.cardType)} />
      </div>
    )
  }

  componentDidMount () {
    this._applyNumberMask(this.props.cardType)
  }

  componentDidUpdate () {
    this._applyNumberMask(this.props.cardType)
  }

  _applyNumberMask (cardType) {
    const ccNumber = findDOMNode(this).querySelector('.js-cc-number')

    if (cardType === 'american_express') {
      VMasker(ccNumber).maskPattern('9999 999999 99999')

      ccNumber.maxLength = 17
    } else {
      VMasker(ccNumber).maskPattern('9999 9999 9999 9999')

      ccNumber.maxLength = 19
    }
  }

  _cardIconClass (cardType) {
    if (cardType !== 'unknown') {
      const type = [
        'american_express',
        'discover',
        'visa',
        'master'
      ].indexOf(cardType) !== -1 ? ('-' + cardType) : '-card'

      return `cc-icon _card-icon ${type}`
    } else {
      return 'cc-icon _card-icon'
    }
  }

  _handleFocus (event) {
    this.props.onFocus(event, 'js-cc-number')
  }
}
