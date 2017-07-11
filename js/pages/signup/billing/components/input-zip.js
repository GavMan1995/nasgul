import React, { Component } from 'react'

import VMasker from 'vanilla-masker'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default class InputZip extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.value || '' }
  }

  render () {
    const {
      customBasis,
      customClasses,
      label,
      name,
      isForRecurly = false,
      isInvalid,
      onChange,
      onFocus
    } = this.props
    const { value } = this.state

    let privateClass = (isForRecurly) ? 'js-private' : ''
    let recurlyTag = (isForRecurly) ? 'postal_code' : ''

    return (
      <StyleWrapper
        customBasis={customBasis}
        customClasses={customClasses}
        isInvalid={isInvalid}
        hasValue={value}
        label={label}
        type='input'>
        <input
          ref={(element) => { this.input = element }}
          className={privateClass}
          data-recurly={recurlyTag}
          maxLength='5'
          name={name}
          placeholder=''
          type='text'
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value })

            onChange(event)
          }}
          onFocus={onFocus} />
      </StyleWrapper>
    )
  }
  componentDidMount () {
    const input = this.input
    VMasker(input).maskPattern('99999')
  }

  componentDidUpdate () {
    const input = this.input
    VMasker(input).maskPattern('99999')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== '') this.setState({ value: nextProps.value })
  }
}
