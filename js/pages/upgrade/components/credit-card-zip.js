import React, { Component } from 'react'

import VMasker from 'vanilla-masker'

export default class CreditCardZip extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.defaultValue || '' }
  }

  render () {
    let currentClass = 'js-cc-zip cc-zip'

    if (this.props.invalidFields.indexOf('js-cc-zip') > -1) {
      currentClass += ' -error'
    }

    return (
      <div data-flex--item='basis--50 grow--4'>
        <input
          ref={(element) => { this.input = element }}
          data-group='cc-inputs'
          className={currentClass}
          value={this.state.value}
          placeholder='Zip'
          maxLength='5'
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)} />
      </div>
    )
  }

  componentDidMount () {
    VMasker(this.input).maskPattern('99999')
  }

  handleFocus (event) {
    this.props.onFocus(event, 'js-cc-zip')
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }
}
